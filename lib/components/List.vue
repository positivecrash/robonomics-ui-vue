<template>
    <component 
    :is="element"
    :class="classList"
    >
        <slot/>
    </component>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboList',

  props: {
    gap: {
      type: String,
      default: 'x05',
      validator(value) {
        return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },
    fullLine: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'line-vertical',
      validator: function (value) {
        return ['line-vertical', 'line-gorizontal'].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: 'unordered',
      validator: function (value) {
        return ['unordered', 'ordered'].indexOf(value) !== -1;
      }
    },
  },

  computed: {
    classList() {
      return {
        [`robo-list`]: true,
        [`robo-list-fullline`]: this.fullLine,
        [`robo-list--theme-${this.theme}`]: this.theme,
        [`robo-list--gap-${this.gap}`]: this.gap,
      };
    },

    element() {
        if(this.type === 'unordered') {
            return 'ul'
        } else if(this.type === 'ordered') {
            return 'ol'
        }
    }
  },

})
</script>

<style scoped>
    .robo-list {
        list-style: none;
    }
</style>

<style>
  .robo-list--gap-x0 { --list-gap: 0; }
  .robo-list--gap-x05 { --list-gap: calc(var(--gap-text) * 0.5); }
  .robo-list--gap-x1 { --list-gap: calc(var(--gap-text) * 1); }
  .robo-list--gap-x2 { --list-gap: calc(var(--gap-text) * 2); }
  .robo-list--gap-x4 { --list-gap: calc(var(--gap-text) * 4); }
</style>

