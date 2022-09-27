<template>
  <img 
    v-bind="$attrs"
    :style="inlineStyles"
    :class="classList"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboImage',

  props: {
    max: {
      type: String
    },
    min: {
      type: String
    }
  },

  computed: {
    classList() {
      return {
        [`robo-image`]: true
      };
    },

    inlineStyles() {
      let line = ''

      if(this.max) {
        line += 'max-width:' + this.max + '; '
      }
      
      if (this.min) {
        line += 'min-width:' + this.min + '; '
      }
      
      if (line === '') {
        return null
      } else {
        return line
      }
    }
  }

})
</script>


<style scoped>
  .robo-image {
    display: inline-block;
    width: 100%;
  }
</style>