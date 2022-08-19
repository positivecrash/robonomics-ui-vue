<template>
    <div :class="classList">

      <robo-status 
        v-if="title"
        :textRight="title"
        :type="type"
      />

      <div class="robo-notification-text">
        <slot />
      </div>
      
    </div>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboNotification',

  props: {
    offset: {
      type: String,
      default: 'x2',
      validator(value) {
        return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },
    title: {
      type: String
    },
    type: {
      type: String,
      default: 'none',
      required: true,
      validator: function (value) {
        return ['success', 'info', 'warning', 'error', 'none'].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-notification`]: true,
        [`robo-notification--${this.type}`]: this.type,
        [`robo-notification-offset-${this.offset}`]: this.offset,
      };
    }
  },

})
</script>

<style scoped>
  .robo-notification {
    margin-top: var(--offset);
    margin-bottom: var(--offset);
  }

  /* + Title (robo-status) */
  
  .robo-notification .robo-status {
    --status-color: var(--color-text);
    color: var(--status-color);
    font-weight: bold;
    text-transform: uppercase;
  }

  .robo-notification .robo-status--success { --status-color: var(--color-green) }
  .robo-notification .robo-status--info { --status-color: var(--color-blue) }
  .robo-notification .robo-status--warning { --status-color: var(--color-orange) }
  .robo-notification .robo-status--error { --status-color: var(--color-red) }

  /* - Title (robo-status) */

  /* + Offset */
  .robo-notification-offset-x0 { --offset: 0; }
  .robo-notification-offset-x05 { --offset: calc(var(--gap-layout) * 0.25); }
  .robo-notification-offset-x1 { --offset: calc(var(--gap-layout) * 0.5); }
  .robo-notification-offset-x2 { --offset: var(--gap-layout); }
  .robo-notification-offset-x4 { --offset: calc( var(--gap-layout) * 2); }
  /* - Offset */
</style>