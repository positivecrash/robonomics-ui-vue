<template>
  <robo-button 
    @click.prevent="exportSettings()"
    title="Download import file"
    size="small" 
    outline
  >
    <robo-icon icon="file-arrow-down" />
  </robo-button>
</template>

<script>
  export default { name: 'RoboTemplateRwsImportDownload' }
</script>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const thisrws = computed (() => {
  return store.state.robonomicsUIvue.rws.list.find(item => item.owner === store.state.robonomicsUIvue.rws.active)
})

const filename = computed (() => {
  return 'imported-rws-' + thisrws.value.name + '.json'
})

let exportSettings = async () => {
 
  let text = await store.dispatch('rws/encrypt', JSON.stringify(thisrws.value)).then( value => {
      // console.log('thisrws', thisrws.value)
      // console.log('text', value)
      // console.log('text decrypt', store.dispatch('rws/decrypt', value))

      let element = document.createElement('a')
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(value))
      element.setAttribute('download', filename.value)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    })
    
}
</script>