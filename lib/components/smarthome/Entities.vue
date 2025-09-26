<template>
  <!-- Режим Category -->
  <template v-if="isCategoryMode">
    <robo-tabs>
      <template v-for="(devicesInCategory, categoryName) in finalCategories" :key="categoryName">
        <robo-tab
          v-if="devicesInCategory?.length > 0"
          :label="categoryNames[categoryName] || categoryName"
          :labelnumber="devicesInCategory.length"
        >
          <div class="masonry">
            <div
              v-for="(column, columnIndex) in splitIntoColumns(sortedDevices(devicesInCategory, categoryName), columnCount)"
              :key="columnIndex"
              class="masonry-column"
            >
              <div
                v-for="device in column"
                :key="device.id"
                class="masonry-item"
              >

              <template v-if="device?.model === 'Altruist Sensor' || device?.model === 'Altruist'">
                <robo-smarthome-device-altruist :devicedata="device" :datalog="datalog" />
              </template>
              <template v-else>
                <robo-section card shadow>
                  <robo-section>
                    <robo-text
                      v-if="!Object.keys(device.entities).some(eid => eid.startsWith('light.')) && !Object.keys(device.entities).some(eid => eid.startsWith('weather.'))"
                      class="device-title"
                      title="5"
                    >
                      {{ device.name }}
                    </robo-text>
                    <robo-grid class="device-content" :columns="1" gap="x1" offset="x1">
                      <robo-smarthome-entity
                        v-for="(entData, entID) in sortedEntities(device.entities, categoryName)"
                        :key="entID"
                        :entityID="entID"
                        :entityData="entData"
                        :services="services[entID.split('.')[0]]"
                      />
                    </robo-grid>
                  </robo-section>
                  <details class="device-expand"
                    v-if="Object.keys(filteredEntities(device.entities, categoryName)).length"
                  >
                    <summary>Extended</summary>
                    <robo-grid class="device-content" :columns="1" gap="x1" offset="x1">
                      <robo-smarthome-entity
                        v-for="(entData, entID) in filteredEntities(device.entities, categoryName)"
                        :key="entID"
                        :entityID="entID"
                        :entityData="entData"
                        :services="services[entID.split('.')[0]]"
                      />
                    </robo-grid>
                  </details>
                </robo-section>
              </template>
              </div>
            </div>
          </div>
        </robo-tab>
      </template>
      <!-- Вкладка автоматизаций -->
      <robo-tab
        v-if="Object.keys(automations).length"
        :label="categoryNames['automation'] || 'automation'"
        :labelnumber="Object.keys(automations).length"
      >
        <robo-grid :columns="1" gap="x05">
          <template v-for="(entityData, entity) in sortedAutomations(automations)" :key="entity">
            <robo-section card shadow width="wide">
              <robo-text class="device-title" title="5" :class="'automation-title-state-' + entityData.state">
                {{ entity }}
              </robo-text>
              <robo-text class="device-content" size="small">{{ entityData }}</robo-text>
            </robo-section>
          </template>
        </robo-grid>
      </robo-tab>
    </robo-tabs>
  </template>

  <!-- Режим Area -->
  <template v-else>
    <robo-tabs>
      <template v-for="(devicesInArea, areaName) in devicesByArea" :key="areaName">
        <robo-tab
          v-if="devicesInArea?.length > 0"
          :label="areaName === 'unknown' ? 'No Area' : areaName"
          :labelnumber="devicesInArea.length"
        >
          <div class="masonry">
            <div
              v-for="(column, columnIndex) in splitIntoColumns(sortedDevices(devicesInArea, null), columnCount)"
              :key="columnIndex"
              class="masonry-column"
            >
              <div v-for="device in column" :key="device.id" class="masonry-item">
                
                <template v-if="device?.model === 'Altruist Sensor' || device?.model === 'Robonomics-1L-Switch'">
                  <robo-smarthome-device-altruist 
                    v-if="device?.model === 'Altruist Sensor'"
                    :devicedata="device" :datalog="datalog" />

                  <robo-smarthome-device-roboswitch1 
                    v-if="device?.model === 'Robonomics-1L-Switch'"
                    :devicedata="device" :datalog="datalog" />
                </template>

                <template v-else>
                  <robo-section card shadow>
                    <robo-section>
                      <robo-text class="device-title" title="5">{{ device.name }}</robo-text>
                      <robo-grid class="device-content" :columns="1" gap="x1" offset="x1">
                        <!-- В режиме Area currentCategory отсутствует -->
                        <robo-smarthome-entity
                          v-for="(entData, entID) in sortedEntities(device.entities, null)"
                          :key="entID"
                          :entityID="entID"
                          :entityData="entData"
                          :services="services[entID.split('.')[0]]"
                        />
                      </robo-grid>
                    </robo-section>
                  </robo-section>
                </template>
              </div>
            </div>
          </div>
        </robo-tab>
      </template>
    </robo-tabs>
  </template>
