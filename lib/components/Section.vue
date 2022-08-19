<template>
    <section :class="classes" :style="styles">
        <slot/>
    </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboSection',

  props: {
    backColor: {
      type: String
    },
    backImage: {
      type: String,
      default: null
    },
    backPosition: {
      type: String,
      default: '100% 50%'
    },
    backRepeat: {
      type: String,
      default: 'no-repeat',
      validator: function (value) {
        return ['no-repeat', 'repeat-x', 'repeat-y', 'repeat', 'space'].indexOf(value) !== -1;
      }
    },
    backSize: {
      type: String,
      default: 'auto',
      validator: function (value) {
        return ['contain', 'cover', 'auto'].indexOf(value) !== -1;
      }
    },
    textColor: {
      type: String
    },
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
        [`robo-section-offset-${this.offset}`]: this.offset,
        [`robo-section--backimage`]: this.backImage,
        [`robo-section--colored`]: this.backColor,
      };
    },
    styles() {
      var s = '';

      if (this.backImage) {
        s += 'background-image: url(' + this.backImage + ');'

        if (this.backPosition) {
          s += ' background-position:' + this.backPosition + ';'
        }

        if (this.backRepeat) {
          s += ' background-repeat:' + this.backRepeat + ';'
        }

        if (this.backSize) {
          s += ' background-size:' + this.backSize + ';'
        }
      }

      if (this.backColor) {
        s += ' background-color:' + this.backColor + ';'
      }

      if (this.textColor) {
        s += ' color:' + this.textColor + ';'
      }

      return s
    }
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

    .robo-section--colored {
      padding: var(--gap-layout);
    }
</style>
