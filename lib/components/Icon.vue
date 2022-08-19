<template>
    <span
      v-if="icon"  
      :class="classes" 
      :style="styleIcon"
    >
      <font-awesome-icon 
        :icon="icon"
      />
    </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboIcon',

  props: {
    color: {
      type: String,
      default: 'inherit'
    },
    icon: {
        type: String,
        default: null
    },
    size: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return ['small', 'normal', 'big', 'huge'].indexOf(value) !== -1;
      }
    },
  },

  computed: {
    styleIcon(){
      return 'color: ' + this.color
    },
    classes() {
      return {
        [`robo-icon`]: true,
        [`robo-icon--size-${this.size}`]: this.size,
      };
    },
  }
})
</script>

<style scoped>
  .robo-icon {
    display: inline-block;
    line-height: 1;
  }
  .robo-icon--size-small { font-size: calc(var(--font-size) * 0.7)}
  .robo-icon--size-normal { font-size: inherit}
  .robo-icon--size-big { font-size: calc(var(--font-size) * 2)}
  .robo-icon--size-huge { font-size: calc(var(--font-size) * 4)}
</style>