</template>

<script setup>
defineOptions({ name: 'RoboSmarthomeEntities' });

import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

// Пропсы
const props = defineProps({
  config: { type: [Object, String] },
  datalog: { type: [Object, String] }
});

// Глобальные константы
const categoryNames = {
  lighting: "Lighting",
  switches: "Switches & Outlets",
  climate: "Climate & HVAC",
  security: "Security & Locks",
  media: "Media & Entertainment",
  sensors: "Sensors & Detectors",
  tracking: "Device Tracking",
  other: "Other Devices",
  automation: "Automations",
  weather: "Forecast"
};

const typePriority = {
  lighting: ["light"],
  switches: ["switch", "outlet", "fan", "cover"],
  sensors: ["sensor", "binary_sensor"],
  climate: ["climate", "humidifier", "water_heater"],
  security: ["alarm_control_panel", "lock", "camera"],
  media: ["media_player"],
  tracking: ["device_tracker"],
  weather: ["weather"],
  other: ["button", "number", "select", "text", "update"]
};

// Порядок категорий для сортировки вкладок в режиме Category
const categoryOrder = ["lighting", "switches", "sensors", "climate", "security", "media", "tracking", "weather", "other"];

// Реактивные переменные
const devices = ref([]);
const automations = ref({});
const columnCount = ref(3);

// Вычисляемые свойства
const services = computed(() => props.config.services);
const isCategoryMode = computed(() => store.state.robonomicsUIvue.rws.devices.view === "category");

// Функция получения устройств и автоматизаций из datalog
function getdevices() {
  const datalogEntities = props.datalog?.entities || {};
  automations.value = Object.fromEntries(
    Object.entries(datalogEntities)
      .filter(([k]) => k.startsWith('automation.'))
      .map(([k, e]) => {
        const lastTrig = e.attributes?.last_triggered ? new Date(e.attributes.last_triggered) : new Date(0);
        return [k, { ...e, lastUpdated: lastTrig }];
      })
  );
  const devMap = props.datalog.devices || {};
  return Object.entries(devMap).map(([id, dev]) => {
    const entObj = {};
    dev.entities.forEach(entID => {
      const entData = datalogEntities[entID] || {};
      const lastHist = entData.history && entData.history.length
        ? new Date(entData.history[entData.history.length - 1].date)
        : new Date(0);
      entObj[entID] = {
        state: entData.state || "Unknown",
        units: entData.units || null,
        history: entData.history.length && entData.history || null,
        attributes: entData.attributes || {},
        lastUpdated: lastHist,
      };
    });
    return {
      id,
      name: dev.name,
      area_id: dev.area_id,
      manufacturer: dev.manufacturer,
      model: dev.model,
      entities: entObj
    };
  });
}

// Функция обновления количества колонок
function updateColumnCount() {
  const w = window.innerWidth;
  if (w > 1200) columnCount.value = 4;
  else if (w > 900) columnCount.value = 3;
  else if (w > 680) columnCount.value = 2;
  else columnCount.value = 1;
}

// Watcher для обновления устройств
let resizeTimeout;

watch(() => props.datalog, (newVal) => {
  if (newVal) {

    devices.value = getdevices();
    updateColumnCount();

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateColumnCount();
      }, 300);
    });
    
  }
}, { immediate: true });

onMounted(() => {
  devices.value = getdevices();
  updateColumnCount();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateColumnCount);
});

// Группировка устройств по категориям
function groupByCategory(deviceList) {
  const grouped = {};
  deviceList.forEach(device => {
    const entityTypes = Object.keys(device.entities).map(e => e.split('.')[0]);
    const matchedCats = Object.keys(typePriority).filter(cat =>
      typePriority[cat].some(t => entityTypes.includes(t))
    );
    if (!matchedCats.length) matchedCats.push("other");
    matchedCats.forEach(cat => {
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(device);
    });
  });
  return grouped;
}

// Вычисляемое свойство для группировки по категориям с сортировкой по categoryOrder
const finalCategories = computed(() => {
  const grouped = groupByCategory(devices.value);
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA === -1 && idxB === -1) return a.localeCompare(b);
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    return idxA - idxB;
  });
  const result = {};
  sortedKeys.forEach(key => {
    result[key] = grouped[key];
  });
  return result;
});

// Группировка устройств по area_id с сортировкой ключей (unknown в конце)
const devicesByArea = computed(() => {
  const grouped = {};
  devices.value.forEach(dev => {
    const area = dev.area_id || "unknown";
    if (!grouped[area]) grouped[area] = [];
    grouped[area].push(dev);
  });
  const sortedEntries = Object.entries(grouped).sort(([a], [b]) => {
    if (a === "unknown") return 1;
    if (b === "unknown") return -1;
    return a.localeCompare(b);
  });
  return Object.fromEntries(sortedEntries);
});

