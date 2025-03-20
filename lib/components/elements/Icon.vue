<template>
  <span
    v-if="props.icon"
    v-bind="$attrs"
    :class="classes"
    :style="styles"
  ></span>
</template>


<script setup>

defineOptions({
  name: 'RoboIcon'
});

import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'inherit'
  },
  icon: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'normal',
    validator: value => ['supertiny', 'tiny', 'small', 'normal', 'medium', 'big', 'huge'].includes(value)
  }
})

const classes = computed(() => ({
  'robo-icon': true,
  [`robo-icon--size-${props.size}`]: props.size,
  [`robo-icon--${props.icon}`]: props.icon, // Позволяет кастомные стили для каждой иконки
}))

const styles = computed(() => ({
  '--icon-color': props.color,
  '--icon-size': calcIconSize(props.size),
  '--icon-content': `var(--icon-${props.icon})`
}))

const calcIconSize = icon => ({
  'supertiny': 'calc(var(--robo-font-size) * 0.4)',
  'tiny': 'calc(var(--robo-font-size) * 0.6)',
  'small': 'calc(var(--robo-font-size) * 0.8)',
  'normal': 'inherit',
  'medium': 'calc(var(--robo-font-size) * 1.5)',
  'big': 'calc(var(--robo-font-size) * 3)',
  'huge': 'calc(var(--robo-font-size) * 6)'
}[icon] ?? 'inherit')
</script>

<style>

@import '/lib/styles/icons.css';

@font-face {
  font-family: 'custom-icons';
  src: url('/lib/iconfonts/icons.woff2') format('woff2'),
       url('/lib/iconfonts/icons.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.robo-icon {
  font-family: 'custom-icons';
  font-style: normal;
  font-size: var(--icon-size, inherit);
  color: var(--icon-color, inherit);
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
}

.robo-icon::before {
  content: var(--icon-content, '');
  display: block;
  font-variant: normal;
  text-transform: none;
}
</style>
