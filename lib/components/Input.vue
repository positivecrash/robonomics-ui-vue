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
            @focus="focused"
            @blur="blurred"
            v-bind="$attrs"
            v-model="inputModel"
            ref="input"
            :aria-disabled="disabled ? true : null"
            :tabindex="disabled ? -1 : 0"

            class="robo-input-control"
            :disabled = "disabled"
            :placeholder="placeholder ? placeholder : null"

            id="fileupload"
        />
        
        <input 
            v-if="inputType === 'color'"
            v-model="inputModel"

            class="robo-input-color"
            :disabled = "disabled"
            :placeholder="placeholder ? placeholder : null"
            type="text"
        />

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
    label: {
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
    tip: {
        type: String,
        default: null
    }
  },

  data() {
      return {
          focusedStatus: false,
          inputType: this.$attrs.type,
          showPasswordPressed: false
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
      }
  }

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

    /* + disabled */

    .robo-input--disabled {
        --border: var(--robo-color-inputborderdisabled);
        --color: var(--color-dark);
        --label: var(--color-dark);
    }

    .robo-input--disabled input {
      opacity: var(--robo-opacity-inputdisabled);
    }
    /* - disabled */

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
    .robo-input-offset-x05 { --offset: calc(var(--gap-layout) * 0.25); }
    .robo-input-offset-x1 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-input-offset-x2 { --offset: var(--gap-layout); }
    .robo-input-offset-x4 { --offset: calc( var(--gap-layout) * 2); }
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