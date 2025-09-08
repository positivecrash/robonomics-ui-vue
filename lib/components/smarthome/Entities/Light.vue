<template>
  <div class="light-card" :class="{ 'light-on': isOn }">
    <div class="light-circle-container">
      <div class="brightness-circle">
        <robo-slider
          v-if="supportsBrightness"
          v-model="brightnessPercent"
          :isOn="isOn"
          :disabled="!supportsBrightness" 
          @update:modelValue="sendBrightness"
        />
        <div class="center-icon" @click="toggleLight">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              class="bulb-svg" :style="iconStyle">
            <path d="M12,2A7,7 0 0,0 5,9c0,3.5 2.5,5.5 3.5,6.5a2,2 0 0,1 0.5,1.5V19a1,1 0 0,0 1,1h4a1,1 0 0,0 1-1v-2a2,2 0 0,1 0.5-1.5C16.5,14.5 19,12.5 19,9A7,7 0 0,0 12,2Z"
                  fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="light-info">
      <span class="light-name">{{ friendlyName }}</span>
      <span class="light-state">
        {{ isOn ? 'On' : 'Off' }}
        <span v-if="isOn && supportsBrightness">• {{ brightnessPercent }}%</span>
      </span>
      <div v-if="requestStatus !== 'init'">
        <robo-status :type="requestStatus === 'waiting' ? 'info' : requestStatus" solid>
          {{ requestMsg }}
        </robo-status>
      </div>
    </div>

    <button class="extra-settings-btn" @click="showSettings = !showSettings">
      <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><rect fill="white"/><path d="M12.554 25h-.108c-1.28 0-2.342-.96-2.472-2.233l-.003-.028a1.73 1.73 0 0 0-1.14-1.463 1.74 1.74 0 0 0-1.776.245 2.47 2.47 0 0 1-3.344-.193l-.065-.067a2.49 2.49 0 0 1-.168-3.279l.006-.008c.404-.51.5-1.192.251-1.78l-.044-.106a1.73 1.73 0 0 0-1.43-1.06l-.028-.002A2.48 2.48 0 0 1 0 12.554v-.108c0-1.28.96-2.342 2.233-2.472l.028-.003a1.73 1.73 0 0 0 1.432-1.065l.032-.077a1.74 1.74 0 0 0-.245-1.773l-.01-.013a2.48 2.48 0 0 1 .17-3.324l.079-.078a2.48 2.48 0 0 1 3.324-.171l.004.003a1.75 1.75 0 0 0 1.856.221 1.74 1.74 0 0 0 1.068-1.433l.003-.028A2.48 2.48 0 0 1 12.446 0h.108c1.28 0 2.342.96 2.472 2.233a1.78 1.78 0 0 0 1.093 1.47l.052.022a1.81 1.81 0 0 0 1.813-.227l.043-.034a2.49 2.49 0 0 1 3.282.205l.022.021a2.49 2.49 0 0 1 .205 3.283l-.034.042a1.81 1.81 0 0 0-.227 1.814l.013.032c.259.62.825 1.047 1.48 1.113A2.48 2.48 0 0 1 25 12.446v.108c0 1.28-.96 2.342-2.233 2.472l-.028.003a1.73 1.73 0 0 0-1.43 1.06l-.04.096a1.73 1.73 0 0 0 .259 1.769l.002.003c.806.992.733 2.42-.17 3.324l-.079.078a2.48 2.48 0 0 1-3.324.171l-.011-.009a1.74 1.74 0 0 0-1.777-.245l-.076.031c-.591.243-1 .792-1.065 1.432l-.002.028A2.48 2.48 0 0 1 12.554 25m-4.412-5.818a3.7 3.7 0 0 1 1.507.319 3.68 3.68 0 0 1 2.266 3.04l.002.028a.53.53 0 0 0 .53.478h.107a.53.53 0 0 0 .529-.478l.002-.028a3.68 3.68 0 0 1 2.266-3.04l.062-.026a3.69 3.69 0 0 1 3.764.53l.012.01a.53.53 0 0 0 .711-.037l.078-.078a.53.53 0 0 0 .038-.71l-.002-.002a3.68 3.68 0 0 1-.512-3.84 3.68 3.68 0 0 1 3.04-2.263l.027-.002a.53.53 0 0 0 .478-.53v-.107a.53.53 0 0 0-.478-.529 3.76 3.76 0 0 1-3.083-2.304l-.011-.026a3.77 3.77 0 0 1 .486-3.77l.033-.043a.533.533 0 0 0-.044-.703l-.021-.021a.53.53 0 0 0-.702-.044l-.044.034a3.77 3.77 0 0 1-3.77.485l-.041-.017a3.73 3.73 0 0 1-2.29-3.077.53.53 0 0 0-.528-.478h-.108a.53.53 0 0 0-.528.478l-.003.028A3.69 3.69 0 0 1 9.645 5.5l-.058.024a3.69 3.69 0 0 1-3.771-.536l-.005-.003a.53.53 0 0 0-.711.036l-.078.078a.53.53 0 0 0-.037.71l.01.014a3.69 3.69 0 0 1 .53 3.763l-.025.06a3.68 3.68 0 0 1-3.041 2.268l-.028.002a.53.53 0 0 0-.478.53v.107a.53.53 0 0 0 .478.529l.028.002a3.68 3.68 0 0 1 3.074 2.347 3.71 3.71 0 0 1-.519 3.755l-.006.008a.53.53 0 0 0 .036.702l.065.067c.193.197.5.215.714.041a3.67 3.67 0 0 1 2.319-.823m6.069-1.281a.976.976 0 1 0-.59-1.862A3.715 3.715 0 0 1 8.79 12.5a3.715 3.715 0 0 1 3.71-3.71 3.715 3.715 0 0 1 3.562 4.754.977.977 0 1 0 1.875.548A5.67 5.67 0 0 0 12.5 6.836 5.67 5.67 0 0 0 6.836 12.5a5.67 5.67 0 0 0 7.375 5.4" fill="#6c6c6c"/></svg>
    </button>
    <robo-details   
      popup-min-width="350px"
      type="popup"
      divider="solid"
      :popupTitle="`Extra settings for ${friendlyName}`"
      :open="showSettings" 
      :doClose="!showSettings"
      :contentCloseOutOfFocus="false"
    >

      <robo-grid type="flex" offset="x05" gap="x1" class="light-card-settings-wrapper" galign="center">

      <!-- Status -->
       <div class="light-card-status light-card-extra-item light-card-extra-item--with-border">
          <robo-text offset="x05"  weight="bold">Status: </robo-text>
          <robo-text highlight="link" weight="bold">{{ isOn ? 'On' : 'Off' }}</robo-text>
       </div>

        <!-- Brightness -->
        <div class="light-card-brightness light-card-extra-item light-card-extra-item--with-border" v-if="supportsBrightness">
          <robo-text offset="x05" weight="bold">Brightness:</robo-text>
          <robo-text highlight="link" weight="bold">{{ brightnessPercent }}%</robo-text>
        </div>

         <div class="light-card-extra-item">

          <!-- Color Temperature -->
          <div class="light-card-temperature" v-if="supportsColorTemp">
            <div class="light-card-extra-item">
              <robo-text offset="x05" weight="bold">Color Temp: </robo-text>
              <robo-text highlight="link" weight="bold">{{ displayColorTemp  }} K</robo-text>
            </div>
            <robo-slider 
              v-model="colorTemp"   
              :min="minKelvin"
              :max="maxKelvin"
              type="line" 
              gradient
              class="slider" 
              :strokeWidth="6" color="#333"
            />
          </div>

          <!-- Transition -->
          <div class="light-card-transition" v-if="supportsTransitions">
            <div class="light-card-extra-item">
              <robo-text offset="x05" weight="bold">Transition: </robo-text>
              <robo-text highlight="link" weight="bold">{{ transition }}s</robo-text>
            </div>
              <robo-slider
                class="slider"
                v-model="transition"
                :min="0"
                :max="10"
                step="0.5"
                type="line"
                :strokeWidth="6" 
                color="#333"
              />
            </div>
         </div>

        <!-- Effects -->
        <div class="light-card-effects light-card-extra-item" v-if="supportsEffects">
          <robo-select 
            v-model="currentEffect" 
            :options="availableEffects" 
            :values="availableEffects" 
            label="Effect"
            size="small"
            block
          />
        </div>
      </robo-grid>

      <!-- Color Picker -->
      <div class="light-card-color light-card-extra-item">
        <robo-color-picker v-if="supportsColor" v-model="colorHex" class="color-picker"/>
      </div>

      <div v-if="requestStatus !== 'init'">
        <robo-status :type="requestStatus === 'waiting' ? 'info' : requestStatus" solid>
          {{ requestMsg }}
        </robo-status>
      </div>

      <div class="apply-settings">
        <robo-button @click="applySettings">Apply Changes</robo-button>
      </div>

      <robo-history-chart v-if="entityData.history" :history="entityData.history" title="Light History"/>

    </robo-details>
  
  </div>
