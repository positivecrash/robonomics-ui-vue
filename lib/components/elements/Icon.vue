<template>
    <span
      v-if="props.icon"
      v-bind="$attrs"
      :class="classes"
    >
      <component :is="svg" />
    </span>
</template>

<script>
  export default { name: 'RoboIcon' }
</script>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'inherit'
  },
  icon: {
      type: String,
      default: null
  },
  size: {
    type: String,
    default: 'normal',
    validator: function (value) {
      return ['supertiny', 'tiny', 'small', 'normal', 'medium', 'big', 'huge'].indexOf(value) !== -1;
    }
  }
})

const classes = computed ( () => {
  return {
    [`robo-icon`]: true,
    [`robo-icon--size-${props.size}`]: props.size,
  }
})

const iconColor = computed( () => {
  return props.color
})

const calcIconSize = icon => ({
    'supertiny': 'calc(var(--robo-font-size) * 0.4)',
    'tiny': 'calc(var(--robo-font-size) * 0.6)',
    'small': 'calc(var(--robo-font-size) * 0.8)',
    'normal': 'inherit',
    'medium': 'calc(var(--robo-font-size) * 1.5)',
    'big': 'calc(var(--robo-font-size) * 3)',
    'huge': 'calc(var(--robo-font-size) * 6)'
}[icon] ?? 'inherit')

const iconSize = computed( () => {
  return calcIconSize(props.size)
})

let svg = defineAsyncComponent(() =>
  import(`../../icons/${props.icon}.vue`)
)
/* - Get svg of icon */

</script>

<style>
  .robo-icon svg {
    box-sizing: content-box;
    height: 1em;
    overflow: visible;
    vertical-align: middle;
  }

  .robo-icon svg path {
    fill: currentColor
  }
</style>

<style scoped>
  .robo-icon {
    --icon-color: v-bind(iconColor);
    --icon-size: v-bind(iconSize);

    color: var(--icon-color);
    font-size: var(--icon-size);
  }

  .robo-icon, .robo-icon svg {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
</style>