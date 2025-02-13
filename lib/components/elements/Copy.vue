<template>
    <robo-button v-if="props.text" @click.prevent="copy" :size="props.size" clean :disabled="copied ? 'ok' : null">
        <robo-grid type="flex" gap="x025">
            <robo-icon icon="copy" />
            <robo-icon icon="check" v-if="copied" />
        </robo-grid>
    </robo-button>
</template>

<script>
  export default { name: 'RoboCopy' }
</script>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    size: {
        type: String,
        default: 'normal',
        validator: function (value) {
            return ['small', 'normal', 'big'].indexOf(value) !== -1;
        }
    },

    text: {
      type: String,
      default: null
    }
})

let copied = ref(false)

let copy = () => {
    navigator.clipboard.writeText(props.text)
    copied.value = true;

    setTimeout(function(){
        copied.value = false;
    }, 1500);
}

</script>