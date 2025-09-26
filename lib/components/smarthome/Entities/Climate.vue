<template>
  <div class="climate-card">
            
    <!-- Current temp -->
    <robo-text size="small" offset="x05" class="current-temp">
      Current Temperature: {{ currentTemperature }}°
    </robo-text>

    <!-- Circle Dial -->
    <div class="climate-circle">
      <robo-slider
        v-if="supportsTemperature"
        v-model="targetTemperature"
        :isOn="isOn"
        :disabled="!isOn"
        :min="minTemp"
        :max="maxTemp"
        gradient
        :gradientColors="['#68a9fd', '#81d100', '#cd3232']"
        @update:modelValue="sendTemperature"
      />

      <!-- Center content -->
      <div class="center-data">
        <!-- Target temp -->
        <robo-text size="large" offset="x05" class="target-temp">
          {{ Math.round(targetTemperature) }}<sup>°C</sup>
        </robo-text>
        <!-- Humidity (if available) -->
        <div v-if="supportsHumidity" class="humidity">
          💧 {{ humidity }}%
        </div>
      
      </div>
    </div>


    <div class="climate-card-info column">
      <robo-button size="small" :type="isOn ? 'ok' : 'na'" @click="toggleClimate">
        {{ isOn ? 'on' : 'off' }}
      </robo-button>
      <div class="climate-card-temp-buttons">
        <robo-button type="na" size="small" @click="changeTemperature('minus')" :disabled="targetTemperature <= minTemp">-</robo-button>
        <robo-button type="na" size="small" @click="changeTemperature('plus')" :disabled="targetTemperature >= maxTemp">+</robo-button>
      </div>
    </div>

    <div class="climate-card-info-item center" v-if="supportsHvacMode">
      <robo-text size="tiny">HVAC: </robo-text>
      <robo-text size="medium">{{ hvacModeLabel }}</robo-text>
    </div>

    <div class="climate-card-info">
      <div class="climate-card-info-item" v-if="supportsPresetMode">
        <div class="climate-card-item-icon">        
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
          </svg>
          <robo-text size="tiny">Preset: </robo-text>
        </div>
        <robo-text>{{ presetMode }}</robo-text>
      </div>

      <div class="climate-card-info-item" v-if="supportsFanMode">
        <div class="climate-card-item-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <line x1="12" y1="2" x2="12" y2="8"/>
            <line x1="12" y1="16" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="8" y2="12"/>
            <line x1="16" y1="12" x2="22" y2="12"/>
            <line x1="5" y1="5" x2="9" y2="9"/>
            <line x1="15" y1="15" x2="19" y2="19"/>
            <line x1="5" y1="19" x2="9" y2="15"/>
            <line x1="15" y1="9" x2="19" y2="5"/>
          </svg>
          <robo-text size="tiny">Mode: </robo-text>
        </div>
        <robo-text>{{ fanMode }}</robo-text>
      </div>
    </div>

    <div v-if="requestStatus !== 'init'">
      <robo-status :type="requestStatus === 'waiting' ? 'info' : requestStatus" solid>
        {{ requestMsg }}
      </robo-status>
    </div>


    <!-- Extra Settings Button -->
    <button class="extra-settings-btn" @click="showSettings = !showSettings">
      <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><rect fill="white"/><path d="M12.554 25h-.108c-1.28 0-2.342-.96-2.472-2.233l-.003-.028a1.73 1.73 0 0 0-1.14-1.463 1.74 1.74 0 0 0-1.776.245 2.47 2.47 0 0 1-3.344-.193l-.065-.067a2.49 2.49 0 0 1-.168-3.279l.006-.008c.404-.51.5-1.192.251-1.78l-.044-.106a1.73 1.73 0 0 0-1.43-1.06l-.028-.002A2.48 2.48 0 0 1 0 12.554v-.108c0-1.28.96-2.342 2.233-2.472l.028-.003a1.73 1.73 0 0 0 1.432-1.065l.032-.077a1.74 1.74 0 0 0-.245-1.773l-.01-.013a2.48 2.48 0 0 1 .17-3.324l.079-.078a2.48 2.48 0 0 1 3.324-.171l.004.003a1.75 1.75 0 0 0 1.856.221 1.74 1.74 0 0 0 1.068-1.433l.003-.028A2.48 2.48 0 0 1 12.446 0h.108c1.28 0 2.342.96 2.472 2.233a1.78 1.78 0 0 0 1.093 1.47l.052.022a1.81 1.81 0 0 0 1.813-.227l.043-.034a2.49 2.49 0 0 1 3.282.205l.022.021a2.49 2.49 0 0 1 .205 3.283l-.034.042a1.81 1.81 0 0 0-.227 1.814l.013.032c.259.62.825 1.047 1.48 1.113A2.48 2.48 0 0 1 25 12.446v.108c0 1.28-.96 2.342-2.233 2.472l-.028.003a1.73 1.73 0 0 0-1.43 1.06l-.04.096a1.73 1.73 0 0 0 .259 1.769l.002.003c.806.992.733 2.42-.17 3.324l-.079.078a2.48 2.48 0 0 1-3.324.171l-.011-.009a1.74 1.74 0 0 0-1.777-.245l-.076.031c-.591.243-1 .792-1.065 1.432l-.002.028A2.48 2.48 0 0 1 12.554 25m-4.412-5.818a3.7 3.7 0 0 1 1.507.319 3.68 3.68 0 0 1 2.266 3.04l.002.028a.53.53 0 0 0 .53.478h.107a.53.53 0 0 0 .529-.478l.002-.028a3.68 3.68 0 0 1 2.266-3.04l.062-.026a3.69 3.69 0 0 1 3.764.53l.012.01a.53.53 0 0 0 .711-.037l.078-.078a.53.53 0 0 0 .038-.71l-.002-.002a3.68 3.68 0 0 1-.512-3.84 3.68 3.68 0 0 1 3.04-2.263l.027-.002a.53.53 0 0 0 .478-.53v-.107a.53.53 0 0 0-.478-.529 3.76 3.76 0 0 1-3.083-2.304l-.011-.026a3.77 3.77 0 0 1 .486-3.77l.033-.043a.533.533 0 0 0-.044-.703l-.021-.021a.53.53 0 0 0-.702-.044l-.044.034a3.77 3.77 0 0 1-3.77.485l-.041-.017a3.73 3.73 0 0 1-2.29-3.077.53.53 0 0 0-.528-.478h-.108a.53.53 0 0 0-.528.478l-.003.028A3.69 3.69 0 0 1 9.645 5.5l-.058.024a3.69 3.69 0 0 1-3.771-.536l-.005-.003a.53.53 0 0 0-.711.036l-.078.078a.53.53 0 0 0-.037.71l.01.014a3.69 3.69 0 0 1 .53 3.763l-.025.06a3.68 3.68 0 0 1-3.041 2.268l-.028.002a.53.53 0 0 0-.478.53v.107a.53.53 0 0 0 .478.529l.028.002a3.68 3.68 0 0 1 3.074 2.347 3.71 3.71 0 0 1-.519 3.755l-.006.008a.53.53 0 0 0 .036.702l.065.067c.193.197.5.215.714.041a3.67 3.67 0 0 1 2.319-.823m6.069-1.281a.976.976 0 1 0-.59-1.862A3.715 3.715 0 0 1 8.79 12.5a3.715 3.715 0 0 1 3.71-3.71 3.715 3.715 0 0 1 3.562 4.754.977.977 0 1 0 1.875.548A5.67 5.67 0 0 0 12.5 6.836 5.67 5.67 0 0 0 6.836 12.5a5.67 5.67 0 0 0 7.375 5.4" fill="#6c6c6c"/></svg>
    </button>

    <!-- Extra Settings Modal -->
    <robo-details
      popup-min-width="350px"
      type="popup"
      divider="solid"
      :popupTitle="`Extra settings for ${friendlyName}`"
      :open="showSettings"
      :doClose="!showSettings"
      :contentCloseOutOfFocus="false"
    >

      <robo-grid type="flex" offset="x05" gap="x1" class="climate-card-settings-wrapper" galign="center">

        <!-- Status -->
        <div class="climate-status climate-card-extra-item climate-card-extra-item--with-border">
          <robo-text offset="x05" weight="bold">Status: </robo-text>
          <robo-text highlight="link" weight="bold">{{ isOn ? 'On' : 'Off' }}</robo-text>
        </div>

        <!-- Fan Mode -->
        <div class="climate-card-extra-item" v-if="supportsFanMode">
          <robo-select
            v-model="fanMode"
            :options="availableFanModes"
            :values="availableFanModes"
            label="Fan Mode"
            size="small"
            block
          />
        </div>

        <!-- Preset Mode -->
        <div class="climate-card-extra-item" v-if="supportsPresetMode">
          <robo-select
            v-model="presetMode"
            :options="availablePresetModes"
            :values="availablePresetModes"
            label="Preset"
            size="small"
            block
          />
        </div>

        <!-- Swing Mode -->
        <div class="climate-card-extra-item" v-if="supportsSwingMode">
          <robo-select
            v-model="swingMode"
            :options="availableSwingModes"
            :values="availableSwingModes"
            label="Swing"
            size="small"
            block
          />
        </div>

        <!-- HVAC Mode -->
        <div class="climate-card-extra-item" v-if="supportsHvacMode">
          <robo-select
            v-model="hvacMode"
            :options="availableHvacModes"
            :values="availableHvacModes"
            label="HVAC Mode"
            size="small"
            block
          />
        </div>

      </robo-grid>

      <div v-if="requestStatus !== 'init'">
        <robo-status :type="requestStatus === 'waiting' ? 'info' : requestStatus" solid>
          {{ requestMsg }}
        </robo-status>
      </div>

      <div class="apply-settings">
        <robo-button @click="applySettings">Apply Changes</robo-button>
      </div>

      <robo-history-chart v-if="entityData.history" :history="entityData.history" title="Climate History"/>

    </robo-details>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useStore } from "vuex"
