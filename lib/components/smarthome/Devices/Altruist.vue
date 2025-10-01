<template>
  <robo-section card shadow>
    <div class="altruist-content">
      <h4 class="altruist-title">
        <svg
          class="wifi-icon"
          :class="wifiSignalClass"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 469.333 469.333"
          aria-hidden="true"
        >
          <path d="M170.667,336.6l64,64l64-64C263.36,301.293,205.973,301.293,170.667,336.6z"/>
          <path d="M85.333,251.267L128,293.933c58.88-58.88,154.453-58.88,213.333,0L384,251.267C301.547,168.813,167.787,168.813,85.333,251.267z"/>
          <path d="M0,165.933L42.667,208.6c106.027-106.027,277.973-106.027,384,0l42.667-42.667C339.733,36.333,129.6,36.333,0,165.933z"/>
        </svg>
        {{ devicedata.name }}
      </h4>

      <!-- Если нет ни одного живого датчика — показываем заглушку -->
      <robo-text v-if="noDataToShow" size="small">
        Unavailable, check device's internet connection.
      </robo-text>

      <!-- Иначе — раскрываем табы -->
      <robo-tabs v-else>
        <robo-tab label="Noise">
          <div
            class="current-value"
            v-if="averageNoiseEntity && averageNoiseEntity.data.state !== 'unavailable'"
          >
            <strong>{{ averageNoiseEntity.data.state }}</strong>
            {{ averageNoiseEntity.data.units }}
          </div>

          <!-- контейнер всегда в DOM, просто скрыт, если нет данных -->
          <div
            class="chart-container"
            ref="noiseChartContainer"
            v-show="noiseMaxData.length || avgNoiseData.length"
          ></div>
        </robo-tab>

        <robo-tab label="Air quality">
          <div
            v-if="pm10Entity && pm10Entity.data.state !== 'unavailable'"
            class="current-value"
          >
            <b>PM10:</b> {{ pm10Entity.data.state }}
            {{ pm10Entity.data.units }}
          </div>
          <div
            v-if="pm25Entity && pm25Entity.data.state !== 'unavailable'"
            class="current-value"
          >
            <b>PM2.5:</b> {{ pm25Entity.data.state }}
            {{ pm25Entity.data.units }}
          </div>

          <div
            class="chart-container"
            ref="airQualityChartContainer"
            v-show="pm10Data.length || pm25Data.length"
          ></div>

          <robo-status type="info" v-if="!pm10Data.length && !pm25Data.length">No data available for display</robo-status>
        </robo-tab>

        <robo-tab label="Atmosphere">
          <div class="current-value" v-if="currentAtmosEntity">
            <b>{{ currentAtmosLabel }}:</b>
            {{ currentAtmosValue }}
            <span class="unit">{{ currentAtmosEntity.data.units }}</span>
          </div>

          <div
            class="chart-container"
            ref="atmosphereChartContainer"
            v-show="selectedAtmosData.length"
          ></div>
        </robo-tab>
      </robo-tabs>
    </div>
  </robo-section>
</template>

<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import Highcharts from 'highcharts'

Highcharts.setOptions({
  lang: { decimalPoint: '.', thousandsSep: ',' }
})

const props = defineProps({
  datalog: { type: Object, required: true },
  devicedata: { type: Object, required: true }
})

defineOptions({ name: 'RoboSmarthomeDeviceAltruist' })

const SUFFIXES = [
  'wifi_signal',
  'signal_strength',
  'pm10',
  'pm2_5',
  'humidity',
  'temperature',
  'pressure',
  'maximum_noise',
  'average_noise'
]

// парсинг истории в [timestamp, value]
function parse(hist) {
  return hist
    .filter(r => !isNaN(+r.state))
    .map(r => [new Date(r.date).getTime(), +r.state])
    .filter(([ts]) => ts >= Date.now() - 3 * 60 * 60 * 1000)
    .sort((a, b) => a[0] - b[0])
}

// вычисляем общий префикс устройства
const getBaseKey = (entityId) => {
  const obj = entityId.split('.')[1] || ''
  return obj.split('_')[0] || ''

}

const deviceKey = computed(() => {
  const first = Object.keys(props.devicedata.entities)[0] || ''
  return getBaseKey(first)
})

// ищем все entity этого устройства в datalog
const allEntityIds = computed(() => {
  return Object.keys(props.datalog.entities || {}).filter(id =>
    getBaseKey(id) === deviceKey.value
  )
})

// разбиваем на объекты { entityId, data, suffix }
const parsedEntities = computed(() =>
  allEntityIds.value.map(id => {
    const data = props.datalog.entities[id] || {}
    const obj = id.split('.')[1] || ''
    const suffix = SUFFIXES.find(s => obj.endsWith(`_${s}`)) || 'unknown'
    return { entityId: id, data, suffix }
  })
)

