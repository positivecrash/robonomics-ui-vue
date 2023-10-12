<template>

  <robo-details>
    <template #summary>
        <robo-grid type="flex" offset="0" gap="x05">
          <robo-icon icon="user" />
          <span v-if="rws.length > 0">{{rwsName}}</span>
          <span v-else>Activate subscription</span>
        </robo-grid>
    </template>

    <robo-section v-if="rws.length > 0" offset="x1">
        <robo-text title="4" offset="x025" nowrap>Your RWS subscription</robo-text>
        
        <robo-text size="small" lines="dotted">

          <robo-text nowrap v-if="rwsName">
            <robo-status v-if="rwsEndDate" :type="rwsStatus" :textRight="rwsName" />
            <span v-else>{{rwsName}}</span>
          </robo-text>

          <robo-grid v-if="rwsEndDate" type="flex" offset="x0" gap="x025" galign="start" valign="center">
            <span>Active till:</span>
            <span>{{dateGetString(rwsEndDate)}}</span>
          </robo-grid>

          <robo-grid type="flex" offset="x0" gap="x025" galign="start" valign="center">
            <span>Owner:</span>
            <span>{{shortenAddress(rwsactiveModel)}}</span>
            <robo-copy :text="rwsactiveModel" />
          </robo-grid>

        </robo-text>

        <robo-section offset="x05">
          <robo-grid type="flex" offset="x0" gap="x05" galign="start" valign="center">
            <robo-button title="View devices" :router="store.state.robonomicsUIvue.rws.links.devices" size="small" outline><robo-icon icon="house-signal-solid" /></robo-button>
            <robo-button title="Edit subscription" :router="store.state.robonomicsUIvue.rws.links.list" size="small" outline><robo-icon icon="pencil" /></robo-button>
            <robo-template-rws-import-download />
          </robo-grid>
        </robo-section>
    </robo-section>


    <robo-section offset="x1">
      <robo-text title="4" offset="x05" nowrap v-if="rws.length > 0">Other subscriptions:</robo-text>

      <robo-section offset="x05" v-if="rws.length > 1">
        <robo-select
          block
          size="small"
          :options="rwsNames" 
          :values="rwsOwners" 
          v-model="rwsactiveModel" 
          @change="setActive()"
          v-bind="$attrs"
        />
      </robo-section>

      <robo-text weight="italic" size="tiny" v-if="rws.length < 1">You can buy new subscription on the activation page or import subscription right here:</robo-text>

      <robo-grid type="flex" offset="x05" gap="x05" galign="start" valign="center">
        <robo-button title="Buy subscription" :router="store.state.robonomicsUIvue.rws.links.activate" size="small" outline><robo-icon icon="wallet" /></robo-button>
        <robo-template-rws-import-upload />
        <robo-template-rws-import-deleteall v-if="rws.length > 0" />
      </robo-grid>
    </robo-section>

  </robo-details>


</template>

<script>
  export default { name: 'RoboTemplateRwsActiveselect' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

import { dateGetRange, dateGetString, setStatusView, shortenAddress } from '../tools'

/* + get rws */
const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})
/* + get rws */


store.dispatch('rws/getActive')
let rwsactiveModel = ref(store.state.robonomicsUIvue.rws.active)
onMounted( () => {
    watch(rwsactiveModel, value => {
        store.commit('rws/setActive', value)
    })
})
/* - get rws */

const rwsName = computed( () => {
  return rws.value.find(item => item.owner === rwsactiveModel.value).name
})

const rwsEndDate = computed( () => {
  return rws.value.find(item => item.owner === rwsactiveModel.value).enddate
})

const rwsNames = computed( () => {
  return rws.value.map(item => {
    return item.name
  })
})

const rwsStatus = computed( () => {
  return setStatusView(dateGetRange(rwsEndDate.value))
})

const rwsOwners = computed( () => {
  return rws.value.map(item => {
    return item.owner
  })
})

let setActive = () => {
    store.commit('rws/setActive', rwsactiveModel)
}

</script>

<style scoped>
  .robo-select { min-width: 8rem; }
  details {
    --robo-details-tooltip-minwidth: 300px;
  }
</style>