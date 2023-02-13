<template>
    <section :class="classes" :style="styles">
      <div v-if="info" class="info-side">
        <b>i</b>
        <img :src="getImage('boy-info.png')" />
      </div>
      <slot/>
    </section>
</template>

<script>
  export default { name: 'RoboSection' }
</script>

<script setup>
import { defineProps, computed } from 'vue'
import { getImage } from '../tools'

const props = defineProps({
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

    info: {
      type: Boolean,
      default: false
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
})

const classes = computed(() => {
  return {
    [`robo-section`]: true,
    [`robo-section-offset-${props.offset}`]: props.offset,
    [`robo-section--backimage`]: props.backImage,
    [`robo-section--colored`]: props.backColor,
    [`robo-section--info`]: props.info,
  }
})

const styles = computed (() => {
    var s = '';

    if (props.backImage) {
      s += 'background-image: url(' + props.backImage + ');'

      if (props.backPosition) {
        s += ' background-position:' + props.backPosition + ';'
      }

      if (props.backRepeat) {
        s += ' background-repeat:' + props.backRepeat + ';'
      }

      if (props.backSize) {
        s += ' background-size:' + props.backSize + ';'
      }
    }

    if (props.backColor) {
      s += ' background-color:' + props.backColor + ';'
    }

    if (props.textColor) {
      s += ' color:' + props.textColor + ';'
    }

    return s
})

</script>

<style scoped>
    .robo-section {
        --offset: var(--gap-layout);
        margin-top: var(--offset);
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


    /* + Info */

    .robo-section--info {
      display: grid;
      gap: 30px;
      grid-template-columns: 90px auto;
    }

    .info-side {
      background-color: var(--robo-color-light-100-4);
      padding-bottom: 100px;
      position: relative;
      text-align: center;
    }

    .info-side b {
      color: var(--robo-color-blue);
      font-size: 40px;
    }
    
    .info-side img {
      bottom: 0;
      max-width: 86px;
      position: absolute;
      right: -10px;
      width: 100%;
    }

    @media screen and (max-width: 500px) {
      .robo-section--info {
        gap: 10px;
        grid-template-columns: 1fr;
        grid-template-rows: 90px auto;
      }

      .info-side {
        align-content: center;
        display: grid;
        padding-bottom: 0;
        padding-left: 20px;
        padding-right: 100px;
        text-align: left;
      }
    }

    /* - Info */
</style>
