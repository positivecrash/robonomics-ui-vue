<template>
    <robo-button 
      @click.prevent="exportSettings()"
      :title="content === 'full' ? 'Download Import Full' : 'Download Import For other users'"
      size="small" 
      outline
      :class="status ? 'changed' : null"
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
  status: {
    type: Boolean,
    default: false
  },
  textlabel: {
    type: Boolean,
    default: false
  }
})

let getfilename = (rwsname) => {
  return 'dapp.robonomics.network-imported-' + rwsname + '.json'
}

let exportSettings = () => {

  let rwsobj = {}
  Object.assign(rwsobj, store.state.robonomicsUIvue.rws.list.find(item => item.owner === store.state.robonomicsUIvue.rws.active))
  let filename = getfilename(rwsobj.name)

  if(rwsobj) {
    store.dispatch('rws/encrypt', JSON.stringify(rwsobj)).then( value => {
      let element = document.createElement('a')
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(value))
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      store.dispatch('rws/setChanged', { rwsowner: rwsobj.owner, value: false })
    })
  } 
}

</script>

<style scoped>
  .changed {
    position: relative;
  }

  .changed:after {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: var(--robo-color-orange);
    position: absolute;
    top: -6px;
    right: -6px;
  }
</style>