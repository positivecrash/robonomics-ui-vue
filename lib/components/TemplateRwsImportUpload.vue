<template>
  <form enctype="multipart/form-data" @submit.prevent>
    <!-- <robo-button input outlined @change="importSelected($event)" type="file" accept=".json" name="uploadsettings" id="uploadsettings">
      <robo-icon icon="file-arrow-up" />
      <robo-text v-if="textlabel">Import setup</robo-text>
    </robo-button> -->

    <!-- <label for="uploadsettings">
        <robo-icon icon="file-arrow-up" />
        <robo-text v-if="textlabel">Upload setup</robo-text>
    </label>

    <input @change="importSelected($event)" type="file"  accept=".json" name="uploadsettings" id="uploadsettings" /> -->

    <robo-button outline size="small">
        <robo-icon icon="file-arrow-up" />
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
// let importProcessing = ref(false)
let importResult = ref(null)

const props = defineProps({
  size: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return ['small', 'normal', 'large'].indexOf(value) !== -1;
      }
  },
  textlabel: {
    type: Boolean,
    default: false
  }
})

let importSelected = e => {
    let files = e.target.files
    let file = files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function() {
        // importProcessing.value = true
        importResult.value = store.dispatch('rws/import', reader.result).then( () => {
          store.dispatch('rws/setChanged', { rwsowner: store.state.robonomicsUIvue.rws.active, value: false })
        })
        
        // setTimeout( () => {
        //     importProcessing.value = false
        // }, 1000)

        // setTimeout( () => {
        //     importResult.value = null
        // }, 3000)

    }
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