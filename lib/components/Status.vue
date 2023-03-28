<template>
    <div :class="classList">
        <span v-if="textLeft" v-html="textLeft" />
        <robo-icon :icon="icon" :color="color" />
        <span v-if="textRight" v-html="textRight" />
    </div>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboStatus',

  props: {
    type: {
      type: String,
      default: null,
      required: true,
      validator: function (value) {
        return ['success', 'info', 'warning', 'error', 'none'].indexOf(value) !== -1;
      }
    },
    gap: {
      type: String,
      default: null,
      validator: function (value) {
        return ['top', 'right', 'bottom', 'left', 'all'].indexOf(value) !== -1;
      }
    },
    textRight: {
      type: String,
      default: null
    },
    textLeft: {
      type: String,
      default: null
    }
  },

  computed: {
    classList() {
      return {
        [`robo-status`]: true,
        [`robo-status--${this.type}`]: this.type,
        [`robo-status--gap-${this.gap}`]: this.gap,
      };
    },
    icon() {
        switch(this.type) {
            case 'success':
                return 'circle-check'
            case 'info':
                return 'circle-info'
            case 'warning':
                return 'circle-exclamation'
            case 'error':
                return 'circle-xmark'
        }
    },
    color() {
      switch(this.type) {
            case 'success':
                return 'var(--color-green)'
            case 'info':
                return 'var(--color-blue)'
            case 'warning':
                return 'var(--color-orange)'
            case 'error':
                return 'var(--color-red)'
        }
    }
  },

})
</script>

<style scoped>

    .robo-status {
        --status-color: var(--color-dark);
        --status-gap: calc(var(--gap-layout) * 0.5);

        align-items: center;
        display: inline-flex;
        gap: var(--status-gap);
        line-height: 1.2;
    }
    
    .robo-status--gap-top { margin-top: var(--status-gap) }
    .robo-status--gap-right { margin-right: var(--status-gap) }
    .robo-status--gap-bottom { margin-bottom: var(--status-gap) }
    .robo-status--gap-left { margin-left: var(--status-gap) }
    .robo-status--gap-all { margin: var(--status-gap) }

</style>