// фильтруем по типам
const noiseEntities = computed(() =>
  parsedEntities.value.filter(e =>
    ['maximum_noise', 'average_noise'].includes(e.suffix)
  )
)
const airQualityEntities = computed(() =>
  parsedEntities.value.filter(e => ['pm10', 'pm2_5'].includes(e.suffix))
)
const atmosphereEntities = computed(() =>
  parsedEntities.value.filter(e =>
    ['temperature', 'humidity', 'pressure'].includes(e.suffix)
  )
)

// текущие значения
const averageNoiseEntity = computed(() =>
  noiseEntities.value.find(e => e.suffix === 'average_noise')
)
const pm10Entity = computed(() =>
  airQualityEntities.value.find(e => e.suffix === 'pm10')
)
const pm25Entity = computed(() =>
  airQualityEntities.value.find(e => e.suffix === 'pm2_5')
)
const temperatureEntity = computed(
  () => atmosphereEntities.value.find(e => e.suffix === 'temperature') || null
)
const humidityEntity = computed(
  () => atmosphereEntities.value.find(e => e.suffix === 'humidity') || null
)
const pressureEntity = computed(
  () => atmosphereEntities.value.find(e => e.suffix === 'pressure') || null
)

const availableAtmosMetrics = computed(() => {
  const list = []
  if (temperatureEntity.value) list.push('temperature')
  if (humidityEntity.value) list.push('humidity')
  if (pressureEntity.value) list.push('pressure')
  return list
})

const selectedAtmosMetric = ref('temperature')
watch(availableAtmosMetrics, (avail) => {
  if (!avail.includes(selectedAtmosMetric.value)) {
    selectedAtmosMetric.value = avail[0] || 'temperature'
  }
}, { immediate: true })

const currentAtmosEntity = computed(() => {
  if (selectedAtmosMetric.value === 'humidity') return humidityEntity.value
  if (selectedAtmosMetric.value === 'pressure') return pressureEntity.value
  return temperatureEntity.value
})

const currentAtmosLabel = computed(() => {
  return {
    temperature: 'Temperature',
    humidity: 'Humidity',
    pressure: 'Pressure'
  }[selectedAtmosMetric.value]
})

const selectedAtmosData = computed(() => {
  if (selectedAtmosMetric.value === 'humidity') return humidityData.value
  if (selectedAtmosMetric.value === 'pressure') return pressureData.value
  return tempData.value
})

const currentAtmosValue = computed(() => {
  const raw = Number(currentAtmosEntity.value?.data?.state)
  if (isNaN(raw)) return currentAtmosEntity.value?.data?.state || ''
  return raw.toFixed(2)
})

// Wi-Fi сигнал
const wifiStrength = computed(() => {
  const w = parsedEntities.value.find(e => e.suffix === 'wifi_signal' || e.suffix === 'signal_strength')
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

// данные для графиков
const noiseMaxData = computed(() =>
  parse(noiseEntities.value.find(e => e.suffix === 'maximum_noise')?.data.history || [])
)
const avgNoiseData = computed(() =>
  parse(noiseEntities.value.find(e => e.suffix === 'average_noise')?.data.history || [])
)
const pm10Data = computed(() =>
  parse(airQualityEntities.value.find(e => e.suffix === 'pm10')?.data.history || [])
)
const pm25Data = computed(() =>
  parse(airQualityEntities.value.find(e => e.suffix === 'pm2_5')?.data.history || [])
)
const tempData = computed(() =>
  parse(atmosphereEntities.value.find(e => e.suffix === 'temperature')?.data.history || [])
)
const humidityData = computed(() =>
  parse(atmosphereEntities.value.find(e => e.suffix === 'humidity')?.data.history || [])
)
const pressureData = computed(() =>
  parse(atmosphereEntities.value.find(e => e.suffix === 'pressure')?.data.history || [])
)

// контейнеры для рендера
const noiseChartContainer = ref(null)
const airQualityChartContainer = ref(null)
const atmosphereChartContainer = ref(null)
const atmosphereChart = ref(null)

// зоны для Highcharts
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

// когда нет НИКАКИХ данных для всех датчиков
const noDataToShow = computed(() =>
  [averageNoiseEntity, pm10Entity, pm25Entity, temperatureEntity, humidityEntity, pressureEntity].every(
    e => !e.value || e.value.data.state === 'unavailable'
  )
)

// рендер-функции с защитой от отсутствия контейнера
function renderNoiseChart() {
  if ((!noiseMaxData.value.length && !avgNoiseData.value.length) || !noiseChartContainer.value) {
    return
  }
  Highcharts.chart(noiseChartContainer.value, {
    chart: { type: 'spline', zoomType: 'x' },
    title: { text: null },
    credits: { enabled: false },
    legend: { symbolWidth: 0 },
    plotOptions: { series: { zoneAxis: 'y', lineWidth: 2 } },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.x:%H:%M}</span><br/>',
      pointFormat: '<b>{series.name}</b>: {point.y:.2f}<br/>'
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: null } },
    series: [
      { name: 'Maximum Noise', data: noiseMaxData.value, zones: noiseZones },
      { name: 'Average Noise', data: avgNoiseData.value, zones: noiseZones }
    ]
  })
}

