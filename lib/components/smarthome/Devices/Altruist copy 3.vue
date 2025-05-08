<template>
  <robo-section card shadow>
    <div class="altruist-content">
      <h4 class="altruist-title">
        <svg class="wifi-icon" :class="wifiSignalClass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.333 469.333" aria-hidden="true">
          <path d="M170.667,336.6l64,64l64-64C263.36,301.293,205.973,301.293,170.667,336.6z"/>
          <path d="M85.333,251.267L128,293.933c58.88-58.88,154.453-58.88,213.333,0L384,251.267C301.547,168.813,167.787,168.813,85.333,251.267z"/>
          <path d="M0,165.933L42.667,208.6c106.027-106.027,277.973-106.027,384,0l42.667-42.667C339.733,36.333,129.6,36.333,0,165.933z"/>
        </svg>
        {{ devicedata.name }}
      </h4>

      <robo-tabs>
        <robo-tab label="Noise">
          <div class="current-noise-value" v-if="averageNoiseEntity">
            <strong>Average Noise:</strong> {{ averageNoiseEntity.data.state }} {{ averageNoiseEntity.data.units }}
          </div>
          <canvas ref="noiseChartCanvas" class="noise-chart-canvas"></canvas>
          <div class="noise-controls">
            <label><input type="checkbox" v-model="showMaxNoise" /> Maximum Noise</label>
            <label><input type="checkbox" v-model="showAvgNoise" /> Average Noise</label>
          </div>
        </robo-tab>

        <robo-tab label="Air quality">
          <div class="current-airquality-value" v-if="pm10Entity">
            <strong>PM10:</strong> {{ pm10Entity.data.state }} {{ pm10Entity.data.units }}
          </div>
          <div class="current-airquality-value" v-if="pm25Entity">
            <strong>PM2.5:</strong> {{ pm25Entity.data.state }} {{ pm25Entity.data.units }}
          </div>
          <canvas ref="airQualityChartCanvas" class="airquality-chart-canvas"></canvas>
          <div class="airquality-controls">
            <label><input type="checkbox" v-model="showPM10" /> PM10</label>
            <label><input type="checkbox" v-model="showPM25" /> PM2.5</label>
          </div>
        </robo-tab>

        <robo-tab label="Atmosphere">
          <ul>
            <li v-for="item in atmosphereEntities" :key="item.entityId">
              <strong>{{ item.suffix }}:</strong>
              {{ item.data.state }} {{ item.data.units }}
              <small>(last update: {{ item.data.attributes.last_updated || item.data.lastUpdated || '–' }})</small>
            </li>
          </ul>
        </robo-tab>
      </robo-tabs>
    </div>
  </robo-section>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

const props = defineProps({
  datalog: { type: Object, required: true },
  devicedata: { type: Object, required: true }
})

defineOptions({ name: 'RoboSmarthomeDeviceAltruist' })

const SUFFIXES = ['wifi_signal', 'pm10', 'pm2_5', 'humidity', 'temperature', 'pressure', 'maximum_noise', 'average_noise']

const noiseZones = [
  { value: 50, color: 'hsl(214, 98%, 50%)' },
  { value: 70, color: 'hsl(39, 100%, 50%)' },
  { value: Infinity, color: 'hsl(0, 61%, 50%)' }
]

const pmZones = [
  { value: 25, color: 'green' },
  { value: 50, color: 'orange' },
  { value: Infinity, color: 'red' }
]

const deviceKey = computed(() => {
  const first = Object.keys(props.devicedata.entities)[0] || ''
  const obj = first.split('.')[1] || ''
  const suf = SUFFIXES.find(s => obj.endsWith(`_${s}`))
  return suf ? obj.slice(0, obj.length - suf.length - 1) : obj.split('_')[0]
})

const allEntityIds = computed(() => {
  const prefix = deviceKey.value + '_'
  return Object.keys(props.datalog.entities || {}).filter(id => (id.split('.')[1] || '').startsWith(prefix))
})

const parsedEntities = computed(() => allEntityIds.value.map(id => {
  const data = props.datalog.entities[id] || {}
  const obj = id.split('.')[1] || ''
  const suffix = SUFFIXES.find(s => obj.endsWith(`_${s}`)) || 'unknown'
  return { entityId: id, data, suffix }
}))

const noiseEntities = computed(() => parsedEntities.value.filter(e => ['maximum_noise', 'average_noise'].includes(e.suffix)))
const airQualityEntities = computed(() => parsedEntities.value.filter(e => ['pm10', 'pm2_5'].includes(e.suffix)))
const atmosphereEntities = computed(() => parsedEntities.value.filter(e => ['humidity', 'temperature', 'pressure'].includes(e.suffix)))

const averageNoiseEntity = computed(() => noiseEntities.value.find(e => e.suffix === 'average_noise'))
const pm10Entity = computed(() => airQualityEntities.value.find(e => e.suffix === 'pm10'))
const pm25Entity = computed(() => airQualityEntities.value.find(e => e.suffix === 'pm2_5'))

const wifiStrength = computed(() => {
  const w = parsedEntities.value.find(e => e.suffix === 'wifi_signal')
  if (!w) return null
  const n = parseInt(w.data.state, 10)
  return isNaN(n) ? null : n
})
const wifiSignalClass = computed(() => {
  const s = wifiStrength.value
  if (s === null) return 'unavailable-signal'
  if (s >= -78) return 'good-signal'
  if (s >= -85) return 'weak-signal'
  return 'no-signal'
})

