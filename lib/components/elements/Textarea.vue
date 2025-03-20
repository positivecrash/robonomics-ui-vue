<template>
    <div 
        :class="classes"
    >
        <robo-text
            v-if="label"
            class="robo-input-label"
            :size="labelSize"
            weight="bold"
        >{{label}}</robo-text>

        <textarea 
            @focus="focused"
            @blur="blurred"
            v-bind="$attrs"
            v-model.trim="inputModel"
            ref="textarea"

            :disabled = "disabled"
        ></textarea>

        <robo-details 
          v-if="tip" 
          
          summaryButton
          summaryButtonSize = 'small'
          summaryText = 'i'
          tooltip
          tooltipPlacement = 'bottom-end'
        >
          <div v-html="tip" />
        </robo-details>

    </div>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboTextarea',

  props: {
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: null
    },
    offset: {
      type: String,
      default: 'x0',
      validator(value) {
        return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },
    modelValue: {
        type: String,
        required: true
    },
    tip: {
        type: String,
        default: null
    }
  },

  data() {
      return {
          focusedStatus: false,
          // textHidden: ''
      }
  },

  emits: ['update:modelValue'],

  computed: {
    classes() {
      return {
        [`robo-textarea`]: true,
        [`robo-textarea--block`]: this.block,
        [`robo-textarea--disabled`]: this.disabled,
        [`robo-textarea--focused`]: this.focusedStatus,
        [`robo-textarea--labeled`]: this.label,
        [`robo-textarea-offset-${this.offset}`]: this.offset,
      };
    },

    inputModel: {
      get() {
        if(!this.modelValue && this.modelValue != '' ) {
          console.warn('[robonomics-ui-vue3 warn]: `robo-textarea` component is missing required v-model directive')
        } else {
          return this.modelValue
        }
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },

    labelSize() {
        return this.focusedStatus ? 'small' : 'tiny'
    }

  },

  methods: {
    // hideText() {
    //   if(this.allowHide) {
    //     this.textHidden = this.inputModel.replace(/\S/gi, '*')
    //     console.log('this.textHidden',this.textHidden)
    //   }
    // },

    focused() {
      this.focusedStatus = true
    },

    blurred() {
      this.focusedStatus = false
    },
  }

})
</script>

<style scoped>
    .robo-textarea {
        --background: var(--robo-color-light);
        --border: var(--robo-color-dark);
        --border-active: var(--robo-color-blue);
        --color: var(--robo-color-dark);
        --label: var(--robo-color-dark);
        --label-active: var(--robo-color-blue);
        --offset: 0;

        position: relative;
        width: 100%;
    }

    .robo-textarea:not(:last-child) {
      margin-bottom: var(--offset);
    }

    .robo-textarea textarea{
        background-color: var(--background);
        border: 1px solid var(--border);
        color: var(--color);
        font-family: inherit;
        font-size: inherit;
        font-weight: bold;
        padding: var(--robo-space);
        transition: 0.2s all ease;
        width: 100%;
    }


    /* + label */
    .robo-textarea-label {
        color: var(--label);
        left: var(--robo-space);
        position: absolute;
        top: calc(var(--robo-space) * 0.5);
        transition: 0.2s all ease;
    }

    .robo-textarea--labeled textarea {
        padding-top: calc(var(--robo-space) * 2);
    }
    /* - label */

    /* + focus */
    .robo-textarea--focused textarea {
        border-color: var(--border-active);
    }

    .robo-textarea--focused .robo-textarea-label {
        color: var(--label-active);
    }
    /* - focus */

    /* + tip */
    .robo-textarea .robo-details {
        position: absolute;
        top: calc(var(--robo-space) * (-0.5));
        right: calc(var(--robo-space) * (-0.5));
    }
    /* - tip */

    /* + disabled */

    textarea:disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    .robo-textarea--disabled {
       --border: var(--robo-color-light-80);
    }
    /* - disabled */

    /* + Offset */
    .robo-textarea-offset-x0 { --offset: 0; }
    .robo-textarea-offset-x05 { --offset: calc(var(--gap-layout) * 0.25); }
    .robo-textarea-offset-x1 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-textarea-offset-x2 { --offset: var(--gap-layout); }
    .robo-textarea-offset-x4 { --offset: calc( var(--gap-layout) * 2); }
    /* - Offset */

</style>