import { serviceAvailable } from "../tools"

defineOptions({ name: "RoboSmarthomeEntityClimate" })

const props = defineProps({
  entityData: Object,
  entityID: String,
  services: Object,
})

const store = useStore()

// state refs
const showSettings = ref(false)
const targetTemperature = ref(props.entityData?.attributes?.temperature ?? 22)
const fanMode = ref(props.entityData?.attributes?.fan_mode ?? null)
const presetMode = ref(props.entityData?.attributes?.preset_mode ?? null)
const swingMode = ref(props.entityData?.attributes?.swing_mode ?? null)
const hvacMode = ref(props.entityData?.state ?? null)

const requestStatus = ref("init")
const requestMsg = ref("")
let statusTimeout = null

// computed
const friendlyName = computed(
  () => props.entityData?.attributes?.friendly_name || "Climate"
)

const isOn = ref(props.entityData?.state !== "off") 

const minTemp = computed(() => props.entityData?.attributes?.min_temp ?? 16)
const maxTemp = computed(() => props.entityData?.attributes?.max_temp ?? 30)

const supportsTemperature = computed(
  () => "temperature" in (props.entityData?.attributes || {})
)
const supportsFanMode = computed(
  () => "fan_modes" in (props.entityData?.attributes || {})
)
const supportsPresetMode = computed(
  () => "preset_modes" in (props.entityData?.attributes || {})
)
const supportsSwingMode = computed(
  () => "swing_modes" in (props.entityData?.attributes || {})
)

