<template>
  <svg
    ref="sliderRef"
    :viewBox="type === 'line' ? `0 0 ${lineWidth} ${lineHeight}` : `0 0 ${size} ${size}`"
    class="circular-slider"
    :class="disabled ? 'disabled' : ''"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @click="handleClick"
  >
    <!-- Circle version -->
    <g v-if="type === 'circle'" :transform="'rotate(90 ' + center + ' ' + center + ')'">
      <path :d="bgArcPath" stroke="#e5e5e5" :stroke-width="strokeWidth" fill="none" stroke-linecap="round" />
      <path :d="activeArcPath" :stroke="currentColor" :stroke-width="strokeWidth" fill="none" stroke-linecap="round" />
      <circle
        :cx="thumbPos.x"
        :cy="thumbPos.y"
        r="8"
        :fill="currentColor"
        stroke="#fff"
        stroke-width="2"
        style="pointer-events: all"
      />
    </g>

    <!-- Line version -->
    <g v-else>
      <line :x1="lineStart" :y1="lineCenter" :x2="lineEnd" :y2="lineCenter"
            stroke="#e5e5e5" :stroke-width="strokeWidth" stroke-linecap="round"/>
      <line :x1="lineStart" :y1="lineCenter" :x2="thumbPos.x" :y2="lineCenter"
            :stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round"/>
      <circle
        :cx="thumbPos.x"
        :cy="lineCenter"
        :r="thumbRadius"
        :fill="currentColor"
        stroke="#fff"
        stroke-width="2"
        style="pointer-events: all"
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
  gradient: { type: Boolean, default: false },
  gradientColors: {
    type: Array,
    default: () => ['#ffb74d', '#bababa', '#90caf9'] // warm → neutral → cool
  },
  disabled: { type: Boolean, default: false },
  isOn: { type: Boolean, default: true },
  strokeWidth: { type: Number, default: 16 },
  type: { type: String, default: 'circle' }, // "circle" or "line"
  min: { type: [Number, String], default: 0 },
  max: { type: [Number, String], default: 100 },
  step: { type: Number, default: 1 },
  size: { type: Number, default: 120 },
})

const emit = defineEmits(['update:modelValue', 'change'])


const sliderRef = ref(null)
const startAngle = 135
const endAngle = 405
const dragging = ref(false)

const minNum = computed(() => Number(props.min))
const maxNum = computed(() => Number(props.max))
const range = computed(() => {
  const r = maxNum.value - minNum.value
  return r <= 0 ? 1 : r
})

/* Internal value: changes during drag, emits to parent only on release/click */
const internal = ref(clamp(Number(props.modelValue)))

function clamp(v) {
  const n = Number(v)
  if (Number.isNaN(n)) return minNum.value
  return Math.min(maxNum.value, Math.max(minNum.value, n))
}

function snap(v) {
  const s = Math.max(1, Number(props.step) || 1)
  return Math.round(v / s) * s
}

const safeValue = computed(() => clamp(internal.value))

/* Colors */
const currentColor = computed(() => {
  if (!props.isOn) return '#cccccc'
  if (!props.gradient || props.gradientColors.length === 0) return props.color
  const t = (safeValue.value - minNum.value) / range.value
  const n = props.gradientColors.length - 1
  const idx = Math.min(Math.floor(t * n), n - 1)
  const localT = (t * n) - idx
  const a = hexToRgb(props.gradientColors[idx])
  const b = hexToRgb(props.gradientColors[idx + 1])
  return lerpColor(a, b, localT)
})

/* Circle geometry */
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const center = computed(() => props.size / 2)
const arcSpan = computed(() => endAngle >= startAngle ? (endAngle - startAngle) : (360 - startAngle + endAngle))

