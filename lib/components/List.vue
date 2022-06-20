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

