<template>
  <form enctype="multipart/form-data">
      <label for="uploadsettings">
        <robo-icon icon="file-arrow-up" />
      </label>

      <input @change="importSelected($event)" type="file"  accept=".json" name="uploadsettings" id="uploadsettings" />
  </form>
</template>

<script>
  export default { name: 'RoboTemplateRwsImportUpload' }
</script>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let importProcessing = ref(false)
let importResult = ref(null)

let importSelected = e => {
    let files = e.target.files
    let file = files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function() {
        importProcessing.value = true
        importResult.value = store.dispatch('rws/import', reader.result)
        
        setTimeout( () => {
            importProcessing.value = false
        }, 1000)

        setTimeout( () => {
            importResult.value = null
        }, 3000)

    }
}
</script>

<style scoped>
  input[type="file"] {
      height: 0;
      overflow: hidden;
      position: absolute;
      width: 0;
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