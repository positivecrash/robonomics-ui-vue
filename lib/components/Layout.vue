<template>
    <div :class="classList">
        <slot/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLayout',

   props: {
    screen: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classList() {
      return {
        [`robo-layout`]: true,
        [`robo-layout-screen`]: this.screen,
        [`robo-layout-footer`]: this.footer
      };
    },
  }

})
</script>

<style scoped>
    .robo-layout {
        position: relative;
    }

    .robo-layout-screen {
        min-height: 100vh;
    }

    .robo-layout-footer {
        padding-bottom: calc(var(--space) * 6)
    }
</style>