function renderAirQualityChart() {
  if ((!pm10Data.value.length && !pm25Data.value.length) || !airQualityChartContainer.value) {
    return
  }
  Highcharts.chart(airQualityChartContainer.value, {
    chart: { type: 'spline', zoomType: 'x' },
    title: { text: null },
    credits: { enabled: false },
    legend: { symbolWidth: 0 },
    plotOptions: { series: { zoneAxis: 'y', lineWidth: 2 } },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.x:%H:%M}</span><br/>',
      pointFormat: '<b>{series.name}</b>: {point.y:.2f}<br/>'
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: null } },
    series: [
      { name: 'PM10', data: pm10Data.value, zones: pmZones },
      { name: 'PM2.5', data: pm25Data.value, zones: pmZones }
    ]
  })
}

function renderAtmosphereChart() {
  if ((!selectedAtmosData.value.length) || !atmosphereChartContainer.value) {
    return
  }
  const labelMap = { temperature: 'Temperature', humidity: 'Humidity', pressure: 'Pressure' }
  const seriesDefs = []
  if (tempData.value.length) {
    seriesDefs.push({
      name: labelMap.temperature,
      data: tempData.value.slice(),
      visible: selectedAtmosMetric.value === 'temperature',
      events: { legendItemClick: function() { legendClickHandler('temperature'); return false } }
    })
  }
  if (humidityData.value.length) {
    seriesDefs.push({
      name: labelMap.humidity,
      data: humidityData.value.slice(),
      visible: selectedAtmosMetric.value === 'humidity',
      events: { legendItemClick: function() { legendClickHandler('humidity'); return false } }
    })
  }
  if (pressureData.value.length) {
    seriesDefs.push({
      name: labelMap.pressure,
      data: pressureData.value.slice(),
      visible: selectedAtmosMetric.value === 'pressure',
      events: { legendItemClick: function() { legendClickHandler('pressure'); return false } }
    })
  }

  const unitLabel = selectedAtmosMetric.value === 'temperature' ? '{value}°' : (selectedAtmosMetric.value === 'humidity' ? '{value}%' : '{value} hPa')

  if (atmosphereChart.value) {
    try { atmosphereChart.value.destroy() } catch {}
    atmosphereChart.value = null
  }

  atmosphereChart.value = Highcharts.chart(atmosphereChartContainer.value, {
    chart: { type: 'spline', zoomType: 'x' },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: true, symbolWidth: 0 },
    plotOptions: { series: { lineWidth: 2 } },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.x:%H:%M}</span><br/>',
      pointFormat: '<b>{series.name}</b>: {point.y:.2f}<br/>'
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: { text: null }, labels: { format: unitLabel } },
    series: seriesDefs
  })
}

function legendClickHandler(metric) {
  selectedAtmosMetric.value = metric
  const chart = atmosphereChart.value
  if (!chart) return false
  const labelMap = { temperature: 'Temperature', humidity: 'Humidity', pressure: 'Pressure' }
  const targetName = labelMap[metric]
  chart.series.forEach(s => {
    const shouldBeVisible = s.name === targetName
    if (s.visible !== shouldBeVisible) {
      s.setVisible(shouldBeVisible, false)
    }
  })
  chart.redraw()
  return false
}

// отслеживаем изменения данных
watch([noiseMaxData, avgNoiseData], renderNoiseChart)
watch([pm10Data, pm25Data], renderAirQualityChart)
watch([tempData, humidityData, pressureData], renderAtmosphereChart)

onMounted(async () => {
  await nextTick()
  renderNoiseChart()
  renderAirQualityChart()
  renderAtmosphereChart()
})

onUnmounted(() => {
  if (atmosphereChart.value) {
    try { atmosphereChart.value.destroy() } catch {}
    atmosphereChart.value = null
  }
})
</script>

<style scoped>
.altruist-content {
  padding: var(--robo-space);
}
.altruist-title {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: var(--robo-space);
  font-weight: bold;
}
.wifi-icon {
  width: 1.2em;
  height: 1.2em;
  flex-shrink: 0;
}
.wifi-icon path {
  fill: currentColor;
  opacity: 0.2;
  transition: opacity 0.2s;
}
.wifi-icon.no-signal path:nth-child(1) {
  opacity: 1;
}
.wifi-icon.weak-signal path:nth-child(1),
.wifi-icon.weak-signal path:nth-child(2) {
  opacity: 1;
}
.wifi-icon.good-signal path {
  opacity: 1;
}
.chart-container {
  width: 100%;
  height: 300px;
  margin-bottom: var(--robo-space);
}
.current-value {
  margin-bottom: var(--robo-space);
}
.current-value strong {
  font-size: 5rem;
}
</style>
