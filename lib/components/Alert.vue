<template>
    <div :class="classList">
        <slot/>
    </div>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboAlert',

  props: {
    type: {
      type: String,
      default: null,
      required: true,
      validator: function (value) {
        return ['success', 'info', 'warning', 'error'].indexOf(value) !== -1;
      }
    },
    wide: {
      type: Boolean,
      default: false,
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classList() {
      return {
        [`robo-alert`]: true,
        [`robo-alert--${this.type}`]: this.type,
        [`robo-alert--wide`]: this.wide,
        [`robo-alert--dismissible`]: this.dismissible,
      };
    }
  },

})
</script>

<style scoped>
    .robo-alert {
        position: fixed;
        padding: calc(var(--space) * 0.5);
        color: var(--color-card-background)
    }

    .robo-alert:not(.robo-alert--wide) {
        top: var(--gap-layout);
        right: var(--gap-layout);
        max-width: 400px;
    }

    .robo-alert--success { background-color: var(--color-green); }
    .robo-alert--info { background-color: var(--color-blue-light); }
</style>