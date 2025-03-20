<template>
    <div :class="classList" v-if="!timeouttrigger && !closethis">
        <span v-if="slots.left" class="robo-status-text"><slot name="left" /></span>

        <robo-icon :icon="statusIcon" color="var(--color-accent)" />

        <!-- <robo-icon v-if="type === 'ok'" icon="circle-check" color="var(--color-accent)" />
        <robo-icon v-if="type === 'info'" icon="circle-info" color="var(--color-accent)" />
        <robo-icon v-if="type === 'warning'" icon="circle-exclamation" color="var(--color-accent)" />
        <robo-icon v-if="type === 'error'" icon="circle-xmark" color="var(--color-accent)" /> -->

        <span v-if="slots.default" class="robo-status-text"><slot /></span>

        <robo-button v-if="close" @click="closesubmit" clean class="robo-status-close"><robo-icon icon="xmark" /></robo-button>
    </div>
</template>

<script>
  export default { name: 'RoboStatus' }
  /* TODO:
  timeout showcase;
  smooth behaviour;
  */
</script>


<script setup>
import { computed, ref, onMounted, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
    close: {
      type: Boolean,
      default: false
    },
    offset: {
      type: String,
      default: 'x0',
      validator(value) {
        return ['x0', 'x025', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },
    solid: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: null
    },

    type: {
      type: String,
      default: null,
      required: true,
      validator: function (value) {
        return ['ok', 'info', 'warning', 'error', 'none'].indexOf(value) !== -1;
      }
    }
})

const classList = computed (() => {
  return {
    [`robo-status`]: true,
    [`robo-status--solid`]: props.solid,
    [`robo-status--${props.type}`]: props.type,
  }
})

const statusIcon = computed( () => ({
      'ok': 'circle-check',
      'info': 'circle-info',
      'warning': 'circle-exclamation',
      'error': 'circle-xmark',
  }[props.type] ??  null)
);

let calcGap = gap => 
  ({
    'x0': 'none',
    'x025': 'calc(var(--gap-layout) * 0.25)',
    'x05': 'calc(var(--gap-layout) * 0.5)',
    'x1': 'var(--gap-layout)',
    'x2': 'calc(var(--gap-layout) * 2)',
    'x4': 'calc(var(--gap-layout) * 4)'
}[gap] ?? 'none')

const offsetFromData = computed( () => {
  return calcGap(props.offset)
})

const timeouttrigger = ref(false)
const closethis = ref(false)

const closesubmit = () => {
  closethis.value = true
}

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
        --status-gap: calc(var(--gap-layout) * 0.5);
        --status-padding: 0;
        --offset: v-bind(offsetFromData);

        align-items: center;
        display: inline-flex;
        font-weight: bold;
        gap: var(--status-gap);
        line-height: 1.2;
        position: relative;
        padding: var(--status-padding);
        margin-top: var(--offset);
        margin-bottom: var(--offset);
    }

    .robo-status.robo-status--ok { --color-accent: var(--robo-color-green) }
    .robo-status.robo-status--info { --color-accent: var(--robo-color-blue) }
    .robo-status.robo-status--warning { --color-accent: var(--robo-color-orange) }
    .robo-status.robo-status--error { --color-accent: var(--robo-color-red) }

    .robo-status.robo-status--solid {
      display: flex;
      width: 100%;
      background-color: var(--color-accent);
      color: var(--robo-color-light);
      --status-padding: 0.5rem;
    }

    .robo-status.robo-status--solid .robo-icon {
      color: var(--robo-color-light);
    }

    .robo-status-close {
      position: absolute;
      top: var(--status-padding);
      right: var(--status-padding);
    }

</style>