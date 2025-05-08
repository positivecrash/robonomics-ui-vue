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
          <div class="current-value" v-if="averageNoiseEntity">
            <strong>{{ averageNoiseEntity.data.state }}</strong> {{ averageNoiseEntity.data.units }}
          </div>
          <div ref="noiseChartContainer" class="chart-container"></div>
        </robo-tab>

        <robo-tab label="Air quality">
            <div v-if="pm10Entity" class="current-value">
                <b>PM10:</b> {{ pm10Entity.data.state }} {{ pm10Entity.data.units }}
            </div>
            <div v-if="pm25Entity" class="current-value">
                <b>PM2.5:</b> {{ pm25Entity.data.state }} {{ pm25Entity.data.units }}
            </div>
          <div ref="airQualityChartContainer" class="chart-container"></div>
        </robo-tab>

        <robo-tab label="Atmosphere">
            <div class="current-value" v-if="temperatureEntity">
    <b>Temperature:</b> {{ temperatureEntity.data.state }}
    <span class="unit">{{ temperatureEntity.data.units }}</span>
  </div>
  <div class="current-value" v-if="humidityEntity">
    <b>Humidity:</b> {{ humidityEntity.data.state }}
    <span class="unit">{{ humidityEntity.data.units }}</span>
  </div>
  <div class="current-value" v-if="pressureEntity">
    <b>Pressure:</b> {{ pressureEntity.data.state }}
    <span class="unit">{{ pressureEntity.data.units }}</span>
  </div>


          <div ref="atmosphereChartContainer" class="chart-container"></div>
        </robo-tab>
      </robo-tabs>
    </div>
  </robo-section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import Highcharts from 'highcharts'

Highcharts.setOptions({
  lang: { decimalPoint: '.', thousandsSep: ',' }
})

const props = defineProps({
  datalog: { type: Object, required: true },
  devicedata: { type: Object, required: true }
})

defineOptions({ name: 'RoboSmarthomeDeviceAltruist' })

const noiseZones = [
  { value: 50, color: 'hsl(214, 98%, 50%)' },
  { value: 70, color: 'hsl(39, 100%, 50%)' },
  { color: 'hsl(0, 61%, 50%)' }
]

const pmZones = [
  { value: 25, color: 'hsl(214, 98%, 50%)' },
  { value: 50, color: 'hsl(39, 100%, 50%)' },
  { color: 'hsl(0, 61%, 50%)' }
]

const SUFFIXES = ['wifi_signal', 'pm10', 'pm2_5', 'humidity', 'temperature', 'pressure', 'maximum_noise', 'average_noise']

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
const atmosphereEntities = computed(() => parsedEntities.value.filter(e => ['temperature','humidity','pressure'].includes(e.suffix)))

const averageNoiseEntity = computed(() => noiseEntities.value.find(e => e.suffix === 'average_noise'))
const pm10Entity = computed(() => airQualityEntities.value.find(e => e.suffix === 'pm10'))
const pm25Entity = computed(() => airQualityEntities.value.find(e => e.suffix === 'pm2_5'))

const temperatureEntity = computed(() => atmosphereEntities.value.find(e => e.suffix === 'temperature') || null)
const humidityEntity = computed(() => atmosphereEntities.value.find(e => e.suffix === 'humidity') || null)
const pressureEntity = computed(() => atmosphereEntities.value.find(e => e.suffix === 'pressure') || null)

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

// refs and visibility
const noiseChartContainer = ref(null)
const airQualityChartContainer = ref(null)
const atmosphereChartContainer = ref(null)

const THREE_HOURS = 1 * 60 * 60 * 1000
const parse = hist =>
  hist
    .filter(r => !isNaN(+r.state))
    .map(r => [new Date(r.date).getTime(), +r.state])
    .filter(([ts]) => ts >= Date.now() - THREE_HOURS)
    .sort((a, b) => a[0] - b[0])

function renderNoiseChart() {
  const maxNoiseData = parse(noiseEntities.value.find(e => e.suffix === 'maximum_noise')?.data.history || [])
  const avgNoiseData = parse(noiseEntities.value.find(e => e.suffix === 'average_noise')?.data.history || [])

  Highcharts.chart(noiseChartContainer.value, {
    chart: { type: 'spline', zoomType: 'x' },
    title: { text: null },
    credits: { enabled: false },
    legend: { symbolWidth: 0 },
    plotOptions: {
      series: { zoneAxis: 'y', lineWidth: 2 }
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.x:%H:%M}</span><br/>',
      pointFormat: '<b>{series.name}</b>: {point.y}<br/>'
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: null } },
    series: [
      { name: 'Maximum Noise', data: maxNoiseData, zones: noiseZones },
      { name: 'Average Noise', data: avgNoiseData, zones: noiseZones }
    ]
  })
}

function renderAirQualityChart() {
  const pm10Data = parse(airQualityEntities.value.find(e => e.suffix === 'pm10')?.data.history || [])
  const pm25Data = parse(airQualityEntities.value.find(e => e.suffix === 'pm2_5')?.data.history || [])

  Highcharts.chart(airQualityChartContainer.value, {
    chart: { type: 'spline', zoomType: 'x' },
    title: { text: null },
    credits: { enabled: false },
    legend: { symbolWidth: 0 },
    plotOptions: {
      series: { zoneAxis: 'y', lineWidth: 2 }
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.x:%H:%M}</span><br/>',
      pointFormat: '<b>{series.name}</b>: {point.y}<br/>'
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: null } },
    series: [
      { name: 'PM10', data: pm10Data, zones: pmZones },
      { name: 'PM2.5', data: pm25Data, zones: pmZones }
    ]
  })
}

function renderAtmosphereChart() {
  const tempData = parse(atmosphereEntities.value.find(e => e.suffix === 'temperature')?.data.history || [])

  Highcharts.chart(atmosphereChartContainer.value, {
    chart: { type: 'spline', zoomType: 'x' },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    plotOptions: {
      series: { lineWidth: 2 }
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.x:%H:%M}</span><br/>',
      pointFormat: '<b>{series.name}</b>: {point.y}<br/>'
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: null } },
    series: [
      { name: 'Temperature', data: tempData }
    ]
  })
}

onMounted(() => {
  renderNoiseChart()
  renderAirQualityChart()
  renderAtmosphereChart()
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
.chart-container { width: 100%; height: 300px; margin-bottom: var(--robo-space); }
.current-value { margin-bottom: var(--robo-space); }
.current-value strong { font-size: 5rem; }
</style>
