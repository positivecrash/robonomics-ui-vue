<template>
  <div class="color-picker">
    <label class="color-wheel">
      <input
        type="color"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="wheel-display" :style="{ backgroundColor: modelValue }"></span>
    </label>
    <input
      class="hex-input"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>

defineOptions({ name: 'RoboColorPicker' })

const props = defineProps({
  modelValue: { type: String, default: '#ffffff' }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.color-wheel {
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.color-wheel input[type="color"] {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0;
  cursor: pointer;
}

.wheel-display {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--robo-color-light-80);
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.2) inset; */
  /* background-image: linear-gradient(45deg, var(--robo-color-light-80) 25%, transparent 25%),
    linear-gradient(-45deg, var(--robo-color-light-80) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--robo-color-light-80) 75%),
    linear-gradient(-45deg, transparent 75%, var(--robo-color-light-80) 75%); */
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0;
}

.wheel-display {
  background-color: v-bind('modelValue');
}

.hex-input {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--robo-color-light-80);
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.85rem;
  width: 90px;
  text-align: center;
}
</style>

