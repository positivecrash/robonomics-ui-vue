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
import { defineProps, computed, defineAsyncComponent } from 'vue'

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
      return ['tiny', 'small', 'normal', 'medium', 'big', 'huge'].indexOf(value) !== -1;
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
    'tiny': 'calc(var(--font-size) * 0.5)',
    'small': 'calc(var(--font-size) * 0.7)',
    'normal': 'inherit',
    'medium': 'calc(var(--font-size) * 1.5)',
    'big': 'calc(var(--font-size) * 3)',
    'huge': 'calc(var(--font-size) * 6)'
}[icon] ?? 'inherit')

const iconSize = computed( () => {
  return calcIconSize(props.size)
})

let svg = defineAsyncComponent(() =>
  import(`../icons/${props.icon}.vue`)
)

// onMounted(() => {
//   watch(props.icon, value => {
//     let svg = defineAsyncComponent(() =>
//       import(`../icons/${value}.vue`)
//     )
//   })
// })
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

    display: inline-block;
    line-height: 1;
    color: var(--icon-color);
    font-size: var(--icon-size);
  }
</style>