function polarToCartesian(cx, cy, r, angle) {
  const a = (angle - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}
function describeArc(cx, cy, r, a0, a1) {
  const start = polarToCartesian(cx, cy, r, a1)
  const end = polarToCartesian(cx, cy, r, a0)
  const largeArcFlag = (a1 - a0) <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

const bgArcPath = computed(() =>
  describeArc(center.value, center.value, radius.value, startAngle, endAngle)
)

const activeArcPath = computed(() => {
  const ratio = (safeValue.value - minNum.value) / range.value
  const angle = startAngle + arcSpan.value * ratio
  return describeArc(center.value, center.value, radius.value, startAngle, angle)
})

/* Line geometry */
const lineHeight = computed(() => props.strokeWidth * 3)
const lineWidth = computed(() => props.size)
const lineCenter = computed(() => lineHeight.value / 2)
const lineStart = computed(() => props.strokeWidth)
const lineEnd = computed(() => lineWidth.value - props.strokeWidth)

const thumbRadius = computed(() => props.type === 'line'
  ? Math.min(8, props.strokeWidth, lineHeight.value / 2)
  : 8
)

const thumbPos = computed(() => {
  if (props.type === 'line') {
    const ratio = (safeValue.value - minNum.value) / range.value
    let x = lineStart.value + ratio * (lineEnd.value - lineStart.value)
    x = Math.min(Math.max(x, lineStart.value + thumbRadius.value), lineEnd.value - thumbRadius.value)
    return { x, y: lineCenter.value }
  } else {
    const ratio = (safeValue.value - minNum.value) / range.value
    const angle = startAngle + arcSpan.value * ratio
    return polarToCartesian(center.value, center.value, radius.value, angle)
  }
})

/* Color helpers */
function lerpColor(a, b, t) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bb = Math.round(a[2] + (b[2] - a[2]) * t)
  return `rgb(${r},${g},${bb})`
}
function hexToRgb(hex) {
  let h = String(hex).replace(/^#/, '')
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  const num = parseInt(h, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}


function updateFromCoords(clientX, clientY) {
  if (props.disabled) return
  const rect = sliderRef.value?.getBoundingClientRect?.()
  if (!rect || !rect.width || !rect.height) return

  if (props.type === 'line') {
    const x = clientX - rect.left
    const ratio = (x - lineStart.value) / (lineEnd.value - lineStart.value)
    const unclamped = minNum.value + ratio * range.value
    internal.value = clamp(snap(unclamped))
  } else {
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    let angle = Math.atan2(dy, dx) * (180 / Math.PI)
    angle = (angle + 360) % 360

    // Normalize to [0,arcSpan]
    let rel = angle - startAngle
    if (rel < 0) rel += 360
    if (rel > arcSpan.value) rel = arcSpan.value

    const ratio = rel / arcSpan.value
    const unclamped = minNum.value + ratio * range.value
    internal.value = clamp(snap(unclamped))
  }
}

/* Events */
function startDrag(e) {
  if (props.disabled) return
  dragging.value = true
  const t = e.touches?.[0]
  updateFromCoords(t ? t.clientX : e.clientX, t ? t.clientY : e.clientY)
  window.addEventListener('mousemove', moveDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', moveDrag, { passive: false })
  window.addEventListener('touchend', stopDrag)
  e.preventDefault?.()
}

function moveDrag(e) {
  if (!dragging.value) return
  const t = e.touches?.[0]
  updateFromCoords(t ? t.clientX : e.clientX, t ? t.clientY : e.clientY)
  e.preventDefault?.()
}

function stopDrag() {
  if (!dragging.value) return
  dragging.value = false
  const v = safeValue.value
  emit('update:modelValue', v)
  window.removeEventListener('mousemove', moveDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', moveDrag)
  window.removeEventListener('touchend', stopDrag)
}

function handleClick(e) {
  if (props.disabled) return
  const t = e.touches?.[0]
  updateFromCoords(t ? t.clientX : e.clientX, t ? t.clientY : e.clientY)
  const v = safeValue.value
  // emit('update:modelValue', v)
  e.preventDefault?.()
}

/** Keep internal in sync with external modelValue / min / max, but not while dragging */
watch(
  () => [props.modelValue, minNum.value, maxNum.value],
  ([mv]) => {
    if (dragging.value) return
    internal.value = clamp(mv)
  },
  { immediate: true }
)
</script>

<style scoped>
.circular-slider {
  cursor: pointer;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 100%;
}

.circular-slider.disabled {
  pointer-events: none;
  opacity: 0.4;
}
</style>
