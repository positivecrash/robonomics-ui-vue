<template>
  <svg
    ref="sliderRef"
    :viewBox="type === 'line' ? `0 0 ${lineWidth} ${lineHeight}` : `0 0 ${size} ${size}`"
    class="circular-slider"
    @mousedown.prevent="startDrag"
    @touchstart.prevent="startDrag"
    @click.prevent="handleClick"
  >
    <!-- Circle version -->
    <g v-if="type === 'circle'" :transform="'rotate(90 ' + center + ' ' + center + ')'">
      <path :d="bgArcPath" stroke="#e5e5e5" :stroke-width="strokeWidth" fill="none" stroke-linecap="round" />
      <path :d="activeArcPath" :stroke="currentColor" :stroke-width="strokeWidth" fill="none" stroke-linecap="round" />
      <circle :cx="thumbPos.x" :cy="thumbPos.y" r="8" :fill="currentColor" stroke="#fff" stroke-width="2" />
    </g>

    <!-- Line version -->
    <g v-else>
      <line :x1="lineStart" :y1="lineCenter" :x2="lineEnd" :y2="lineCenter"
            stroke="#e5e5e5" :stroke-width="strokeWidth" stroke-linecap="round"/>
      <line :x1="lineStart" :y1="lineCenter" :x2="thumbPos.x" :y2="lineCenter"
            :stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round"/>
      <circle
        :cx="thumbPos.x"
        :cy="props.type === 'line' ? lineCenter : thumbPos.y"
        :r="thumbRadius"
        :fill="currentColor"
        stroke="#fff"
        stroke-width="2"
      />
    </g>
  </svg>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

defineOptions({ name: 'RoboSlider' })

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  color: { type: String, default: '#ffd180' },
  gradient: {type: Boolean, default: false},
  gradientColors: {
    type: Array,
    default: () => ['#ffb74d', '#bababa', '#90caf9'] // warm → neutral → cool
  },
  disabled: { type: Boolean, default: false },
  isOn: { type: Boolean, default: true },
  strokeWidth: { type: Number, default: 16 },
  type: { type: String, default: 'circle' }, // "circle" or "line"
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  size: { type: Number, default: 120 },
})

const emit = defineEmits(['update:modelValue', 'change'])

const sliderRef = ref(null)
const startAngle = 135
const endAngle = 405
const dragging = ref(false)
const tempValue = ref(props.modelValue)

const safeValue = computed(() => {
  const v = Number(tempValue.value)
  if (isNaN(v)) return props.min
  return Math.min(props.max, Math.max(props.min, v))
})

const currentColor = computed(() => {
  if (!props.isOn) return '#cccccc'
  if (!props.gradient || props.gradientColors.length === 0) return props.color

  const t = (safeValue.value - props.min) / (props.max - props.min)
  const n = props.gradientColors.length - 1
  const idx = Math.min(Math.floor(t * n), n - 1)
  const localT = (t * n) - idx

  const start = hexToRgb(props.gradientColors[idx])
  const end = hexToRgb(props.gradientColors[idx + 1])
  return lerpColor(start, end, localT)
})


const thumbRadius = computed(() => {
  if (props.type === 'line') {
    return Math.min(8, props.strokeWidth, lineHeight.value / 2)
  } else {
    return 8 
  }
})

watch(
  () => props.isOn,
  (val) => {
    if (val && (tempValue.value == null || tempValue.value <= props.min)) {
      tempValue.value = props.min
    }
  }
)
watch(
  () => props.modelValue,
  (val) => {
    const v = Number(val)
    if (isNaN(v)) {
      tempValue.value = props.min
    } else {
      tempValue.value = Math.min(props.max, Math.max(props.min, v))
    }
  },
  { immediate: true }
)

// Circle geometry 
function polarToCartesian(cx, cy, r, angle) {
  const a = (angle - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const center = computed(() => props.size / 2)
const bgArcPath = computed(() => describeArc(center.value, center.value, radius.value, startAngle, endAngle))
const activeArcPath = computed(() => {
  const angle = startAngle + ((endAngle - startAngle) * ((safeValue.value - props.min) / (props.max - props.min)))
  return describeArc(center.value, center.value, radius.value, startAngle, angle)
})

// Line geometry 
const lineHeight = computed(() => props.strokeWidth * 3)
const lineWidth = computed(() => props.size)
const lineCenter = computed(() => lineHeight.value / 2)
const lineStart = computed(() => props.strokeWidth)
const lineEnd = computed(() => lineWidth.value - props.strokeWidth)

const thumbPos = computed(() => {
  if (props.type === 'line') {
    const ratio = (safeValue.value - props.min) / (props.max - props.min)
    let x = lineStart.value + ratio * (lineEnd.value - lineStart.value)
    x = Math.min(Math.max(x, lineStart.value + thumbRadius.value), lineEnd.value - thumbRadius.value)
    return { x, y: lineCenter.value }
  } else {
    const angle = startAngle + ((endAngle - startAngle) * ((safeValue.value - props.min) / (props.max - props.min)))
    return polarToCartesian(center.value, center.value, radius.value, angle)
  }
})

function lerpColor(a, b, t) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const b_ = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r},${g},${b_})`
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('')
  }
  const num = parseInt(hex, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function updateValueFromCoords(clientX, clientY) {
  if (props.disabled) return
  const rect = sliderRef.value.getBoundingClientRect()

  if (props.type === 'line') {
    const x = clientX - rect.left
    let value = props.min + ((x - lineStart.value) / (lineEnd.value - lineStart.value)) * (props.max - props.min)
    tempValue.value = Math.round(value)
  } else {
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    let angle = Math.atan2(dy, dx) * (180 / Math.PI)
    angle = (angle + 360) % 360
    let relativeAngle = angle - startAngle
    if (relativeAngle < 0) relativeAngle += 360
    const arcLength = (endAngle - startAngle) % 360
    if (relativeAngle > arcLength) relativeAngle = arcLength
    tempValue.value = Math.round(props.min + (relativeAngle / arcLength) * (props.max - props.min))
  }
}

function startDrag(e) {
  if (props.disabled) return
  dragging.value = true
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  updateValueFromCoords(clientX, clientY)
  window.addEventListener('mousemove', moveDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', moveDrag)
  window.addEventListener('touchend', stopDrag)
}

function moveDrag(e) {
  if (!dragging.value) return
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  updateValueFromCoords(clientX, clientY)
}

function stopDrag() {
  if (!dragging.value) return
  dragging.value = false
  emit('update:modelValue', safeValue.value)
  emit('change', safeValue.value)
  window.removeEventListener('mousemove', moveDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', moveDrag)
  window.removeEventListener('touchend', stopDrag)
}

function handleClick(e) {
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  updateValueFromCoords(clientX, clientY)
  emit('update:modelValue', safeValue.value)
  emit('change', safeValue.value)
}
</script>

<style scoped>
.circular-slider {
  cursor: pointer;
  user-select: none;
}
</style>


