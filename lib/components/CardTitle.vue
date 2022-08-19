<template>

    <div
        :class="classList"
    >
        <slot/>

        <robo-details 
          v-if="tooltip"
          :summaryIcon="tooltipIcon"
          tooltip
          textStyle="initial"
        >
        {{tooltip}}
        </robo-details>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboCardTitle',

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
        [`robo-card-title`]: true,
        [`robo-card-title--${this.size}`]: true,
        [`robo-card-title--offset-${this.offset}`]: this.offset,
      };
    },
    // tagTitle() {
    //   return 'h' + this.size
    // }
  }

})
</script>

<style scoped>
  .robo-card-title {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: var(--offset);
  }

  .robo-card-title--1 {
    font-size: calc(var(--font-size) * 1.5);
  }

  .robo-card-title--2 {
    font-size: calc(var(--font-size) * 1.2);
  }

  .robo-card-title--offset-x0 { --offset: 0; }
  .robo-card-title--offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
  .robo-card-title--offset-x1 { --offset: var(--gap-layout); }
  .robo-card-title--offset-x2 { --offset: calc( var(--gap-layout) * 2); }
  .robo-card-title--offset-x4 { --offset: calc( var(--gap-layout) * 4); }

</style>