<template>
    <div :class="classList" :style="style">
      <slot/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboGrid',

  props: {
    
    align: {
      type: String,
      default: 'stretch',
      validator(value) {
        return ['left', 'center', 'right', 'stretch', 'fit-content', 'space-between'].includes(value)
      }
    },
    columns: {
      type: String,
      default: null
    },
    columnsRepeat: {
      type: [Number, String],
      default: null,
      validator(value) {
        return [1,2,3,4,5,6,7,8,9,10,11,12].includes(value) || ['1','2','3','4','5','6','7','8','9','10','11','12'].includes(value)
      }
    },
    columnsTemplate: {
      type: String,
      default: null,
      validator(value) {
        return ['left-center', 'left-center-right'].includes(value)
      }
    },
    /* embed - deprecated */
    embed: {
      type: Boolean,
      default: false
    },
    flex: {
      type: Boolean,
      default: false
    },
    gap: {
      type: String,
      default: 'x2',
      validator(value) {
        return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },
    offset: {
      type: String,
      default: 'x2',
      validator(value) {
        return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },
    mediaMobile: {
      type: String,
      default: 'transfer',
      validator(value) {
        return ['transfer', 'no-cols', 'none'].includes(value)
      }
    },
    rows: {
      type: String,
      default: null
    },
    screen: {
      type: Boolean,
      default: false
    },
    valign: {
      type: String,
      default: 'stretch',
      validator(value) {
        return ['top', 'center', 'bottom', 'stretch'].includes(value)
      }
    },
  },

  computed: {
    classList() {
      return {
        [`robo-grid`]: true,
        [`robo-grid-columns-${this.columnsRepeat}`]: this.columnsRepeat,
        [`robo-grid-gap-${this.gap}`]: this.gap,
        [`robo-grid-offset-${this.offset}`]: this.offset,
        [`robo-grid-template-columns--${this.columnsTemplate}`]: this.columnsTemplate,
        [`robo-grid--mobile-${this.mediaMobile}`]: this.mediaMobile,
        [`robo-grid-screen`]: this.screen,
        [`robo-grid--valign-${this.valign}`]: this.valign,
        [`robo-grid--align-${this.align}`]: this.align,
        [`robo-grid--embed`]: this.embed,
        [`robo-grid--flex`]: this.flex,
        [`robo-grid--grid`]: !this.flex,
      };
    },
    style() {
      let string = '';

      if(this.columns) {
        string += 'grid-template-columns:'+ this.columns +';'
      }

      if(this.rows) {
        string += 'grid-template-rows:'+ this.rows +';'
      }

      return string
    }
  }

})
</script>

