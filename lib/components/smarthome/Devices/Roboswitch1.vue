<template>
  <robo-section card shadow>
    <div class="robo-switch-1g-button" :class="{'waiting': status === 'waiting'}">
      <robo-button
        clean
        :class="buttonClass"
        @click.prevent="toggleSwitch"
        :disabled="status === 'waiting' || switchGangState === 'unavailable'"
      >
        <robo-icon icon="switch-1g" />
      </robo-button>
    </div>

    <div class="robo-switch-1g-content">
        <robo-text v-if="switchGangState === 'unavailable'" size="small">Unavailable, check device's internet connection.</robo-text>
        <div v-else>
        <h4>Energy consumption</h4>
        <ul class="energy-list">
            <template v-for="e in energyEntities" :key="e.id">
                <li v-if="datalog.entities[e.id].state !== 'unavailable'">
                <span class="label">
                    {{ formatLabel(e.deviceEntity) }}:
                </span>
                <span class="value">
                    {{ datalog.entities[e.id].state }}
                </span>
                <span class="unit">
                    {{ unitMap[e.deviceEntity] }}
                </span>
                </li>
            </template>
        </ul>
        </div>
    </div>

  </robo-section>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  datalog:    { type: Object, required: true },
  devicedata: { type: Object, required: true }
})

const status = ref('init')

// отфильтровать все ID сущностей по ключу устройства
const filteredEntities = computed(() =>
  Object.keys(props.datalog.entities)
    .filter(id => id.includes('sws_1g_eth_esp32c6'))
)

// вычислить общий префикс после точки (например "sws_1g_eth_esp32c6")
const commonPrefix = computed(() => {
  const rests = filteredEntities.value.map(id => id.split('.')[1])
  if (!rests.length) return ''
  let prefix = rests[0]
  for (let rest of rests) {
    while (!rest.startsWith(prefix)) {
      prefix = prefix.slice(0, prefix.lastIndexOf('_'))
      if (!prefix) break
    }
  }
  return prefix
})

// разбить каждый ID на три части: tool, key, entity
const parsedEntities = computed(() =>
  filteredEntities.value.map(id => {
    const [deviceTool, rest] = id.split('.')
    const deviceKey = commonPrefix.value
    const deviceEntity = rest.slice(commonPrefix.value.length + 1)
    return { id, deviceTool, deviceKey, deviceEntity }
  })
)

// сущности энергичных метрик
const energyEntities = computed(() =>
  parsedEntities.value.filter(e =>
    ['energy_power', 'energy_voltage', 'energy_current'].includes(e.deviceEntity)
  )
)

const switchGangEntityId = computed(() => 
  Object
    .keys(props.datalog.entities)
    .find(id => id.endsWith('robonomics_1_gang_switch'))
);

const switchGangState = computed(() =>
  props.datalog.entities[switchGangEntityId.value]?.state
);

// отображаемые единицы измерения
const unitMap = {
  energy_power: 'W',
  energy_voltage: 'V',
  energy_current: 'A'
}

// форматирование лейбла (Energy Power -> Power)
function formatLabel(key) {
  return key
    .replace('energy_', '')
    .split(/_/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// состояние переключателя robonomics_1_gang_switch
const switchEntity = computed(() =>
  parsedEntities.value.find(e => e.deviceEntity === 'robonomics_1_gang_switch')
)
const switchState = computed(() =>
  switchEntity.value
    ? props.datalog.entities[switchEntity.value.id].state
    : 'off'
)

// класс для кнопки в зависимости от состояния и статуса
const buttonClass = computed(() => ({
  'is-on': switchState.value === 'on' || (status.value === 'ok' && switchState.value !== 'on'),
  'is-off': switchState.value !== 'on' || (status.value === 'ok' && switchState.value === 'on')
}))

function toggleSwitch() {
  if (!switchEntity.value) return
  status.value = 'waiting'

  const request = {
    platform: switchEntity.value.deviceTool,
    name: switchState.value === 'on' ? 'turn_off' : 'turn_on',
    params: { entity_id: switchEntity.value.id }
  }

  store.commit('rws/setLaunch', JSON.stringify({
    launch: request,
    tx: { tx_status: 'pending' }
  }))
}

function handleRequest(response) {
  const resp = JSON.parse(response)
  if (resp?.launch?.params?.entity_id === switchEntity.value?.id) {
    const tx = resp.tx?.tx_status
    status.value = tx === 'success' ? 'ok' : (tx === 'declined' || tx === 'error' ? 'error' : status.value);
    setTimeout(() => {
        status.value = 'init'
    }, 10000);
  }
}

watch(() => store.state.robonomicsUIvue.rws.launch, v => {
  handleRequest(v)
})

defineOptions({ name: 'RoboSmarthomeDeviceRoboswitch1' })
</script>

<style>
.robo-switch-1g-button .robo-button {
  font-size: 5rem !important;
}
.robo-switch-1g-button .robo-button.is-on {
  color: #f9bb01 !important;
}

.energy-list {
  list-style: none;
  padding: 0;
  margin: var(--robo-space) 0;
}
.energy-list .label {
  font-weight: bold;
}
.energy-list .value,
.energy-list .unit {
  margin-left: 4px;
}
</style>

<style scoped>
.robo-switch-1g-button {
  padding: calc(var(--robo-space) * 2);
  width: 100%;
  min-height: 100px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.robo-switch-1g-button.waiting {
    animation: Blink 1s infinite;
}

.robo-switch-1g-content {
  padding: var(--robo-space);
}
</style>
