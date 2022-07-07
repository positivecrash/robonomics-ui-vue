<template>
    <div :class="classList">

      <select 
        :name="name" 
        v-bind="$attrs"
        v-model="selected" 
        ref="select"
        @change="setWidth"
        :disabled="(disabled || options.length < 2) ? true : null"
      >
        <option 
          v-for="(option,index) in options" 
          :key="index" 
          :value="(values) ? values[index] : option"
        >
            {{option}}
          </option>
      </select>

      <robo-icon icon="sort-down" v-if="options.length > 1" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboSelect',

  props: {
    block: {
        type: Boolean,
        default: false
    },
    clean: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    options: {
      type: Object,
      default: null,
      required: true
    },
    values: {
      type: Array,
      default: null
    },
    modelValue: {
        type: String,
        required: true
    }
  },

  emits: ['update:modelValue'],

  computed: {
    classList() {
      return {
        [`robo-select`]: true,
        [`robo-select--clean`]: this.clean,
        [`robo-select--block`]: this.block,
        [`robo-select--disabled`]: this.disabled,
        [`robo-select--single`]: this.options.length < 2,
      };
    },

    selected: {
      get() {
        if(!this.modelValue) {
          console.warn('[robonomics-ui-vue3 warn]: `robo-select` component is missing required v-model directive')
        } else {
          return this.modelValue
        }
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
  },

  // methods: {
  //   setWidth() {
  //     let options = this.$refs.select.options
  //     console.log('options', this.options)
  //     console.log('this.selected', this.selected)
  //     if(this.options) {
  //       let choosen = Object.values(options).filter(opt => opt.value === this.selected)
  //       let activeOptionText = choosen[0].innerText
  //       this.$refs.select.style.width = activeOptionText.length + 1 + 'ch'
  //     } 
  //   }
  // },

  // mounted() {
  //   this.setWidth()
  // }

})
</script>

<style scoped>

  .robo-select, select {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  .robo-select {
    position: relative;
  }

  .robo-select--block {
    display: block;
  }

  select {
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    --webkit-appearance: none;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    display: block;
    width: 100%;

    padding-right: calc(var(--input-padding-g) * 0.5 + var(--select-tog-size));
  }

  .robo-select:not(.robo-select--clean) {
    background-color: var(--input-bg);
    color: var(--input-text-color);
    border: var(--input-border-width) solid var(--input-border-color);
  }

  .robo-select:not(.robo-select--clean) select {
    padding-left: var(--input-padding-g);
    /* padding-right: calc(var(--input-padding-g) * 0.5 + var(--select-tog-size)); */
    padding-top: var(--input-padding-v);
    padding-bottom: var(--input-padding-v);
  }

  .robo-select.robo-select--clean, .robo-select.robo-select--clean select {
    color: var(--input-text-color);
  }

  .robo-icon {
    position: absolute;
    right: calc(var(--input-padding-g) * 0.5);
    top: calc(50% - var(--select-tog-size) * 0.5 - 0.125em); /* -0.125em - taken from Font Awesome styles */
    pointer-events: none;
  }

  .robo-select--disabled, .robo-select--disabled select,
  .robo-select--single, .robo-select--single select {
    cursor: not-allowed
  }

  .robo-select--single select {
    padding-right: 0;
  }

</style>