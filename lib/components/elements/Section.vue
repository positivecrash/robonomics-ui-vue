<template>
  <section v-bind="$attrs" :class="classes">
    <slot />
  </section>

</template>

<script>
  export default { name: 'RoboSection' }
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  card:{
    type: Boolean,
    default: false
  },

  disabled: {
    type: Boolean,
    default: false
  },

  gcenter: {
    type: Boolean,
    default: false
  },
    
  offset: {
      type: String,
      default: 'x0',
      validator(value) {
          return ['x0', 'x05', 'x1', 'x2', 'x3', 'x4'].includes(value)
      }
  },

  shadow: {
    type: Boolean,
    default: false
  },

  width: {
    type: String,
    default: 'wide',
    validator(value) {
      return ['wide', 'middle', 'narrow'].includes(value)
    }
  },
})

const classes = computed(() => {
  return {
    [`robo-section`]: true,
    [`robo-section-card`]: props.card,
    [`robo-section-disabled`]: props.disabled,
    [`robo-section-gcenter`]: props.gcenter,
    [`robo-section-shadow`]: props.shadow,
  }
});

const calcGap = prop => 
  ({
    'x0': '0',
    'x025': 'calc(var(--gap-layout) * 0.25)',
    'x05': 'calc(var(--gap-layout) * 0.5)',
    'x1': 'var(--gap-layout)',
    'x2': 'calc(var(--gap-layout) * 2)',
    'x3': 'calc(var(--gap-layout) * 3)',
    'x4': 'calc(var(--gap-layout) * 4)'
  }[prop] ?? 'none');

const offsetFromData = computed( () => {
  return calcGap(props.offset);
});

const calcWidth = prop => 
  ({
    'wide': '100%',
    'middle': '1000px',
    'narrow': '600px'
  }[prop] ?? 'auto');

const widthFromData = computed( () => {
  return calcWidth(props.width);
});

</script>

<style scoped>
    .robo-section {
        --offset: v-bind(offsetFromData);
        --section-width: v-bind(widthFromData);
        margin-top: var(--offset);
        margin-bottom: var(--offset);
        
        width: 100%;
        max-width: var(--section-width);
        margin-left: auto;
        margin-right: auto;
    }

    .robo-section-card {
      background: var(--robo-card-background-color);
      border-radius: var(--border-radius);
      padding: var(--robo-card-padding);
    }

    .robo-section-disabled {
      opacity: 0.5;
      filter: grayscale(1);
      pointer-events: none;
    }

    .robo-section-gcenter {
      text-align: center;
    }

    .robo-section-shadow {
      box-shadow: var(--robo-box-shadow);
    }
</style>