// Итоговая группировка устройств в зависимости от выбора пользователя category/area
const finalDevicesSorted = computed(() => {
  return isCategoryMode.value ? finalCategories.value : devicesByArea.value;
});

// Функция формирования метки вкладки
function tabLabel(groupName) {
  if (isCategoryMode.value) {
    return categoryNames[groupName] || groupName;
  } else {
    return groupName === "unknown" ? "No Area" : groupName;
  }
}

// Сортировка entity внутри устройства
function sortedEntities(entities, currentCategory) {
  if (!currentCategory) return entities;
  const filtered = Object.entries(entities)
    .filter(([entID]) => typePriority[currentCategory]?.includes(entID.split('.')[0]))
    .sort(([aID], [bID]) => {
      const typeA = aID.split('.')[0];
      const typeB = bID.split('.')[0];
      const aInCat = typePriority[currentCategory]?.includes(typeA) ? -1 : 1;
      const bInCat = typePriority[currentCategory]?.includes(typeB) ? -1 : 1;
      return aInCat - bInCat;
    });
  return Object.fromEntries(filtered);
}

// Фильтрация entity, не попавших в категорию
function filteredEntities(entities, currentCategory) {
  if (!currentCategory) return {};
  return Object.fromEntries(
    Object.entries(entities).filter(([entID]) => {
      const eType = entID.split('.')[0];
      return !typePriority[currentCategory]?.includes(eType);
    })
  );
}

// Получение информации о первичном entity устройства
function getPrimaryInfo(device, currentCategory) {
  const sorted = sortedEntities(device.entities, currentCategory);
  const firstKey = Object.keys(sorted)[0];
  if (!firstKey) return { state: "unknown", date: 0 };
  const ent = sorted[firstKey];
  let st = (ent.state || "unknown").toLowerCase();
  let dateTS = 0;
  if (ent.history && ent.history.length) {
    const lastEntry = ent.history[ent.history.length - 1];
    st = (lastEntry.state || st).toLowerCase();
    dateTS = new Date(lastEntry.date).getTime();
  } else if (ent.lastUpdated) {
    dateTS = new Date(ent.lastUpdated).getTime();
  }
  return { state: st, date: dateTS };
}

// Сортировка устройств внутри каждой вкладки
function sortedDevices(devList, currentCategory) {
  return devList.slice().sort((a, b) => {
    const infoA = getPrimaryInfo(a, currentCategory);
    const infoB = getPrimaryInfo(b, currentCategory);
    const badA = ["unknown", "unavailable"].includes(infoA.state) ? 1 : 0;
    const badB = ["unknown", "unavailable"].includes(infoB.state) ? 1 : 0;
    if (badA !== badB) return badA - badB;
    if (infoA.date !== infoB.date) return infoB.date - infoA.date;
    return a.name.localeCompare(b.name);
  });
}

// Сортировка automations
function sortedAutomations(autos) {
  const entries = Object.entries(autos).sort(([, a], [, b]) => {
    const stPriority = (s) => {
      if (s === "on") return 0;
      if (["unknown", "unavailable"].includes(s)) return 2;
      return 1;
    };
    const pa = stPriority(a.state);
    const pb = stPriority(b.state);
    if (pa !== pb) return pa - pb;
    const laA = a?.lastUpdated?.getTime() || 0;
    const laB = b?.lastUpdated?.getTime() || 0;
    return laB - laA;
  });
  return Object.fromEntries(entries);
}

// Разбиваем устройства на колонки
function splitIntoColumns(items, colCount) {
  const columns = Array.from({ length: colCount }, () => []);
  items.forEach((it, idx) => {
    columns[idx % colCount].push(it);
  });
  return columns;
}
</script>

<style scoped>
.masonry {
  display: flex;
  gap: var(--robo-space);
}
.masonry-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--robo-space);
}
.robo-section {
  padding: 0 !important;
}

.device-title {
  padding: var(--robo-space);
}

.device-title[class*="automation-title-state-"] {
  position: relative;
}
.device-title[class*="automation-title-state-"]:after {
  content: "";
  position: absolute;
  top: 4px;
  right: 4px;
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 7px;
}
.automation-title-state-on:after {
  background-color: var(--robo-color-green);
}
.automation-title-state-off:after {
  background-color: var(--robo-color-red);
}
.device-expand {
  display: block;
  width: 100%;
  background-color: var(--robo-color-light-95);
}
.device-expand summary {
  padding: var(--robo-space);
  cursor: pointer;
}
.device-content {
  padding: var(--robo-space);
}
</style>
