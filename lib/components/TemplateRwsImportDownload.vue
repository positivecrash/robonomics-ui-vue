<template>
    <robo-button 
      @click.prevent="exportSettings()"
      :title="content === 'full' ? 'Download Import Full' : 'Download Import For other users'"
      size="small" 
      outline
    >
      <robo-icon icon="file-arrow-down" />

      <robo-text v-if="textlabel">Download this setup</robo-text>
    </robo-button>
</template>

<script>
  export default { name: 'RoboTemplateRwsImportDownload' }
</script>

<script setup>
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  textlabel: {
    type: Boolean,
    default: false
  }
})

let getfilename = (rwsname) => {
  const rwsnamef = rwsname.replace(/ /g, '-')
  return 'dapp.robonomics.network-imported-' + rwsnamef + '.json'
}

let exportSettings = () => {

  let rwsobj = {}
  Object.assign(rwsobj, store.state.robonomicsUIvue.rws.list.find(item => item.owner === store.state.robonomicsUIvue.rws.active))
  let filename = getfilename(rwsobj.name)

  if(rwsobj) {
    const data = JSON.stringify(rwsobj)
    let element = document.createElement('a')
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data))
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
  } 
}

</script>