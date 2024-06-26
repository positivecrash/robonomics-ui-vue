<template>
    <div :class="classList" tabindex="0">

      <select 
        :name="name" 
        v-bind="$attrs"
        v-model="selected" 
        @change="setWidth"
        :disabled="disabled ? true : null"
      >
        <option 
          v-for="(option,index) in options" 
          :key="index" 
          :value="(values) ? values[index] : option"
        >
            {{option}}
          </option>
      </select>

      <robo-text v-if="label" size="tiny" weight="bold" class="robo-select-label">{{label}}</robo-text>

      <robo-icon icon="select-arrow" />
    </div>
</template>

<script>
  export default { name: 'RoboSelect' }
</script>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
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
  modelValue: {
      type: String,
      required: true
  },
  label: {
    type: String
  },
  name: {
    type: String
  },
  offset: {
    type: String,
    default: 'x0',
    validator(value) {
      return ['x0', 'x05', 'x1', 'x2', 'x4'].includes(value)
    }
  },
  options: {
    type: [Array, Object],
    default: null,
    required: true
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    }
  },
  values: {
    type: [Array, Object],
    default: null
  }
})

const classList = computed( () => {
    return {
      [`robo-select`]: true,
      [`robo-select--clean`]: props.clean,
      [`robo-select--block`]: props.block,
      [`robo-select--disabled`]: props.disabled,
      // [`robo-select--single`]: props.options.length < 2,
      [`robo-select--size-${props.size}`]: props.size,
      [`robo-select--labeled`]: props.label,
    }
})

const calcOffset = gap => 
  ({
    'x0': 'none',
    'x025': 'calc(var(--gap-layout) * 0.25)',
    'x05': 'calc(var(--gap-layout) * 0.5)',
    'x1': 'var(--gap-layout)',
    'x2': 'calc(var(--gap-layout) * 2)',
    'x3': 'calc(var(--gap-layout) * 3)',
    'x4': 'calc(var(--gap-layout) * 4)'
  }[gap] ?? 'none')

const offsetFromData = computed( () => {
  return calcOffset(props.offset)
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
    get: () => {
      if(!props.modelValue) {
        console.warn('[robonomics-ui-vue3]: `robo-select` component is missing required v-model directive')
      } else {
        return props.modelValue
      }
    },
    set: value => {
      emit('update:modelValue', value)
    }
})

</script>

<style scoped>

  .robo-select, select {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }

  .robo-select {
    --background: var(--robo-color-input);
    --border: var(--robo-color-inputborder);
    --color: var(--robo-color-inputcolor);
    --label: var(--robo-color-inputcolor);
    --border-active: var(--robo-color-inputcoloractive);
    --label-active: var(--robo-color-inputcoloractive);
    --offset: v-bind(offsetFromData);

    --select-tog-size: 0.65rem;
    position: relative;
    line-height: 1;
  }

  .robo-select:not(:last-child) {
    margin-bottom: var(--offset);
  }

  .robo-select--disabled {
    --border: var(--robo-color-inputborderdisabled);
  }

  select {
    --webkit-appearance: none;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    color: var(--color);
    display: block;
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    line-height: 2;
    padding-right: calc(var(--input-padding-g) * 1.5 + var(--select-tog-size));
    /* min-width: 100%; */
    width: 100%;
  }

  .robo-select--block {
    display: block;
  }

  .robo-select:not(.robo-select--clean) {
    background-color: var(--background);
    border: 1px solid var(--border);
    color: var(--color);
  }

  .robo-select:not(.robo-select--clean) select {
    padding-bottom: var(--input-padding-v);
    padding-left: var(--input-padding-g);
    padding-top: var(--input-padding-v);
  }

  .robo-icon {
    pointer-events: none;
    position: absolute;
    right: calc(var(--input-padding-g) * 0.45);
    top: calc(50% - var(--select-tog-size) * 0.5);
  }

  .robo-select--disabled, .robo-select--disabled select {
    cursor: not-allowed;
    opacity: var(--robo-opacity-inputdisabled);
  }

  /* .robo-select--single select {
    padding-right: var(--input-padding-g);
  } */

  .robo-select--size-small {
    --input-padding-v: calc(var(--input-padding-g) * 0.5);
    /* --input-padding-g: 0.5rem; */
  }

  .robo-select--size-small .robo-icon {
    /* font-size: 0.6em; */
    top: calc(50% - 0.4em);
  }

  .robo-select-label {
      left: var(--input-padding-g);
      position: absolute;
      top: calc(var(--space) * 0.5);
      transition: 0.2s all ease;
  }

  .robo-select--labeled {
    padding-top: var(--space);
  }

  .robo-select--labeled select {
    --input-padding-g: var(--space);
    padding-top: calc(var(--input-padding-v) - var(--space)/2) !important;
  }

  .robo-select--clean .robo-select-label {
    left: 0;
  }

</style>