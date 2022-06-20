<template>
    <section :class="classes">
        <slot/>
    </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboSection',

  props: {
    offset: {
        type: String,
        default: 'x2',
        validator(value) {
            return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
        }
    },
  },

  computed: {
    classes() {
      return {
        [`robo-section`]: true,
        [`robo-section-offset-${this.offset}`]: this.offset
      };
    },
  }
})
</script>

<style scoped>
    .robo-section {
        --offset: var(--gap-layout)
    }

    .robo-section:not(:last-child) {
        margin-bottom: var(--offset);
    }

    .robo-section-offset-x0 { --offset: 0; }
    .robo-section-offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-section-offset-x1 { --offset: var(--gap-layout); }
    .robo-section-offset-x2 { --offset: calc( var(--gap-layout) * 2); }
    .robo-section-offset-x4 { --offset: calc( var(--gap-layout) * 4); }
</style>
