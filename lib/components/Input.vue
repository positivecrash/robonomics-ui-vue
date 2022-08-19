<template>
    <div 
        :class="classes"
    >
        <robo-text
            v-if="label"
            class="robo-input-label"
            v-html="label"
            :size="labelSize"
            weight="bold"
        />
        
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
        />
        
        <input 
            v-if="inputType === 'color'"
            v-model="inputModel"

            class="robo-input-color"
            :disabled = "disabled"
            :placeholder="placeholder ? placeholder : null"
            type="text"
        />

        <robo-button 
          v-if="inputType === 'password'"
          @click="showPassword"
          class="showPasswordButton"

          clean
          :iconLeft="showPasswordPressed ? 'eye-slash' : 'eye'"

          role="switch"
          :aria-pressed="showPasswordPressed"
          :aria-label="showPasswordPressed ? 'Hide' : 'Show'"
        />

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
        --background: var(--color-light);
        --border: var(--color-dark);
        --border-active: var(--color-blue);
        --color: var(--color-dark);
        --label: var(--color-dark);
        --label-active: var(--color-blue);

        position: relative;
    }

    .robo-input-block {
      display: block;
    }

    .robo-input:not(:last-child) {
      margin-bottom: var(--offset);
    }

    .robo-input input{
        background-color: var(--background);
        border: 1px solid var(--border);
        color: var(--color);
        font-family: inherit;
        font-size: inherit;
        font-weight: bold;
        padding: var(--space);
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

    /* .robo-input--disabled .robo-input-label {
        color: var(--color-gray)
    } */

    .robo-input--disabled input {
        border-color: var(--color-gray);
        color: var(--color-dark);
        opacity: 0.6;
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
</style>

<style>
  .robo-input .showPasswordButton {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }
</style>