<style scoped>

    .robo-grid {
        --gap: var(--gap-layout);
        --offset: var(--gap-layout);

        display: grid;
        padding-top: var(--offset);
        padding-bottom: var(--offset);
        gap: var(--gap);
    }

    .robo-grid:last-child { padding-bottom: 0; }

    .robo-grid--embed {
      padding-top: 0;
      padding-bottom: 0;
    }

    .robo-layout-section--dark .robo-grid {
      padding-top: calc(var(--gap) * 0.25);
      padding-bottom: calc(var(--gap) * 0.25);
    }

    .robo-grid-columns-1 { grid-template-columns: repeat(1, 1fr); }
    .robo-grid-columns-2 { grid-template-columns: repeat(2, 1fr); }
    .robo-grid-columns-3 { grid-template-columns: repeat(3, 1fr); }
    .robo-grid-columns-4 { grid-template-columns: repeat(4, 1fr); }
    .robo-grid-columns-5 { grid-template-columns: repeat(5, 1fr); }
    .robo-grid-columns-6 { grid-template-columns: repeat(6, 1fr); }
    .robo-grid-columns-7 { grid-template-columns: repeat(7, 1fr); }
    .robo-grid-columns-8 { grid-template-columns: repeat(8, 1fr); }
    .robo-grid-columns-9 { grid-template-columns: repeat(9, 1fr); }
    .robo-grid-columns-10 { grid-template-columns: repeat(10, 1fr); }
    .robo-grid-columns-11 { grid-template-columns: repeat(11, 1fr); }
    .robo-grid-columns-12 { grid-template-columns: repeat(12, 1fr); }

    .robo-grid-gap-x0 { --gap: 0; }
    .robo-grid-gap-x05 { --gap: calc(var(--gap-layout) * 0.5); }
    .robo-grid-gap-x1 { --gap: var(--gap-layout); }
    .robo-grid-gap-x2 { --gap: calc( var(--gap-layout) * 2); }
    .robo-grid-gap-x4 { --gap: calc( var(--gap-layout) * 4); }

    .robo-grid-offset-x0 { --offset: 0; }
    .robo-grid-offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-grid-offset-x1 { --offset: var(--gap-layout); }
    .robo-grid-offset-x2 { --offset: calc( var(--gap-layout) * 2); }
    .robo-grid-offset-x4 { --offset: calc( var(--gap-layout) * 4); }

    .robo-grid-template-columns--left-center {
      grid-template-columns: var(--aside-size-left) auto;
    }

    .robo-grid-template-columns--left-center-right {
      grid-template-columns: var(--aside-size-left) auto var(--aside-size-right);
    }

    .robo-grid-screen {
        min-height: 100vh;
    }

    @media screen and (max-width: 1200px) {
      .robo-grid-columns-2:not(.robo-grid--mobile-none), 
      .robo-grid-columns-3:not(.robo-grid--mobile-none), 
      .robo-grid-columns-4:not(.robo-grid--mobile-none), 
      .robo-grid-columns-5:not(.robo-grid--mobile-none), 
      .robo-grid-columns-6:not(.robo-grid--mobile-none), 
      .robo-grid-columns-7:not(.robo-grid--mobile-none), 
      .robo-grid-columns-8:not(.robo-grid--mobile-none), 
      .robo-grid-columns-9:not(.robo-grid--mobile-none), 
      .robo-grid-columns-10:not(.robo-grid--mobile-none), 
      .robo-grid-columns-11:not(.robo-grid--mobile-none), 
      .robo-grid-columns-12:not(.robo-grid--mobile-none) 
      { grid-template-columns: repeat(1, 1fr) !important; }
    }

    @media screen and (max-width: 1000px) {
        .robo-grid--mobile-transfer {
          grid-template-columns: 1fr !important;
        }

        .robo-grid-template-columns--left-center-right.robo-grid--mobile-transfer {
          grid-template-columns: auto;
        }

        .robo-grid-template-columns--left-center-right.robo-grid--mobile-none {
          grid-template-columns: min-content auto min-content;
        }
    }

    @media screen and (max-width: 700px) {
      .robo-grid {
        --gap: calc(var(--gap-layout) * 0.5);
      }

      .robo-grid-gap-x0 { --gap: 0; }
      .robo-grid-gap-x05 { --gap: calc(var(--gap-layout) * 0.25); }
      .robo-grid-gap-x1 { --gap: calc(var(--gap-layout) * 0.5); }
      .robo-grid-gap-x2 { --gap: var(--gap-layout); }
      .robo-grid-gap-x4 { --gap: calc( var(--gap-layout) * 2); }

      .robo-grid-offset-x0 { --offset: 0; }
      .robo-grid-offset-x05 { --offset: calc(var(--gap-layout) * 0.25); }
      .robo-grid-offset-x1 { --offset: calc(var(--gap-layout) * 0.5); }
      .robo-grid-offset-x2 { --offset: var(--gap-layout); }
      .robo-grid-offset-x4 { --offset: calc( var(--gap-layout) * 2); }

      .robo-grid-template-columns--left-center.robo-grid--mobile-transfer {
        grid-template-columns: auto;
      }

      .robo-grid-template-columns--left-center.robo-grid--mobile-no-cols {
        grid-template-columns: max-content auto;
      }

      .robo-grid-template-columns--left-center-right.robo-grid--mobile-no-cols {
        grid-template-columns: max-content auto max-content;
      }
    }

    /* + VALIGN */
    .robo-grid--flex .robo-grid--valign-top { align-items: flex-start; }
    .robo-grid--grid .robo-grid--valign-top { align-items: start; }

    .robo-grid--valign-center { align-items: center; }

    .robo-grid--flex .robo-grid--valign-bottom { align-items: flex-end; }
    .robo-grid--grid .robo-grid--valign-bottom { align-items: end; }

    .robo-grid--valign-stretch { align-items: stretch; }
    /* - VALIGN */

    /* + ALIGN */
    .robo-grid--flex .robo-grid--align-left { justify-content: flex-start; }
    .robo-grid--grid .robo-grid--align-left { justify-content: start; }

    .robo-grid--align-center { justify-content: center; }

    .robo-grid--flex .robo-grid--align-right { justify-content: flex-end; }
    .robo-grid--grid .robo-grid--align-right { justify-content: end; }

    .robo-grid--grid .robo-grid--align-stretch { justify-content: stretch; }

    .robo-grid--align-space-between { justify-content: space-between; }
    /* - ALIGN */


    .robo-grid--align-fit-content.robo-grid-columns-1 { grid-template-columns: repeat(1, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-2 { grid-template-columns: repeat(2, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-3 { grid-template-columns: repeat(3, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-4 { grid-template-columns: repeat(4, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-5 { grid-template-columns: repeat(5, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-6 { grid-template-columns: repeat(6, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-7 { grid-template-columns: repeat(7, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-8 { grid-template-columns: repeat(8, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-9 { grid-template-columns: repeat(9, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-10 { grid-template-columns: repeat(10, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-11 { grid-template-columns: repeat(11, max-content); }
    .robo-grid--align-fit-content.robo-grid-columns-12 { grid-template-columns: repeat(12, max-content); }


    .robo-grid--flex {
      display: flex;
    }
</style>