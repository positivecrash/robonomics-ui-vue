<template>
  <div class="robo-toggle">
    <input
      type="checkbox"
      :id="uniqueId"
      v-bind="$attrs"
      v-model="model"
      :disabled="status==='waiting' || $attrs?.disabled"
    />

    <label :for="uniqueId" aria-hidden="true">Toggle</label>

    <robo-details v-if="status" class="robo-toggle-status">
      <template #summary>
        <robo-icon :icon="statusIcon" :color="statusColor" />
      </template>
      <template v-if="statusComment">
        {{ statusComment }}
      </template>
    </robo-details>

  </div>
</template>

<script setup>
defineOptions({
  name: 'RoboToggle',
  inheritAttrs: false
});

import { ref, computed, watch } from 'vue';

const model = defineModel();

const props = defineProps({
  status: {
    type: String,
    default: null,
    validator: (v) => ['init', 'waiting', 'ok', 'error', 'warning'].includes(v)
  },
  statusComment: {
    type: String,
    default: ''
  }
});

const uniqueId = computed(() => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
});

const statusIcon = computed( () => ({
      'waiting': 'clock',
      'ok': 'circle-check',
      'warning': 'circle-exclamation',
      'error': 'circle-xmark',
  }[props.status] ??  null)
);

const statusColor = computed( () => ({
      'waiting': 'var(--robo-color-orange)',
      'ok': 'var(--robo-color-green)',
      'warning': 'var(--robo-color-orange)',
      'error': 'var(--robo-color-red)',
  }[props.status] ??  null)
);
</script>

<style>
.robo-toggle .robo-icon svg path {
  stroke: #fff;
  stroke-width: 2px;
}
</style>

<style scoped>
.robo-toggle {
  --size: 36px;
  --koef: 0.6;
  --toggler: 8px;
  position: relative;
}

.robo-toggle-status {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

input[type="checkbox"] {
  height: 0;
  position: absolute;
  visibility: hidden;
  width: 0;
}

label {
  background: var(--robo-color-dark);
  border-radius: calc(var(--size) * var(--koef));
  cursor: pointer;
  display: block;
  height: calc(var(--size) * var(--koef));
  position: relative;
  text-indent: -9999px;
  width: var(--size);
}

label:after {
  content: '';
  position: absolute;
  top: calc(var(--toggler) * 0.5);
  left: calc(var(--toggler) * 0.5);
  width: calc(var(--size) * var(--koef) - var(--toggler));
  height: calc(var(--size) * var(--koef) - var(--toggler));
  background: var(--robo-color-light);
  border-radius: calc(var(--size) * var(--koef) - var(--toggler));
  transition: 0.3s;
}

input:checked + label {
  background: var(--robo-color-green);
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: calc(var(--size) * var(--koef));
}

input[type="checkbox"][disabled] + label {
  opacity: 0.4;
  cursor: default;
}
</style>
