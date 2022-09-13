<template>

    <div
        :class="classList"
    >
        <robo-grid flex gap="x05">
          <slot name="left"/>
          <slot/>
          <slot name="right"/>

          <robo-details 
            v-if="tooltip"
            :summaryIcon="tooltipIcon"
            tooltip
            textStyle="initial"
          >
          {{tooltip}}
          </robo-details>
        </robo-grid>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboTitle',

  props: {
    offset: {
        type: String,
        default: 'x1',
        validator(value) {
            return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
        }
    },
    size: {
      type: String,
      default: '1',
      validator(value) {
        return ['1', '2', '3'].includes(value)
      }
    },
    tooltip: {
      type: String
    },
    tooltipIcon: {
      type: String,
      default: 'circle-info'
    }
  },

  computed: {
    classList() {
      return {
        [`robo-title`]: true,
        [`robo-title--${this.size}`]: true,
        [`robo-title--offset-${this.offset}`]: this.offset,
      };
    }
  }

})
</script>

<style scoped>
  .robo-title {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: var(--offset);
  }

  .robo-title--1 {
    font-size: calc(var(--font-size) * 1.5);
  }

  .robo-title--2 {
    font-size: calc(var(--font-size) * 1.2);
  }

  .robo-title--offset-x0 { --offset: 0; }
  .robo-title--offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
  .robo-title--offset-x1 { --offset: var(--gap-layout); }
  .robo-title--offset-x2 { --offset: calc( var(--gap-layout) * 2); }
  .robo-title--offset-x4 { --offset: calc( var(--gap-layout) * 4); }

</style>