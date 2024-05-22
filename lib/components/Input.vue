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
      default: 'x1',
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

    .robo-loader {
      position: absolute;
      top: calc(var(--robo-input-padding) * .3);
      right: calc(var(--robo-input-padding) * .3);
    }

    /* .robo-input:not(:last-child):not([type="checkbox"]) {
      margin-bottom: var(--offset);
    } */

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

    .robo-input input{
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


    /* + label */
    .robo-input-label {
        color: var(--label);
        left: var(--space);
        position: absolute;
        top: calc(var(--space) * 0.5);
        transition: 0.2s all ease;
    }

    .robo-input--labeled input {
        padding-top: calc(var(--space) * 2);
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
        top: calc(var(--space) * (-0.5));
        right: calc(var(--space) * (-0.5));
    }
    /* - tip */

    /* + state - disabled */

    .robo-input--disabled {
        --border: var(--robo-color-inputborderdisabled);
        --color: var(--color-dark);
        --label: var(--color-dark);
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
      height: calc(var(--space) * 2 + var(--font-size) * 1.5);
      padding: 0;
      width: calc(var(--space) * 2 + var(--font-size) * 1.5);
    }

    .robo-input--type-color input {
      display: inline-block;
    }

    .robo-input-color {
      margin-left: var(--space);
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
</style>

<style>
  .robo-input .showPasswordButton {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }
</style>