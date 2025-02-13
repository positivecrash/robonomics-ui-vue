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

        <input 
            v-bind="$attrs"
            @focus="focused"
            @blur="blurred"
            
            v-model="inputModel"
            :type="$attrs.type ?? 'text'"
            ref="input"
            :aria-disabled="disabled ? true : null"
            :tabindex="disabled ? -1 : 0"

            :disabled = "disabled"
            :placeholder="placeholder ? placeholder : null"
        />
        <input 
            v-if="inputType === 'color'"
            v-model="inputModel"

            class="robo-input-color"
            :disabled = "disabled"
            :placeholder="placeholder ? placeholder : null"
            type="text"
        />

        <robo-button class="text-edit" v-if="view=== 'text-edit'" clean @click.prevent="setfocus">
          <robo-icon icon="pencil" />
        </robo-button>

        <label v-if="inputType === 'file'" for="fileupload">file upload</label>

        <robo-button 
          v-if="inputType === 'password' && !disabled"
          @click.prevent="showPassword"
          class="showPasswordButton"
          clean
          role="switch"
          :aria-pressed="showPasswordPressed"
          :aria-label="showPasswordPressed ? 'Hide' : 'Show'"
        >
          <robo-icon v-if="showPasswordPressed" icon="eye-slash" />
          <robo-icon v-else icon="eye" />
        </robo-button>

        <robo-details v-if="tip" type="tooltip" tooltip-placement="bottom-end">
          <template #summary>
            <robo-button size="small">i</robo-button>
          </template>
          
          <div v-html="tip" />
        </robo-details>

        <robo-text v-if="tipchanged" highlightLabel="warning" size="tiny" class="tip-changed" weight="bold">not saved</robo-text>

        <robo-loader v-if="loading" />

    </div>
    
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboInput',

  props: {
    block: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    fitcontent: {
      type: Boolean,
      default: false
    },
    label: {
        type: String,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
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
    placeholder: {
        type: String,
        default: null
    },
    repeat: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: 'classic',
      validator(value) {
        return ['classic', 'text', 'text-edit'].includes(value)
      }
    },
    tip: {
        type: String,
        default: null
    },
    tipchanged: {
      type: Boolean,
      default: false
    }
  },

  data() {
      return {
          focusedStatus: false,
          inputType: this.$attrs.type,
          showPasswordPressed: false,
          changed: false
      }
  },

  emits: ['update:modelValue'],

  computed: {
    classes() {
      return {
        [`robo-input`]: true,
        [`robo-input--labeled`]: this.label,
        [`robo-input--focused`]: this.focusedStatus,
        [`robo-input--disabled`]: this.disabled,
        [`robo-input-offset-${this.offset}`]: this.offset,
        [`robo-input-block`]: this.block,
        [`robo-input--type-${this.inputType}`]: this.inputType,
        [`robo-input--error`]: this.error,
        ['robo-input-changed']: this.changed,
        [`robo-input--style-${this.view}`]: this.view,
        [`robo-input--fitcontent`]: this.fitcontent,
        [`robo-input--changed`]: this.tipchanged,
      };
    },
    

    inputModel: {
      get() {
        if(!this.modelValue && this.modelValue != '') {
          console.warn('[robonomics-ui-vue3 warn]: `robo-input` component is missing required v-model directive')
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
    },

    inputwidth() {
      return this.modelValue ? this.modelValue.length + 'ch' : 'auto'
    }

  },

  methods: {
      focused() {
        this.focusedStatus = true
      },

      blurred() {
        this.focusedStatus = false
      },
      showPassword() {
        this.showPasswordPressed = !this.showPasswordPressed

        if(this.$refs.input.type === 'password') {
          this.$refs.input.type = 'text'
        } else {
          this.$refs.input.type = 'password'
        }
      },

      setfocus() {
        this.$refs.input.focus()
      }
  },

  // mounted() {
  //   let first = this.modelValue ?? ''
  // }

})
</script>

