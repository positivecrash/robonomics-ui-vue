<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <robo-button v-bind="$attrs">
        <robo-icon v-if="!importProcessing" icon="file-arrow-up" />
        <robo-loader v-if="importProcessing" />
        <robo-text v-if="textlabel">Import setup</robo-text>
        <input title="Import subscription setup" @change="importSelected($event)" type="file"  accept=".json" name="uploadsettings" id="uploadsettings" />
    </robo-button>
  </form>
</template>

<script>
  export default { name: 'RoboTemplateRwsImportUpload' }
</script>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

import { useRouter } from 'vue-router'
const router = useRouter()

import { fileupload } from '../tools'

let importProcessing = ref(false)
let importResult = ref(null)


const props = defineProps({
  textlabel: {
    type: Boolean,
    default: false
  }
})

let importSelected = e => {
  fileupload(e, uploaded => {
    importProcessing.value = true
    importResult.value = store.dispatch('rws/import', uploaded).then( () => {
      store.dispatch('rws/setChanged', { rwsowner: store.state.robonomicsUIvue.rws.active, value: false })
    })
    
    setTimeout( () => {
      importProcessing.value = false
      router.push(store.state.robonomicsUIvue.rws.links.setup)
    }, 500)
  })
}
</script>

<style scoped>
  input[type="file"] {
      cursor: pointer;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
  }

  label {
    border: var(--robo-button-outlinewidth) solid var(--robo-button-background);
    color: var(--robo-button-background);
    cursor: pointer;
    padding: calc(var(--robo-input-padding) * 0.6);
    display: block;
  }

  label .robo-icon { 
    line-height: 1;
    display: block;
  }
</style>