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
    dark: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classList() {
      return {
        [`robo-layout-section`]: true,
        [`robo-layout-section--dark`]: this.dark
      };
    },
  }

})
</script>

<style scoped>
    .robo-layout-section {
        position: relative;
        max-width: var(--layout-maxwidth);
        padding-left: var(--gap-layout);
        padding-right: var(--gap-layout);
    }

    .robo-layout-section--dark {
      background-color: var(--color-dark);

      --color-text: var(--color-light);
      --color-link: var(--color-green);
      --color-link-hover: var(--color-light);
    }
    
</style>