<style scoped>
    .robo-input {
        --background: var(--robo-color-input);
        --border: var(--robo-color-inputborder);
        --color: var(--robo-color-inputcolor);
        --label: var(--robo-color-inputcolor);
        --border-active: var(--robo-color-inputcoloractive);
        --label-active: var(--robo-color-inputcoloractive);

        position: relative;
    }

    .robo-input input {
      appearance: none;
      background-color: var(--background);
      border: 1px solid var(--border);
      color: var(--color);
      font-family: inherit;
      font-size: inherit;
      font-weight: bold;
      padding: var(--robo-input-padding);
      transition: 0.2s all ease;
      width: 100%;
    }

    .robo-loader {
      position: absolute;
      top: calc(var(--robo-input-padding) * .3);
      right: calc(var(--robo-input-padding) * .3);
    }

    .robo-input:not(:last-child):not([type="checkbox"]) {
      margin-bottom: var(--offset);
    }

    .robo-input--fitcontent.robo-input input {
      width: v-bind(inputwidth);
    }

    .text-edit {
      color: var(--robo-color-inputcoloractive);
      margin-left: var(--robo-space);
    }

    /* + TEXT VIEW */
    .robo-input--style-text, .robo-input--style-text-edit {
      --background: transparent;
      --border: transparent;
      --color: var(--robo-color-text);
    }

    .robo-input.robo-input--style-text input, .robo-input.robo-input--style-text-edit input {
      border-width: 0 0 1px;
      padding: 0;
    }

    .robo-input.robo-input--style-text input:focus, .robo-input.robo-input--style-text-edit input:focus {
      --border: var(--robo-color-inputborder);
    }
    /* - TEXT VIEW */

    .robo-input-block {
      display: block;
    }


    /* + label */
    .robo-input-label {
        color: var(--label);
        left: var(--robo-space);
        position: absolute;
        top: calc(var(--robo-space) * 0.5);
        transition: 0.2s all ease;
    }

    .robo-input--labeled input {
        padding-top: calc(var(--robo-space) * 2);
    }
    /* - label */

    /* + focus */
    .robo-input--focused input {
        border-color: var(--border-active);
    }

    .robo-input--focused .robo-input-label {
        color: var(--label-active);
    }
    /* - focus */

    /* + tip */
    .robo-input .robo-details {
        position: absolute;
        top: calc(var(--robo-space) * (-0.5));
        right: calc(var(--robo-space) * (-0.5));
    }
    /* - tip */

    /* + state - disabled */

    .robo-input--disabled {
        --border: var(--robo-color-inputborderdisabled);
        --color: var(--robo-color-dark);
        --label: var(--robo-color-dark);
    }

    .robo-input--disabled input {
      opacity: var(--robo-opacity-inputdisabled);
    }
    /* - state - disabled */

    /* + state - changed */
    .robo-input-changed {
      --border: var(--robo-color-inputcoloractive);
      --label: var(--robo-color-inputcoloractive);
    }
    /* - state - changed */

    /* + type = color */
    .robo-input--type-color .robo-input-control {
      border: 0;
      height: calc(var(--robo-space) * 2 + var(--robo-font-size) * 1.5);
      padding: 0;
      width: calc(var(--robo-space) * 2 + var(--robo-font-size) * 1.5);
    }

    .robo-input--type-color input {
      display: inline-block;
    }

    .robo-input-color {
      margin-left: var(--robo-space);
      width: auto !important;
    }
    /* - type = color */

    /* + Offset */
    .robo-input-offset-x0 { --offset: 0; }
    .robo-input-offset-x025 { --offset: calc(var(--gap-layout) * 0.25); }
    .robo-input-offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-input-offset-x1 { --offset: var(--gap-layout) }
    .robo-input-offset-x2 { --offset: calc( var(--gap-layout) * 2); }
    .robo-input-offset-x4 { --offset: calc( var(--gap-layout) * 4); }
    /* - Offset */

    .robo-input--error {
      --border: var(--robo-color-red);
      --color: var(--robo-color-red);
    }

    .robo-input input[type="file"] {
      height: 0 !important;
      overflow: hidden !important;
      width: 0 !important;
      border: 0 !important;
      padding: 0 !important;
    }

    .tip-changed {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      border-radius: 0.2rem;
      display: block;
    }

    .robo-input--changed {
      --border: var(--robo-color-orange);
    }


    /* + checkbox */
    .robo-input--type-checkbox {
      /* --robo-input-padding: 0; */
      width: var(--robo-input-padding);
      height: var(--robo-input-padding);
    }

    .robo-input--type-checkbox input[type="checkbox"] {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .robo-input--type-checkbox input[type="checkbox"]:checked {
      background-color: var(--robo-color-inputcoloractive);
      background-image: url('data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_825_12739)"><path d="M13.5899 4.29821L6.20435 11.6833C5.65744 12.2303 4.77026 12.2303 4.22283 11.6833L0.410339 7.87051C-0.13678 7.3235 -0.13678 6.43622 0.410339 5.8891C0.957562 5.34188 1.84467 5.34188 2.39165 5.88889L5.21388 8.71116L11.6083 2.31669C12.1555 1.76947 13.0427 1.76989 13.5897 2.31669C14.1367 2.86381 14.1367 3.75078 13.5899 4.29821Z" fill="white"/></g><defs><clipPath id="clip0_825_12739"><rect width="14" height="14" fill="black"/></clipPath></defs></svg>');
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 80%;
    }
    /* - checkbox */
</style>

<style>
  .robo-input .showPasswordButton {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }
</style>