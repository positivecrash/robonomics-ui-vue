<template>
    <div :class="classList" v-if="!timeouttrigger">
        <span v-if="textLeft" v-html="textLeft" />
        <span class="robob-status-text"><slot name="left" /></span>
        <robo-icon :icon="icon" :color="color" />
        <span v-if="textRight" v-html="textRight" />
        <span class="robob-status-text"><slot name="right" /></span>
    </div>
</template>

<script>
  export default { name: 'RoboStatus' }
</script>


<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'

const props = defineProps({
  // replace it with offset
   gap: {
      type: String,
      default: null,
      validator: function (value) {
        return ['top', 'right', 'bottom', 'left', 'all'].indexOf(value) !== -1;
      }
    },
    // try to deprecate
    textRight: {
      type: String,
      default: null
    },
    // try to deprecate
    textLeft: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: null
    },
    // deprecate 'success' status
    type: {
      type: String,
      default: null,
      required: true,
      validator: function (value) {
        return ['ok', 'success', 'info', 'warning', 'error', 'none'].indexOf(value) !== -1;
      }
    }
})

const classList = computed (() => {
  return {
    [`robo-status`]: true,
    [`robo-status--${props.type}`]: props.type,
    [`robo-status--gap-${props.gap}`]: props.gap,
  }
})

const icon = computed (() => {
  switch(props.type) {
      case 'success':
          return 'circle-check'
      case 'ok':
          return 'circle-check'
      case 'info':
          return 'circle-info'
      case 'warning':
          return 'circle-exclamation'
      case 'error':
          return 'circle-xmark'
  }
})

const color = computed (() => {
  switch(props.type) {
      case 'success':
          return 'var(--color-green)'
      case 'ok':
          return 'var(--color-green)'
      case 'info':
          return 'var(--color-blue)'
      case 'warning':
          return 'var(--color-orange)'
      case 'error':
          return 'var(--color-red)'
  }
})

const timeouttrigger = ref(false)

onMounted(() => {
  if(props.timeout) {
    setTimeout(() => {
      timeouttrigger.value = true
    }, props.timeout)
  }
})

</script>

<style scoped>

    .robo-status {
        --status-color: var(--color-dark);
        --status-gap: calc(var(--gap-layout) * 0.5);

        align-items: center;
        display: inline-flex;
        gap: var(--status-gap);
        line-height: 1.2;
    }
    
    .robo-status--gap-top { margin-top: var(--status-gap) }
    .robo-status--gap-right { margin-right: var(--status-gap) }
    .robo-status--gap-bottom { margin-bottom: var(--status-gap) }
    .robo-status--gap-left { margin-left: var(--status-gap) }
    .robo-status--gap-all { margin: var(--status-gap) }

</style>