const showMaxNoise = ref(true)
const showAvgNoise = ref(true)
const showPM10 = ref(true)
const showPM25 = ref(true)

const noiseChartCanvas = ref(null)
const airQualityChartCanvas = ref(null)
let noiseChart = null
let airQualityChart = null

function createDataset({ label, data, hidden = false, zones = [] }) {
  return {
    label,
    data: data.map(p => ({ x: p.t, y: p.v })),
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 0,
    fill: false,
    tension: 0.4,
    hidden,
    segment: zones.length ? {
      borderColor: ctx => {
        const y = ctx.p0.parsed.y
        for (const zone of zones) {
          if (y <= zone.value) return zone.color
        }
        return 'blue'
      }
    } : undefined
  }
}

function createHoverHandler() {
  return function(event, active, chart) {
    if (!chart) return
    if (active.length) {
      const idx = active[0].datasetIndex
      chart.data.datasets.forEach((ds, i) => ds.borderWidth = i === idx ? 4 : 2)
    } else {
      chart.data.datasets.forEach(ds => ds.borderWidth = 2)
    }
    chart.update('none')
  }
}

const commonChartOptions = {
  responsive: true,
  interaction: { mode: 'dataset', intersect: false },
  scales: {
    x: { type: 'time', time: { unit: 'hour', tooltipFormat: 'HH:mm' } },
    y: { beginAtZero: false }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'dataset',
      intersect: false,
      displayColors: true,
      callbacks: {
        title: items => items[0].dataset.label,
        label: () => null
      }
    }
  }
}


onMounted(() => {
  const now = Date.now()
  const start = now - 1 * 60 * 60 * 1000

  const parse = hist => hist
    .filter(r => !isNaN(+r.state))
    .map(r => ({ t: new Date(r.date).getTime(), v: +r.state }))
    .filter(p => p.t >= start)
    .sort((a, b) => a.t - b.t)

  // Noise Chart
  const noiseCtx = noiseChartCanvas.value.getContext('2d')
  const maxNoiseData = parse(noiseEntities.value.find(e => e.suffix === 'maximum_noise')?.data.history || [])
  const avgNoiseData = parse(noiseEntities.value.find(e => e.suffix === 'average_noise')?.data.history || [])

  noiseChart = new Chart(noiseCtx, {
    type: 'line',
    data: {
      datasets: [
        createDataset({ label: 'Maximum Noise', data: maxNoiseData, hidden: !showMaxNoise.value, zones: noiseZones }),
        createDataset({ label: 'Average Noise', data: avgNoiseData, hidden: !showAvgNoise.value, zones: noiseZones })
      ]
    },
    options: {
        ...commonChartOptions,
        onHover: createHoverHandler()
    }
  })

  // Air Quality Chart
  const airCtx = airQualityChartCanvas.value.getContext('2d')
  const pm10Data = parse(airQualityEntities.value.find(e => e.suffix === 'pm10')?.data.history || [])
  const pm25Data = parse(airQualityEntities.value.find(e => e.suffix === 'pm2_5')?.data.history || [])

  airQualityChart = new Chart(airCtx, {
    type: 'line',
    data: {
      datasets: [
        createDataset({ label: 'PM10', data: pm10Data, hidden: !showPM10.value, zones: pmZones }),
        createDataset({ label: 'PM2.5', data: pm25Data, hidden: !showPM25.value, zones: pmZones })
      ]
    },
    options: {
    ...commonChartOptions,
        onHover: createHoverHandler()
    }
  })
})

watch([showMaxNoise, showAvgNoise], () => {
  if (!noiseChart) return
  noiseChart.data.datasets[0].hidden = !showMaxNoise.value
  noiseChart.data.datasets[1].hidden = !showAvgNoise.value
  noiseChart.update()
})

watch([showPM10, showPM25], () => {
  if (!airQualityChart) return
  airQualityChart.data.datasets[0].hidden = !showPM10.value
  airQualityChart.data.datasets[1].hidden = !showPM25.value
  airQualityChart.update()
})
</script>

<style scoped>
.altruist-content { padding: var(--robo-space); }
.altruist-title { display: flex; align-items: center; gap: 0.5em; margin-bottom: var(--robo-space); font-weight: bold; }
.wifi-icon { width: 1.2em; height: 1.2em; flex-shrink: 0; }
.wifi-icon path { fill: currentColor; opacity: 0.2; transition: opacity 0.2s; }
.wifi-icon.no-signal path:nth-child(1) { opacity: 1; }
.wifi-icon.weak-signal path:nth-child(1), .wifi-icon.weak-signal path:nth-child(2) { opacity: 1; }
.wifi-icon.good-signal path { opacity: 1; }
.noise-controls, .airquality-controls { display: flex; gap: 1em; margin-bottom: var(--robo-space); }
.noise-controls label, .airquality-controls label { font-size: 0.875em; cursor: pointer; }
.noise-controls input, .airquality-controls input { margin-right: 0.25em; }
.noise-chart-canvas, .airquality-chart-canvas { width: 100%; height: 300px; margin-bottom: var(--robo-space); }
.current-noise-value, .current-airquality-value { margin-bottom: var(--robo-space); font-size: 0.9em; }
</style>