const supportsHvacMode = computed(
  () => "hvac_modes" in (props.entityData?.attributes || {})
)

const currentTemperature = computed(
  () => props.entityData?.attributes?.current_temperature ?? null
)

const hvacModeIcons = {
  off: "⏻",     
  cool: "❄️",   
  heat: "🔥",    
  fan_only: "🌀", 
  auto: "🔄",   
  dry: "💧"     
}

const hvacModeLabel = computed(() => {
  const mode = props.entityData?.state ?? "off"
  const icon = hvacModeIcons[mode] || "❔"
  return `${icon} ${mode}`
})

const humidity = computed(() => {
  const attrs = props.entityData?.attributes || {};
  
  if ("humidity" in attrs) return attrs.humidity;
  
  if ("target_humidity" in attrs) return attrs.target_humidity;
  return null;
});

const supportsHumidity = computed(() => {
  const attrs = props.entityData?.attributes || {};
  return "humidity" in attrs || "target_humidity" in attrs;
});

const availableFanModes = computed(
  () => getProperties(props.entityData?.attributes?.fan_modes || [])
)
const availablePresetModes = computed(
  () => getProperties(props.entityData?.attributes?.preset_modes || []) 
)
const availableSwingModes = computed(
  () => getProperties(props.entityData?.attributes?.swing_modes || [])
)

