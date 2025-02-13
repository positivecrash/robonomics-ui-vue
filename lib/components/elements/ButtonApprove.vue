<template>
  <robo-button v-bind="$attrs" @click.prevent="init"><slot /></robo-button>
  
  <robo-details class="robo-button-approval-details" type="popup" :open="needApprove" :afterCloseDetails="afterAction" :doClose="doClose">
    <robo-text title="5" v-html="approvetext" />

    <robo-grid class="actions" type="flex" gap="x05" offset="x05" galign="stretch">
      <robo-button outline size="small" @click.prevent="doClose = true;">Cancel</robo-button>
      <robo-button outline type="error" size="small" @click.prevent="doAction">{{approvebuttontext}}</robo-button>
    </robo-grid>

  </robo-details>
</template>

<script>
  export default { name: 'RoboButtonApprove' }
</script>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['ClickApprove']);

const props = defineProps({
    approvetext: {
      type: String
    },
    approvebuttontext: {
      type: String
    }
});

const needApprove = ref(false);
const doClose = ref(false);

const afterAction = () => {
  needApprove.value = false;
  doClose.value = false;
}

const init = () => {
  needApprove.value = true;
}

const doAction = () => {
  emit('ClickApprove');
  afterAction();
}

</script>

<style scoped>
  .actions > .robo-button {
    width: 50%;
  }
</style>

<style>
  .robo-details.robo-button-approval-details {
    position: absolute;
    --robo-details-popup-minwidth: 300px;
    --robo-details-popup-maxwidth: 500px;
  }
</style>