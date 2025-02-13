<template>
    <a 
      v-if="href"
      :class="classList"
      :href="href"
      :target="external() ? '_blank' : null"
      :rel="external() ? 'noopener' : null"
    >
      <slot/>
    </a>

    <router-link 
        v-if="router"
        :class="classList"
        :to="router"
        >
        <slot/>
    </router-link>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLink',

  props: {
    disabled: {
        type: Boolean,
        default: false
    },
    href: {
        type: String,
        default: null
    },
    router: {
      type: Object,
      default: null
    }
  },

  computed: {
    classList() {
      return {
        [`robo-link`]: true,
        [`robo-link--disabled`]: this.disabled || (!this.href && !this.router)
      };
    }
  },

  methods: {
    external() {
      
      if( this.href ) {
        let parser = document.createElement('a')
        parser.to = this.href
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
