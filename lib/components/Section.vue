<template>
  <section :class="classes">
    <robo-text v-if="title" title="3">{{title}}</robo-text>
    <slot />
  </section>

</template>

<script>
  export default { name: 'RoboSection' }
</script>

<script setup>
import { defineProps, computed } from 'vue'
import { getImage } from '../tools'

const props = defineProps({
    clean: {
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
        default: 'x2',
        validator(value) {
            return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
        }
    },
    sideline: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: 'wide',
      validator(value) {
        return ['wide', 'middle', 'narrow', 'inline'].includes(value)
      }
    }
})

const classes = computed(() => {
  return {
    [`robo-section`]: true,
    [`robo-section-clean`]: props.clean,
    [`robo-section-gcenter`]: props.gcenter,
    [`robo-section-offset-${props.offset}`]: props.offset,
    [`robo-section-width--${props.width}`]: props.width,
    [`robo-section-sideline`]: props.sideline,
    [`robo-section-disabled`]: props.disabled,
  }
})

</script>

<style scoped>
    .robo-section {
        --offset: var(--gap-layout);
        margin: var(--offset) auto;

        --section-width: var(--layout-maxwidth);
        max-width: var(--section-width);
        width: 100%;
    }

    .robo-section:first-child { margin-top: 0; }
    .robo-section:last-child { margin-bottom: 0; }

    .robo-section-offset-x0 { --offset: 0; }
    .robo-section-offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-section-offset-x1 { --offset: var(--gap-layout); }
    .robo-section-offset-x2 { --offset: calc( var(--gap-layout) * 2); }
    .robo-section-offset-x4 { --offset: calc( var(--gap-layout) * 4); }

    .robo-section--colored {
      padding: var(--gap-layout);
    }

    .robo-section-width--narrow {
      --section-width: 600px;
    }

    .robo-section-width--middle {
      --section-width: 1000px;
    }

    .robo-section-width--inline {
      width: auto;
      --section-width: 100%
    }


    .robo-section.robo-section-clean {
      margin: 0;
      --offset: 0;
    }

    .robo-section-gcenter {
      text-align: center;
    }

    .robo-section-sideline {
      border-left: 1px solid var(--robo-color-dark);
      padding: var(--robo-space) 0 var(--robo-space) calc(var(--robo-space)*2);
    }

    .robo-section-disabled {
      opacity: 0.5;
      filter: grayscale(1);
      pointer-events: none;
    }
</style>
