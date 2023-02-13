<template>
    <div
        :class="classList"
    >
        <slot/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboCardLabel',

  props: {
    block: {
      type: Boolean,
      default: false
    },
    inside: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classList() {
      return {
        [`robo-card-label`]: true,
        [`robo-card-label-block`]: this.block,
        [`robo-card-label-inside`]: this.inside,
      };
    }
  }

})
</script>

<style scoped>
  .robo-card .robo-card-label {
    position: absolute;
    /* z-index: 10; */
    left: calc(var(--space) * (-1));
    top: calc(var(--card-label-height) * 0.5 * (-1));
    height: var(--card-label-height);
    font-size: calc(var(--font-size) * 0.7);
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
  }

  .robo-card:not(.robo-card--outlined) .robo-card-label {
    background-color: var(--color-dark);
    color: var(--color-light);
  }

  .robo-card--outlined .robo-card-label {
    border: 1px solid var(--card-border-color);
    background-color: var(--color-card-background);
  }

  .robo-card-label-block {
    right: calc(var(--card-label-height) * 0.5 * (-1));
  }

  .robo-card .robo-card-label-inside {
    top: 0;
    left: 0;
  }

  .robo-card .robo-card-label-inside.robo-card-label-block {
    right: 0;
  }
</style>