<template>
    <div
        :class="classList"
        :style="styles"
        ref="card"
    >
        <robo-progress v-if="loading || progress" :progress="progress" />

        <slot/>

    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboCard',

  props: {
    backColor: {
      type: String,
      default: 'light',
      validator: function (value) {
        return ['light', 'dark', 'lightblue'].indexOf(value) !== -1;
      }
    },
    backImage: {
      type: String,
      default: null
    },
    backPosition: {
      type: String,
      default: '100% 100%'
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
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: null
    },
  },

  computed: {
    classList() {
      return {
        [`robo-card`]: true,
        [`robo-card--solid`]: !this.outlined,
        [`robo-card--outlined`]: this.outlined,
        [`robo-card--disabled`]: this.disabled,
        [`robo-card--backimage`]: this.backImage,
        [`robo-card--backcolor-${this.backColor}`]: this.backColor,
      };
    },
    styles() {
      var s = '';

      if (this.backImage) {
        s += 'background-image: url(' + this.backImage + ');'
      }

      if (this.backImage && this.backPosition) {
        s += ' background-position:' + this.backPosition + ';'
      }

      if (this.backImage && this.backRepeat) {
        s += ' background-repeat:' + this.backRepeat + ';'
      }

      if (this.backImage && this.backSize) {
        s += ' background-size:' + this.backSize + ';'
      }

      return s
    }
  },

  mounted() {
    let e = this.$refs.card
    let labels = e.querySelectorAll('.robo-card-label')
    if(labels.length > 0) {
      e.classList.add('robo-card--labeled')
    }
  }

})
</script>

<style scoped>

    .robo-card {
      --background: transparent;
      --color: var(--color-dark);

        background-color: var(--background);
        color: var(--color);
        position: relative;
        padding: var(--card-padding);
        border-radius: var(--border-radius);
    }

    .robo-card .robo-progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .robo-card--backcolor-light:not(.robo-card--outlined) {
      --background: var(--color-light);
    }

    .robo-card--backcolor-dark:not(.robo-card--outlined) {
      --background: var(--color-dark);
      --color: var(--color-light);
    }

    .robo-card--backcolor-lightblue:not(.robo-card--outlined) {
      --background: var(--color-bluegreen-light);
    }

    .robo-card--outlined.robo-card {
        --color-card-background: var(--color-body);
        --card-border-color: var(--color-text);
        --card-padding: var(--space);
        border: 1px solid var(--card-border-color);
    }

    .robo-card--labeled {
      margin-top: 10px;
    }

</style>

<style>
  .robo-card--disabled .robo-card-image, .robo-card--disabled .robo-card-section
    {
        pointer-events: none;
        filter: grayscale(1);
        opacity: 0.8;
    }

</style>