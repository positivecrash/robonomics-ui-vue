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
  name: 'RoboCardTitle',

  props: {
    size: {
      type: String,
      default: '1',
      validator(value) {
        return ['1', '2', '3'].includes(value)
      }
    },
  },

  computed: {
    classList() {
      return {
        [`robo-card-title`]: true,
        [`robo-card-title--${this.size}`]: true
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
    margin-bottom: var(--gap-text);
  }

  .robo-card-title--1 {
    font-size: calc(var(--font-size) * 1.5);
  }

  .robo-card-title--2 {
    font-size: calc(var(--font-size) * 1.2);
    margin-bottom: calc(var(--gap-text) * 0.6);
  }

  .robo-card-title--3 {
    margin-bottom: calc(var(--gap-text) * 0.4);
  }
</style>