<template>
  <div :class="classes" :disabled="editStatus === 'loading'">
    <robo-text 
      v-if="label && inputtype !== 'radio' && inputtype !== 'checkbox'" 
      size="tiny" 
      weight="bold" 
      class="robo-input-label"
    >
      {{label}}
    </robo-text>

    <robo-grid class="robo-input-inside" type="flex" gap="x05" valign="center">

      <template v-if="inputtype === 'radio' || inputtype === 'checkbox'">
        <input
          ref="input"
          v-bind="$attrs"
          :type="inputtype"
          :checked="model == attrs.value"
          @change="radioChange"
          :disabled="attrs.disabled"
          :id="inputId"
        />
        <label
          v-if="label"
          :for="inputId"
        >{{ label }}</label>
      </template>

      <template v-else>
        <input
          ref="input"
          v-bind="$attrs"
          @focus="focused"
          @blur="blurred"
          @input="changing"
          v-model="model"
          :type="inputtype"
          :class="(!isFocused && !isChanged) ? 'hide' : null"
        />
      </template>

      <robo-button 
        v-if="attrs.type === 'password' && !attrs.disabled"
        @click.prevent="showPassword"
        class="showPasswordButton"
        clean
        role="switch"
        :aria-pressed="showPasswordPressed"
        :aria-label="showPasswordPressed ? 'Hide' : 'Show'"
      >
        <robo-icon :icon="showPasswordPressed ? 'eye-slash' : 'eye'" />
      </robo-button>
      <robo-button 
        v-if="props.edit" 
        @click="edit"  
        :loading="editStatus === 'loading'"
        :disabled="attrs.disabled"
        clean>
        <robo-icon v-if="editStatus !== 'loading'" :icon="(!isChanged && !isFocused) ? 'pencil' : 'save'" />
      </robo-button>
      <template v-if="editStatus === 'ok' || editStatus === 'error'">
        <robo-details v-if="message">
          <template #summary>
            <robo-icon 
              :icon="(editStatus === 'ok') ? 'circle-check' : 'circle-exclamation'" 
              :color="(editStatus === 'ok') ? 'var(--robo-color-green)' : 'var(--robo-color-orange)'" 
            />
          </template>
          {{message}}
        </robo-details>
        <robo-icon 
          v-else
          :icon="(editStatus === 'ok') ? 'circle-check' : 'circle-exclamation'" 
          :color="(editStatus === 'ok') ? 'var(--robo-color-green)' : 'var(--robo-color-orange)'" 
        />
      </template>

    </robo-grid>
  </div>
</template>

<script>
export default {
  name: 'RoboInputNew',
  inheritAttrs: false
}
</script>

<script setup>
import { computed, ref, onMounted, watch, useAttrs } from 'vue';
const attrs = useAttrs();
const model = defineModel();
const input = ref(null);
const savedValue = ref(null);

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  },

  highlight: {
    type: String,
    default: null,
    validator: (v) => ['ok', 'error'].includes(v)
  },

  label: {
    type: String, 
    default: null 
  },

  size: {
    type: String,
    default: 'medium',
    validator: v => ['small', 'medium'].includes(v)
  },

  statuscode: {
    type: String
  },

  statusmsg: {
    type: String
  },

  view: {
    type: String,
    default: 'initial',
    validator: v => ['initial', 'line'].includes(v)
  },

  width: {
    type: String,
    default: 'initial',
    validator: v => ['initial', 'wide', 'fit'].includes(v)
  }
});

const inputtype = ref(attrs.type);
const inputId = computed(() => 'input-' + Math.random().toString(36).substr(2, 8));

const classes = computed(() => ({
  ['robo-input']: true,
  ['robo-input-labeled']: props.label,
  [`robo-input-width-${props.width}`]: props.width && props.width !== 'initial',
  [`robo-input-view-${props.view}`]: props.view && props.view !== 'initial',
  ['robo-input-edit']: props.edit,
  ['robo-input-focused']: isFocused.value,
  ['robo-input-disabled']: attrs?.disabled,
  [`robo-input-size-${props.size}`]: props.size && props.size !== 'medium',
  [`robo-input-highlight-${props.highlight}`]: props.highlight,
}));

const getInputWidth = computed(() => {
  if (props.width === 'fit') {
    if (model?.value) return `${model?.value.length}ch`;
    if (attrs.hasOwnProperty('placeholder')) return `${attrs.placeholder.length}ch`;
    return 'auto';
  }
  if (props.width === 'wide') return '100%';
  return 'auto';
});

/* Focus for text, not radio */
const isFocused = ref(attrs.hasOwnProperty('autofocus'));
const focused = () => { if (inputtype.value !== 'radio') isFocused.value = true; }
const blurred = () => { if (inputtype.value !== 'radio') isFocused.value = false; }