</template>

<script setup>
import { ref, computed, watch} from 'vue'
import { useStore } from 'vuex'
import { serviceAvailable } from '../tools'

defineOptions({ name: 'RoboSmarthomeEntityLight' })

const props = defineProps({
  entityData: Object,
  entityID: String,
  services: Object,
})

const store = useStore()

const isOn = ref(false)
const brightness = ref(255)
const color = ref([255, 180, 0])
const colorTemp = ref(4000) 
const transition = ref(1)  
const currentEffect = ref('none')
const showSettings = ref(false)
const requestStatus = ref('init')
const requestMsg = ref(null)
let statusTimeout = null

const friendlyName = computed(() => props.entityData?.attributes?.friendly_name || 'Light')

const brightnessPercent = computed({
  get: () => {
    const val = isOn.value ? Math.round((brightness.value / 255) * 100) : 0;
    return Math.min(Math.max(val, 0), 100); 
  },
  set: val => {
    const clamped = Math.min(Math.max(Number(val) || 0, 0), 100);
    brightness.value = Math.round((clamped / 100) * 255);
  }
});

const minKelvin = computed(() => props.entityData?.attributes?.min_color_temp_kelvin ?? 2000);
const maxKelvin = computed(() => props.entityData?.attributes?.max_color_temp_kelvin ?? 6535);

