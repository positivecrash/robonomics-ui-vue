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
            :type="inputType"
            v-model="inputModel"
            :placeholder="placeholder ? placeholder : null"
            @focus="focused"
            @blur="blurred"
            :disabled = "disabled"
        />

        <robo-details 
          v-if="tip" 
          :summary="{
              text: 'i',
              button: {
                size: 'small'
              }
          }"
          :tooltip="{
              placement: 'bottom-end'
          }"
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
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: null
    },
    inputType: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: null
    },
    tip: {
        type: String,
        default: null
    }
  },

  data() {
      return {
          focusedStatus: false
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
      };
    },

    inputModel: {
      get() {
        if(!this.modelValue) {
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
    }

  },

  methods: {
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
    .robo-input {
        --background: var(--color-light);
        --border: var(--color-dark);
        --border-active: var(--color-blue);
        --color: var(--color-dark);
        --label: var(--color-dark);
        --label-active: var(--color-blue);

        position: relative;
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

    .robo-input--disabled .robo-input-label {
        color: var(--color-gray)
    }

    .robo-input--disabled input {
        border-color: var(--color-gray);
    }
    /* - disabled */
</style>