<template>
    <a 
        :href="to ? to : '#'"
        :class="classList"
        :target="external() ? '_blank' : null"
        :rel="external() ? 'noopener' : null"
    >
        <slot/>
    </a>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLink',

  props: {
    to: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    }
  },

  computed: {
    classList() {
      return {
        [`robo-link`]: true,
        [`robo-link--disabled`]: this.disabled || !this.to
      };
    }
  },

  methods: {
    external() {
      
      if( this.to ) {
        let parser = document.createElement('a')
        parser.to = this.to
        if (  parser.host !== window.location.host ) {
          return true
        }
      }
    }
  }
})
</script>

<style scoped>
    .robo-link--disabled {
        pointer-events: none;
        filter: grayscale(1) opacity(0.5)
    }
</style>