const displayColorTemp = computed({
  get: () => {
    const minK = Number(minKelvin.value) || 2000;
    const maxK = Number(maxKelvin.value) || 6535;

    const ct = Number(colorTemp.value);
    if (!ct || isNaN(ct)) return minK; 
    return Math.min(Math.max(ct, minK), maxK);
  },
  set: (val) => {
    const n = Number(val);
    if (!isNaN(n)) colorTemp.value = Math.min(Math.max(Math.round(n), minKelvin.value), maxKelvin.value);
  }
});

const colorHex = computed({
  get: () => '#' + color.value.map(c => c.toString(16).padStart(2, '0')).join(''),
  set: hex => {
    if (/^#([0-9A-Fa-f]{6})$/.test(hex)) {
      const bigint = parseInt(hex.slice(1), 16)
      color.value = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
    }
  }
})

const availableEffects = computed(() => {
  try {
    const list = props.entityData?.attributes?.effect_list
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
})

const supportsBrightness = computed(() => 'brightness' in (props.entityData?.attributes || {}))
const supportsColor = computed(() => 'rgb_color' in (props.entityData?.attributes || {}))
const supportsColorTemp = computed(() => 'color_temp' in (props.entityData?.attributes || {}))
const supportsTransitions = computed(() => {
  const features = props.entityData?.attributes?.supported_features ?? 0
  return (features & 32) !== 0
})
const supportsEffects = computed(
  () => !!props.entityData?.attributes?.effect_list
)

const iconStyle = computed(() => {
  if (!isOn.value) return { color: '#aaa', opacity: 0.5 }

  const [r, g, b] = color.value;
  const bulbRgb = `rgb(${r},${g},${b})`;

  // calculate relative luminance (0=black, 1=white)
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;

  // if color is too bright, use a darker shadow
  const shadowColor = luminance > 0.9 ? 'rgba(0,0,0,0.6)' : bulbRgb;

  return {
    color: bulbRgb,
    filter: `drop-shadow(0 0 8px ${shadowColor})`
  }
});

const toggleLight = () => {
  isOn.value = !isOn.value

  const service = isOn.value ? 'turn_on' : 'turn_off'

  const params = isOn.value && supportsBrightness.value ? { brightness: 255 } : {}

  sendRequest(service, params)
}

const applySettings = () => {
 const params = {}

  if (supportsBrightness.value) params.brightness = brightness.value
  if (supportsColor.value) params.rgb_color = color.value
  if (supportsColorTemp.value) params.color_temp = colorTemp.value
  if (supportsTransitions.value) params.transition = transition.value
  if (supportsEffects.value && currentEffect.value !== 'none') {
    params.effect = currentEffect.value
  }

  sendRequest('turn_on', params)
}

const sendBrightness = () => sendRequest('turn_on', { brightness: brightness.value })

const sendRequest = (service, extraParams = {}) => {
  if (!serviceAvailable(props.services, service)) return

  const request = {
    platform: 'light',
    name: service,
    params: { entity_id: props.entityID, ...extraParams }
  }

  requestStatus.value = 'waiting'
  requestMsg.value = 'Waiting for request complete'

  store.commit('rws/setLaunch', JSON.stringify({ launch: request, tx: { tx_status: 'pending' } }))
}


const handleRequest = (response) => {
  const resp = JSON.parse(response)

  if (resp?.launch?.params?.entity_id === props.entityID) {
    if (serviceAvailable(props.services, resp?.launch?.name)) {
      if (resp?.tx?.tx_status === 'success') {
        showStatus('ok', 'All done!')
      }

      if (resp?.tx?.tx_status === 'declined') {
        showStatus('warning', 'Request was declined')
      }

      if (resp?.tx?.tx_status === 'error') {
        showStatus('error', 'Request was not complete')
      }
    }
  }
}

const showStatus = (status, msg, duration = 4000) => {
  requestStatus.value = status
  requestMsg.value = msg

  
  if (statusTimeout) clearTimeout(statusTimeout)

  
  statusTimeout = setTimeout(() => {
    requestStatus.value = 'init'
    requestMsg.value = null
  }, duration)
}

watch(showSettings, () => {
  requestStatus.value = 'init'
  requestMsg.value = null
})

watch(() => props.entityData, () => {
  const data = props.entityData || {}

  isOn.value = data.state === 'on'

  const rawBrightness = Number(data.attributes?.brightness)
  brightness.value = (!rawBrightness || isNaN(rawBrightness)) ? 255 : rawBrightness

  const rgb = data.attributes?.rgb_color
  color.value = Array.isArray(rgb) ? rgb.map(c => Number(c) || 0) : [255, 180, 0]

  colorTemp.value = data.attributes?.color_temp ?? null

  currentEffect.value = 
    (data.attributes?.effect && data.attributes.effect !== 'None')
      ? data.attributes.effect
      : 'none'

    requestStatus.value = 'init'
    requestMsg.value = null
}, { immediate: true })

watch(
  () => store.state.robonomicsUIvue.rws.launch,
  (v) => handleRequest(v)
)
</script>

<style>
.light-card .robo-details-content {
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.407);
}
</style>

<style scoped>
.light-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.light-circle-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light-icon-circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  background-color: #f0f0f0;
}

.bulb-svg {
  width: 7rem;
  height: 5rem;
  transition: all 0.3s ease;
}

.brightness-circle {
  position: relative;
  width: 12rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.light-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.light-state {
  margin-bottom: calc(var(--gap) * 0.5);
  font-size: 0.85rem;
  color: var(--robo-color-dark-80);
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

.light-card-settings-wrapper {
  flex-direction: column;
  justify-content: space-between;
}

.light-card-extra-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap);
}

.light-card-extra-item--with-border {
  padding-bottom: 10px;
  border-bottom: 2px solid var(--robo-color-light-80);
}

.light-card-effects select {
  width: 100%;
  margin-bottom: var(--gap);
}

.light-card-color {
  margin-bottom: var(--gap);
}

.slider, .color-picker {
  width: 100%;
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
