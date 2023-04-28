<template>
  <section :class="classes">
    <template v-if="imaged" >
      <robo-image :src="getImage(`boy-${imaged}.svg`)" max="220px"/>
      <robo-text v-if="imagedtitle" size="small" weight="bold" offset="x05">{{imagedtitle}}</robo-text>
      <slot/>
    </template>
    <template v-else>
      <div v-if="mark" class="section-image">
        <p v-if="marktitle">{{marktitle}}</p>
        <img :src="getImage(`boy-${mark}.svg`)" />
      </div>
      <div class="section-content" v-if="mark">
        <robo-text size="small" paragraphs weight="normal-italic">
          <slot/>
        </robo-text>
      </div>
      <slot v-if="!mark" />
    </template>
  </section>

</template>

<script>
  export default { name: 'RoboSection' }
</script>

<script setup>
import { defineProps, computed } from 'vue'
import { getImage } from '../tools'

const props = defineProps({
    clean: {
      type: Boolean,
      default: false
    },

    gcenter: {
      type: Boolean,
      default: false
    },

    mark: {
      type: String,
      default: null,
      validator: function (value) {
        return ['info', 'question'].indexOf(value) !== -1;
      }
    },

    marktitle: {
      type: String,
      default: null
    },

    imaged: {
      type: String,
      default: null,
      validator: function (value) {
        return ['info', 'notfound', 'playing', 'question', 'smarthome', 'users'].indexOf(value) !== -1;
      }
    },

    imagedtitle: {
      type: String,
      default: null
    },

    offset: {
        type: String,
        default: 'x2',
        validator(value) {
            return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
        }
    },
    width: {
      type: String,
      default: 'wide',
      validator(value) {
        return ['wide', 'middle', 'narrow', 'inline'].includes(value)
      }
    }
})

const classes = computed(() => {
  return {
    [`robo-section`]: true,
    [`robo-section-clean`]: props.clean,
    [`robo-section-gcenter`]: props.gcenter,
    [`robo-section-offset-${props.offset}`]: props.offset,
    [`robo-section--mark-${props.mark}`]: props.mark,
    [`robo-section-width--${props.width}`]: props.width,
  }
})

</script>

<style scoped>
    .robo-section {
        --offset: var(--gap-layout);
        margin: var(--offset) auto;

        --section-width: var(--layout-maxwidth);
        max-width: var(--section-width);
        width: 100%;
    }

    .robo-section:first-child { margin-top: 0; }
    .robo-section:last-child { margin-bottom: 0; }

    .robo-section-offset-x0 { --offset: 0; }
    .robo-section-offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-section-offset-x1 { --offset: var(--gap-layout); }
    .robo-section-offset-x2 { --offset: calc( var(--gap-layout) * 2); }
    .robo-section-offset-x4 { --offset: calc( var(--gap-layout) * 4); }

    .robo-section--colored {
      padding: var(--gap-layout);
    }

    .robo-section-width--narrow {
      --section-width: 600px;
    }

    .robo-section-width--middle {
      --section-width: 1000px;
    }

    .robo-section-width--inline {
      width: auto;
      --section-width: 100%
    }


    .robo-section.robo-section-clean {
      margin: 0;
      --offset: 0;
    }

    /* + MARK (info, question) */

    .robo-section[class *= 'robo-section--mark-'] {
      display: grid;
      gap: 30px;
      grid-template-columns: 1fr 5fr;
      /* align-items: end; */
      align-items: stretch;
      border: 1px solid var(--robo-color-dark);
      padding: calc(var(--robo-space) * 1.5);
    }

    .robo-section[class *= 'robo-section--mark-'] .section-image img {
      max-width: 100%
    }

    .section-image {
      display: grid;
    }

    .section-image img {
      align-self: end;
    }

    .section-image p {
        font-size: 90%;
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 10px;
    }

    @media screen and (max-width: 640px) {
      .robo-section[class *= 'robo-section--mark-'] {
        grid-template-columns: 1fr 2fr;
      }
    }

    @media screen and (max-width: 400px) {
      .robo-section[class *= 'robo-section--mark-'] {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .robo-section[class *= 'robo-section--mark-'] .section-image img {
        max-width: 80px;
      }
    }

    /* - MARK (info, question) */


    .robo-section-gcenter {
      text-align: center;
    }
</style>
