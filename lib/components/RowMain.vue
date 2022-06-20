<template>
    <div :class="classList">
        <slot/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboRowMain',

  props: {
    valign: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'center', 'bottom'].includes(value)
      }
    },
    align: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'center', 'right'].includes(value)
      }
    },
  },

  computed: {
    classList() {
      return {
        [`robo-row-main`]: true,
        [`robo-row-main--valign-${this.valign}`]: true,
        [`robo-row-main--align-${this.align}`]: true
      };
    }
  }

})
</script>

<style scoped>
    .robo-row-main--valign-top { align-self: start; }
    .robo-row-main--valign-center { align-self: center; }
    .robo-row-main--valign-bottom { align-self: end; }

    .robo-row-main--align-left { justify-self: start; }
    .robo-row-main--align-center { justify-self: center; }
    .robo-row-main--align-right { justify-self: end; }
</style>