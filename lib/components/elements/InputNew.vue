<template>
  <div :class="classes" :disabled="editStatus === 'loading'">
    <robo-text v-if="label" :size="isFocused ? 'small' : 'tiny'" weight="bold" class="robo-input-label">{{label}}</robo-text>

    <robo-grid class="robo-input-inside" type="flex" gap="x05" valign="center">
      <span 
        v-if="modellabel"
        class="modelalbel"
        :class="(isFocused || isChanged) ? 'hide' : null"
      >{{modellabel}}</span>

      <input
        ref="input"
        v-bind="$attrs"
        @focus="focused"
        @blur="blurred"
        @input="changing"
        v-model="model"
        :type="inputtype"
        :class="(modellabel && !isFocused && !isChanged) ? 'hide' : null"
      />

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
        <!-- <template v-if="editStatus === 'init'">
          <robo-icon :icon="(!isChanged && !isFocused) ? 'pencil' : 'save'" />
        </template>
        
        <robo-icon v-if="editStatus === 'error'" icon="ban" color="var(--robo-color-red)" />
        <robo-icon v-if="editStatus === 'ok'" icon="check" color="var(--robo-color-green)" /> -->
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
  // import { computed, ref, useTemplateRef, onMounted } from 'vue';
  import { computed, ref, onMounted, watch, useAttrs } from 'vue';
  const attrs = useAttrs();
  const model = defineModel();
  // const inputRef = useTemplateRef('input');
  const input = ref(null);
  const savedValue = ref(null);

  const props = defineProps({

    edit: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: null
    },

    modellabel: {
      type: String
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
      validator: function (value) {
        return ['initial', 'line'].indexOf(value) !== -1;
      }
    },

    width: {
      type: String,
      default: 'initial',
      validator: function (value) {
        return ['initial', 'wide', 'fit'].indexOf(value) !== -1;
      }
    }

  });

  const inputtype = ref(attrs.type);

  const classes = computed( () => {
    return {
      [`robo-input`]: true,
      [`robo-input-labeled`]: props.label,
      [`robo-input-width-${props.width}`]: props.width && props.width !== 'initial',
      [`robo-input-view-${props.view}`]: props.view && props.view !== 'initial',
      [`robo-input-edit`]: props.edit,
      [`robo-input-labeled`]: props.label,
      [`robo-input-focused`]: isFocused.value,
      [`robo-input-disabled`]: attrs?.disabled,
    }
  });

  const getInputWidth = computed(() => {
    if(props.width === 'fit') {
      if(model?.value) {
        return `${model?.value.length}ch`;
      } else {
        if(attrs.hasOwnProperty('placeholder')) {
          return `${attrs.placeholder.length}ch`;
        } else {
          return 'auto';
        }
      }
      
    }
    
    if(props.width === 'wide') {
      return '100%';
    }
    
    return 'auto';
  });

  /* + Determine focused status */
  const isFocused = ref(attrs.hasOwnProperty('autofocus') ? true : false);

  const focused = () => {
    isFocused.value = true;
  }
  
  const blurred = () => {
    isFocused.value = false;
  }
  /* - Determine focused status */


  /* + EDIT (inline edit for the input[type=text]) */
  const emit = defineEmits(['onEdit']);
  const editStatus = ref('init'); /* init, loading, ok, error */
  const isChanged = ref(false);
  const message = ref(null);
  const firstchange = ref(false);

  const changing = () => {

    editStatus.value = 'init';
    message.value = null;

    // Сначала сравниваем, а потом, если это первый вызов, сохраняем значение
    if (firstchange.value) {
      // Если savedValue не совпадает, то отобразим изменение
      if (savedValue.value !== input.value?.value) {
        isChanged.value = true;
      }
      savedValue.value = input.value?.value;
      firstchange.value = false;
    } else {
      if (savedValue.value !== input.value?.value) {
        isChanged.value = true;
      } else {
        isChanged.value = false;
      }
    }
  };

  const edit = () => {
    
    if (!isChanged.value && !isFocused.value) {
      // console.log('edit 1 cond – переводим в режим редактирования');
      isFocused.value = true;
      setTimeout(() => {
        input.value.focus();
      }, 10);
    } else {
      // console.log('edit 2 cond – пытаемся сохранить');
      editStatus.value = 'loading';
      emit('onEdit', (status, msg) => save(status, msg));
    }

  }

  const save = (status, msg) => {

    editStatus.value = status;
    message.value = msg || null;

    if(status === 'ok') {
      isChanged.value = false;
      firstchange.value = true;
      savedValue.value = input.value.value;
    }

    if(status === 'error') {
      input.value.focus();
    }
  }
  /* - EDIT */

  /* + PASSWORD */
  const showPasswordPressed = ref(false);
  
  const showPassword = () => {
    showPasswordPressed.value = !showPasswordPressed.value;
    if(inputtype.value === 'password') {
      inputtype.value = 'text';
    } else {
      inputtype.value = 'password';
    }
  }
  /* - PASSWORD */

  onMounted ( () => {

    /* + EDIT */
    watch(()=> props.statuscode, v => {
      editStatus.value = v;

      if(v === 'ok') {
        isChanged.value = false;
        firstchange.value = true;
        savedValue.value = input.value.value;
      }

      // if(v === 'error') {
      //   // isChanged.value = true;
      //   isFocused.value = true;
      //   input.value.focus();
      // }
    }, {immediate: true});

    watch(()=> props.statusmsg, v => {
      message.value = v;
    }, {immediate: true});

    // watch(()=> editStatus.value, v => {
    //   // if(v === 'ok' || v === 'error') {
    //   if(v === 'ok') {
    //     setTimeout(() => {
    //       editStatus.value = 'init';
    //       message.value = null;
    //     }, 10000);
    //   }
    // }, {immediate: true});

    /* - EDIT */
  })

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

  .robo-input-inside {
    width: var(--width);
  }

  .robo-input-width-fit.robo-input, .robo-input-width-fit .robo-input-inside {
    width: fit-content;
  }

  .robo-input-focused {
    --text-color: var(--robo-color-inputcoloractive);
    --border-color: var(--robo-color-inputcoloractive);
    --label-color: var(--robo-color-inputcoloractive);
  }

  .robo-input-disabled {
    --border-color: var(--robo-color-light-80);
    --text-color: var(--robo-color-light-80);
    --label-color: var(--robo-color-light-80);
  }

  .robo-input-view-line {
    --background-color: transparent;
  }

  input {
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
  }

  .robo-input-view-line input {
    border-width: 0;
    padding: 0;
  }

  .robo-input-view-line input:focus, .robo-input-view-line:not(.robo-input-edit) input {
    box-shadow: 0 var(--border-width) var(--border-color);
  }

  .modelalbel {
    font-weight: bold;
    display: inline-block;
    line-height: 1;
    vertical-align: text-bottom;
  }

  .hide {
    display: none;
  }

  .showPasswordButton {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }

  /* + LABEL */
  .robo-input-label {
      color: var(--label-color);
      left: var(--robo-input-padding);
      position: absolute;
      top: calc(var(--robo-input-padding) * 0.5);
      transition: 0.2s all ease;
  }

  .robo-input-labeled input {
      padding-top: calc(var(--robo-input-padding) * 2);
  }
  /* - LABEL */
</style>

