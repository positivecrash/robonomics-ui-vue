<template>
    <div :class="classList" tabindex="0">

      <select 
        :name="name" 
        v-bind="$attrs"
        v-model="model" 
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

<script setup>

defineOptions({
  name: 'RoboSelect',
  inheritAttrs: false
});

import { computed } from 'vue';

const model = defineModel();

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
    --padding: var(--robo-input-padding);

    --select-tog-size: 0.65rem;
    position: relative;
    line-height: 1;
    max-width: 100%;
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
    line-height: 1.5;
    padding-right: calc(var(--padding) * 3 + var(--select-tog-size));
    min-width: fit-content;
    width: 100%;
  }

  .robo-select--block {
    display: block;
    width: 100%;
  }

  .robo-select:not(.robo-select--clean) {
    background-color: var(--background);
    border: 1px solid var(--border);
    color: var(--color);
  }

  .robo-select:not(.robo-select--clean) select {
    padding-top: var(--padding);
    padding-bottom: var(--padding);
    padding-left: var(--padding);
  }

  .robo-select.robo-select--clean select {
    padding: 0 calc(var(--padding) + var(--select-tog-size) + var(--robo-space)/2) 0 0;
  }
  
  .robo-icon {
    pointer-events: none;
    position: absolute;
    right: calc(var(--padding) * 0.45);
    top: calc(50% - var(--select-tog-size)/1.5);
  }

  .robo-select--disabled, .robo-select--disabled select {
    cursor: not-allowed;
    opacity: var(--robo-opacity-inputdisabled);
  }

  /* .robo-select--single select {
    padding-right: var(--input-padding-g);
  } */

  .robo-select--size-small {
    --padding: calc(var(--robo-input-padding) * 0.3);
  }

  .robo-select--size-small select {
    font-size: 80%;
  }

  .robo-select--size-small .robo-icon {
    /* font-size: 0.6em; */
    top: calc(50% - 0.4em);
  }

  .robo-select-label {
      left: calc(var(--padding) * 0.5);
      position: absolute;
      top: calc(var(--padding) * 0.2);
      transition: 0.2s all ease;
      opacity: 0.6;
  }

  .robo-select--labeled select {
    padding-top: calc(var(--padding) * 2) !important;
  }

  .robo-select--clean .robo-select-label {
    left: 0;
  }

</style>