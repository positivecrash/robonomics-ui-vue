<template>
  <div>
    <div ref="lightChartContainer" class="chart-container"></div>
    
    <table class="history-table" v-if="props.history.length">
      <thead>
        <tr>
          <th>Date</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in recentHistory" :key="index">
          <td>{{ formatDate(item.date) }}</td>
          <td :class="item.state === 'on' ? 'on' : 'off'">
            {{ item.state.toUpperCase() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import Highcharts from 'highcharts'

defineOptions({ name: 'RoboHistoryChart' })

const props = defineProps({
  history: { type: Array, default: () => [] },
  title: { type: String }
})

const lightChartContainer = ref(null)
let chart = null

function initChart() {
  chart = Highcharts.chart(lightChartContainer.value, {
    chart: { type: 'line', height: 250 },
    title: { text: props.title },
    xAxis: { type: 'datetime' },
    yAxis: {
      min: 0,
      max: 1,
      tickPositions: [0, 1],
      labels: { formatter() { return this.value ? 'ON' : 'OFF' } }
    },
    series: [{ name: props.title, data: [], step: 'left' }],
    credits: { enabled: false },
    tooltip: {
      formatter() {
        return `<b>${this.series.name}</b><br/>${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}<br/>State: ${this.y ? 'ON' : 'OFF'}`
      }
    }
  })
}

// Update chart dynamically
function updateChart(newHistory) {
  if (!chart) return
  const series = chart.series[0]

  // Map new data points
  const data = newHistory.map(item => [
    new Date(item.date).getTime(),
    item.state === 'on' ? 1 : 0
  ])

  series.setData(data, true)
}

onMounted(() => {
  initChart()
  updateChart(props.history)
})

watch(
  () => props.history,
  (newVal) => updateChart(newVal),
  { deep: true }
)

onBeforeUnmount(() => {
  if (chart) chart.destroy()
})

// Small table showing the most recent 10 entries
const recentHistory = computed(() => {
  return props.history.slice(-10).reverse()
})

function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleString()
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 250px;
  margin-bottom: 1em;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  border: 1px solid #ccc;
  padding: 0.5em;
  text-align: left;
}

.history-table th {
  background-color: var(--robo-color-light-90);
}

.history-table th, .history-table td {
  padding: 0.25em 0.5em; /* small cells */
  text-align: center;
  border: 1px solid var(--robo-color-light-80);
}
</style>
