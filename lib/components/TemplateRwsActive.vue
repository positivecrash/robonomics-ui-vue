<template>
  <template v-if="!select">

    <template v-if="rws.length < 1 || create">
      
      <robo-text offset="x1" size="small" paragraphs>
        <p>Robonomics smart home intergration allows you to interact with smart devices and robots. Interaction is carried out by transactions within Robonomics parachain instead of centralized cloud services.</p>
        <p>The Robonomics Subscription guarantees the ability to send transactions stably every block. It is a good choice if you want to receive data from devices and manage them remotely.</p>
        <p>You may buy new subscription or renew your subscription <robo-link :router="store.state.robonomicsUIvue.rws.links.activate">here</robo-link>.</p>
      </robo-text>

     <robo-section>
      <robo-file-upload :onloadfunc="upload" title="Upload .json with setup" drop>
        <template #label>Upload an existing subscription</template>
      </robo-file-upload>
      <robo-status v-if="errormsg" type="error">{{errormsg}}</robo-status>
     </robo-section>
    </template>

    <template v-else>
      <robo-section offset="x0">
        
          <robo-select
              v-if="rws.length > 1"
              block
              size="small"
              :options="rwsNames" 
              :values="rwsOwners" 
              v-model="rwsactiveModel" 
              @change="setActive()"
              v-bind="$attrs"
          />
          <robo-text title="4" offset="x0" break v-else>{{rwsName}}</robo-text>

        <robo-template-rws-active-info />
      </robo-section>
    </template>
  </template>


  <template v-else>
    <robo-details v-if="rws.length > 0">
      <template #summary>
          <robo-grid type="flex" offset="0" gap="x05">
            <robo-icon icon="house-signal-solid" />
            <span class="robo-line-clipoverflow">{{rwsName}}</span>
          </robo-grid>
      </template>

      <robo-section offset="x1">
          <robo-text title="4" offset="x025" nowrap>Your RWS subscription</robo-text>
          <robo-template-rws-active-info select />
      </robo-section>


      <robo-section offset="x1" v-if="rws.length > 0">
        <robo-text title="4" offset="x05" nowrap>Other subscriptions:</robo-text>

        <robo-section offset="x05" v-if="rws.length > 1">
          <robo-select
            block
            size="small"
            :options="rwsNames" 
            :values="rwsOwners" 
            v-model="rwsactiveModel" 
            @change="setActive()"
            v-bind="$attrs"
            class="selectrws"
          />
        </robo-section>

        <robo-grid type="flex" offset="x0" gap="x05" galign="start" valign="center">
          <robo-button title="Buy a subscription" :router="store.state.robonomicsUIvue.rws.links.activate" size="small" outline><robo-icon icon="wallet" /></robo-button>
          <!-- <robo-template-rws-import-upload size="small" outline /> -->
          <robo-file-upload :onloadfunc="upload" title="Upload .json with setup" />
          <robo-button title="Add a subscription" :router="store.state.robonomicsUIvue.rws.links.setupnew" size="small" outline><robo-icon icon="plus" /></robo-button>
          <robo-template-rws-import-delete all v-if="rws.length > 1" />
        </robo-grid>
      </robo-section>

    </robo-details>

    <robo-button v-else :router="store.state.robonomicsUIvue.rws.links.setup" size="small">
      <robo-icon icon="user" />
      <robo-text>Subscription</robo-text>
    </robo-button>
  </template>

</template>

<script>
  export default { name: 'RoboTemplateRwsActive' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  create: {
    type: Boolean,
    default: false
  },
  select: {
      type: Boolean,
      default: false
  }
})

/* + get rws */
const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const active = computed( ()=> {
  return store.state.robonomicsUIvue.rws.active
})

store.dispatch('rws/getActive')
let rwsactiveModel = ref(store.state.robonomicsUIvue.rws.active)
/* - get rws */

const rwsName = computed( () => {
  if(rws.value && rws.value.length > 0) {
    return rws.value.find(item => item.owner === store.state.robonomicsUIvue.rws.active).name
  } else {
    return null
  }
})

const rwsNames = computed( () => {
  if(rws.value && rws.value.length > 0) {
    return rws.value.map(item => {
      return item.name
    })
  } else {
    return null
  }
})

const rwsOwners = computed( () => {

  if(rws.value && rws.value.length > 0) {
    return rws.value.map(item => {
      return item.owner
    })
  } else {
    return null
  }

})

let setActive = () => {
  store.commit('rws/setActive', rwsactiveModel.value)
}

const errormsg = ref(null)
const upload = uploaded => {

  errormsg.value = null

  store.dispatch('rws/import', uploaded).then( e => {
    if(e) {
      router.push(store.state.robonomicsUIvue.rws.links.setup)
    } else {
      errormsg.value = 'Something went wrong while uploading'
    }
  })
  
}

onMounted( () => {
    watch(rws, () => {
      rwsactiveModel.value = store.state.robonomicsUIvue.rws.active
    })

    watch(active, value => {
      rwsactiveModel.value = value
    })
})

</script>

<style scoped>
  .selectrws, .robo-line-clipoverflow
  { max-width: 250px; }
  
  details {
    --robo-details-tooltip-minwidth: 300px;
  }
</style>