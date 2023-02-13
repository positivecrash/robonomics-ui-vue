<template>
    <div :class="classList">
        <slot/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLayoutSection',

  props: {
    selfcenter: {
      type: Boolean,
      default: true
    },
    vcenter: {
      type: Boolean,
      default: false
    },
    gcenter: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: 'wide',
      validator(value) {
        return ['wide', 'narrow'].includes(value)
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-layout-section`]: true,
        [`robo-layout-section--vcenter`]: this.vcenter,
        [`robo-layout-section--gcenter`]: this.gcenter,
        [`robo-layout-section--${this.width}`]: this.width,
        [`robo-layout-section--selfcenter`]: this.selfcenter,
      };
    },
  }

})
</script>

<style scoped>
    .robo-layout-section {
        --section-width: var(--layout-maxwidth);
        position: relative;
        max-width: var(--section-width);
        width: 100%;
        padding: calc(var(--robo-layout-padding) * 2) var(--robo-layout-padding);
    }

    .robo-layout-section--vcenter {
      align-self: center;
    }

    .robo-layout-section--gcenter {
      justify-self: center;
      text-align: center;
    }
    
    .robo-layout-section--narrow {
      --section-width: 600px;
    }

    .robo-layout-section--selfcenter {
      margin: 0 auto
    }
</style>