/* Edit (inline edit for input[type=text]) */
const emit = defineEmits(['onEdit']);
const editStatus = ref('init');
const isChanged = ref(false);
const message = ref(null);
const firstchange = ref(false);

const changing = () => {
  editStatus.value = 'init';
  message.value = null;
  if (firstchange.value) {
    if (savedValue.value !== input.value?.value) isChanged.value = true;
    savedValue.value = input.value?.value;
    firstchange.value = false;
  } else {
    isChanged.value = (savedValue.value !== input.value?.value);
  }
};
const edit = () => {
  if (!isChanged.value && !isFocused.value) {
    isFocused.value = true;
    setTimeout(() => { input.value.focus(); }, 10);
  } else {
    editStatus.value = 'loading';
    emit('onEdit', (status, msg) => save(status, msg));
  }
}
const save = (status, msg) => {
  editStatus.value = status;
  message.value = msg || null;
  if (status === 'ok') {
    isChanged.value = false;
    firstchange.value = true;
    savedValue.value = input.value.value;
  }
  if (status === 'error') input.value.focus();
}

/* Password support */
const showPasswordPressed = ref(false);
const showPassword = () => {
  showPasswordPressed.value = !showPasswordPressed.value;
  if (inputtype.value === 'password') inputtype.value = 'text';
  else inputtype.value = 'password';
}

const radioChange = () => {
  model.value = attrs.value;
};

onMounted(() => {
  watch(() => props.statuscode, v => {
    editStatus.value = v;
    if (v === 'ok') {
      isChanged.value = false;
      firstchange.value = true;
      savedValue.value = input.value.value;
    }
  }, { immediate: true });
  watch(() => props.statusmsg, v => {
    message.value = v;
  }, { immediate: true });
});
</script>

<style scoped>
.robo-input {
  --background-color: var(--robo-color-input);
  --border-color: var(--robo-color-inputborder);
  --border-width: 1px;
  --text-color: var(--robo-color-inputcolor);
  --label-color: var(--robo-color-inputcolor);
  --width: v-bind(getInputWidth);
  width: var(--width);
  position: relative;
}

.robo-input-inside { width: var(--width); }

.robo-input-width-fit.robo-input, .robo-input-width-fit .robo-input-inside { width: fit-content; }

.robo-input-focused, input[type="radio"]:checked, input[type="checkbox"]:checked {
  --text-color: var(--robo-color-inputcoloractive);
  --border-color: var(--robo-color-inputcoloractive);
  --label-color: var(--robo-color-inputcoloractive);
}

.robo-input-disabled {
  --border-color: var(--robo-color-light-80);
  --text-color: var(--robo-color-light-80);
  --label-color: var(--robo-color-light-80);
}


/* + view type */
.robo-input-view-line { --background-color: transparent; }

.robo-input-view-line input:not([type="radio"]):not([type="checkbox"]) {
  border-width: 0;
  padding: 0;
}

.robo-input-view-line input:not([type="radio"]):not([type="checkbox"]):focus, .robo-input-view-line:not(.robo-input-edit) input:not([type="radio"]):not([type="checkbox"]) {
  box-shadow: 0 var(--border-width) var(--border-color);
}

/* - view type */

.robo-input.robo-input-size-small input {
  --robo-input-padding: calc(var(--robo-space) * 0.5); 
}

input:not([type="radio"]):not([type="checkbox"]) {
  appearance: none;
  background-color: var(--background-color);
  border: var(--border-width) solid var(--border-color);
  box-sizing: content-box;
  color: var(--text-color);
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  padding: var(--robo-input-padding);
  transition: 0.2s all ease;
  width: var(--width);
  display: block;
}

input[type="radio"], input[type="checkbox"] {
  width: calc(var(--robo-space) * 1.2);
  height: calc(var(--robo-space) * 1.2);
  accent-color: var(--border-color);
  vertical-align: middle;
}

input[type="radio"]:checked, input[type="checkbox"]:checked {
  --border-color: var(--robo-color-inputcoloractive);
}

input[type="radio"]:disabled, input[type="checkbox"]:disabled,
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled + label {
  opacity: 0.5;
}

input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label {
  color: var(--robo-color-inputcoloractive);
  font-weight: bold;
}

.robo-input-highlight-ok {
  --robo-color-inputcoloractive: var(--robo-color-green-110);
}
.robo-input-highlight-error {
  --robo-color-inputcoloractive: var(--robo-color-red);
}

.hide { display: none; }
.showPasswordButton {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
.robo-input-label {
  color: var(--label-color);
  left: calc(var(--robo-input-padding) * 0.5);
  position: absolute;
  top: calc(var(--robo-input-padding) * 0.5);
  transition: 0.2s all ease;
  opacity: 0.6;
}
.robo-input-labeled input { padding-top: calc(var(--robo-input-padding) * 2.2); }
</style>
