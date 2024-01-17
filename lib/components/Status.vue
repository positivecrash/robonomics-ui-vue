<template>
    <div :class="classList" v-if="!timeouttrigger">
        <span v-if="slots.left" class="robob-status-text"><slot name="left" /></span>

        <robo-icon v-if="type === 'ok'" icon="circle-check" color="var(--color-green)" />
        <robo-icon v-if="type === 'info'" icon="circle-info" color="var(--color-blue)" />
        <robo-icon v-if="type === 'warning'" icon="circle-exclamation" color="var(--color-orange)" />
        <robo-icon v-if="type === 'error'" icon="circle-xmark" color="var(--color-red)" />

        <span v-if="slots.default" class="robob-status-text"><slot /></span>
    </div>
</template>

<script>
  export default { name: 'RoboStatus' }
  /* TODO: доделать цвета */
</script>


<script setup>
import { computed, ref, onMounted, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
    offset: {
      type: String,
      default: 'x2',
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

        align-items: center;
        display: inline-flex;
        font-weight: bold;
        gap: var(--status-gap);
        line-height: 1.2;
    }

    .robo-status.robo-status--solid.robo-status--error {
      background-color: var(--robo-color-red);
      color: var(--robo-color-light);
      padding: 0.5rem;
    }

    .robo-status.robo-status--solid.robo-status--error .robo-icon {
      color: var(--robo-color-light);
    }

</style>