const availableHvacModes = computed(
  () => getProperties(props.entityData?.attributes?.hvac_modes || [])
)
// methods
const getProperties = (data) => {
   try {
    const list = data
    let parsed = []

    if (!list) return ['none']
    if (Array.isArray(list)) parsed = list
    else if (typeof list === 'string') {
      parsed = JSON.parse(list.replace(/'/g, '"'))
    }

    return ['none', ...parsed.filter(e => e !== 'none')]
  } catch (e) {
    return ['none']
  }
}

const toggleClimate = () => {
  isOn.value = !isOn.value
  sendRequest(!isOn.value ? "turn_off" : "turn_on")
}

const sendTemperature = () => {
  sendRequest("set_temperature", { temperature: targetTemperature.value })
}

const changeTemperature = (type) => {
  if(targetTemperature.value === minTemp.value || targetTemperature.value === maxTemp.value) return;

  if(type === 'minus') {
    targetTemperature.value = targetTemperature.value - 1
    sendRequest("set_temperature", { temperature: targetTemperature.value })
  } else {
     targetTemperature.value = targetTemperature.value + 1
      sendRequest("set_temperature", { temperature: targetTemperature.value })
  }
}

const applySettings = () => {
  if (hvacMode.value) sendRequest("set_hvac_mode", { hvac_mode: hvacMode.value })
  if (fanMode.value) sendRequest("set_fan_mode", { fan_mode: fanMode.value })
  if (presetMode.value)
    sendRequest("set_preset_mode", { preset_mode: presetMode.value })
  if (swingMode.value)
    sendRequest("set_swing_mode", { swing_mode: swingMode.value })
}

const sendRequest = (service, extraParams = {}) => {
  if (!serviceAvailable(props.services, service)) return

  if(service === 'set_temperature' && !isOn.value) {
    isOn.value = true
  }

  const request = {
    platform: "climate",
    name: service,
    params: { entity_id: props.entityID, ...extraParams },
  }

  requestStatus.value = "waiting"
  requestMsg.value = "Waiting for request complete"

  store.commit(
    "rws/setLaunch",
    JSON.stringify({ launch: request, tx: { tx_status: "pending" } })
  )
}

const handleRequest = (response) => {
  const resp = JSON.parse(response)
  if (resp?.launch?.params?.entity_id === props.entityID) {
    if (serviceAvailable(props.services, resp?.launch?.name)) {
      if (resp?.tx?.tx_status === "success") {
        showStatus("ok", "All done!")
      } else if (resp?.tx?.tx_status === "declined") {
        showStatus("warning", "Request was declined")
      } else if (resp?.tx?.tx_status === "error") {
        showStatus("error", "Request was not complete")
      }
    }
  }
}

const showStatus = (status, msg, duration = 4000) => {
  requestStatus.value = status
  requestMsg.value = msg
  if (statusTimeout) clearTimeout(statusTimeout)
  statusTimeout = setTimeout(() => {
    requestStatus.value = "init"
    requestMsg.value = null
  }, duration)
}

// watchers
watch(showSettings, () => {
  requestStatus.value = "init"
  requestMsg.value = null
})

watch(
  () => props.entityData,
  (data) => {
    targetTemperature.value =  Math.min(
      maxTemp.value,
      Math.max(minTemp.value, data?.attributes?.temperature ?? 22)
    )
    fanMode.value = data?.attributes?.fan_mode ?? null
    presetMode.value = data?.attributes?.preset_mode ?? null
    swingMode.value = data?.attributes?.swing_mode ?? null
    hvacMode.value = data?.state ?? null
  },
  { immediate: true }
)


watch(
  () => store.state.robonomicsUIvue.rws.launch,
  (v) => handleRequest(v)
)
</script>

<style scoped>

.climate-card  {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.climate-circle {
  position: relative;
  width: 12rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.center-data sup {
  font-size: 1rem;
}

.humidity {
  font-size: 0.8rem;
  color: var(--robo-color-blue-80);
  margin-top: 0.2rem;
}

.climate-card-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.climate-card-info.column {
  margin-top: -10px;
  margin-bottom: 1rem;
  flex-direction: column;
}

.climate-card-info button {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 100%;
}

.climate-card-info-item {
  display: flex;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  align-items: flex-end;
  border: 1px solid var(--robo-color-dark-30);
  border-radius: 15px;
  background-color: var(--robo-body-background-color);
}

.climate-card-info-item.center {
  align-items: center;
  margin-bottom: .5rem;
}

.climate-card-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.climate-card-temp-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
} 

.extra-settings-btn {
  position: absolute;
  top: 0.5rem;
  right: var(--gap);
  width: 22px;
  margin-top: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.2rem;
}

.climate-card-settings-wrapper {
  flex-direction: column;
  justify-content: space-between;
}

.climate-card-extra-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap);
}

.climate-card-extra-item--with-border {
  padding-bottom: 10px;
  border-bottom: 2px solid var(--robo-color-light-80);
}

.climate-card-settings-wrapper select {
  width: 100%;
  margin-bottom: var(--gap);
}

.apply-settings {
  margin-top: calc(var(--gap) * 0.5);
  margin-bottom: var(--gap);
  text-align: center;
}

.apply-settings button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

</style>
