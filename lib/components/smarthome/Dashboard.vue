<template>
    <robo-layout-section>

        <robo-section v-if="!rws || rws?.length < 1" width="narrow" gcenter centered>
            <robo-text size="small" weight="bold" offset="x05">Your smart devices dashboard will appear here</robo-text>
            <robo-button :router="store.state.robonomicsUIvue.rws.links.setupnew">Add a setup</robo-button>
        </robo-section>

        <template v-else>
            <robo-section v-if="!users || users.length < 1" width="narrow" gcenter centered>
                <robo-text size="small" weight="bold" offset="x05">No users found in current subscription</robo-text>
                <robo-button :router="store.state.robonomicsUIvue.rws.links.setup">Edit a setup</robo-button>
            </robo-section>
            <robo-section v-else width="narrow" gcenter centered>
                <robo-rws-user-signin />
            </robo-section>

            <template v-if="store.state.robonomicsUIvue.rws.user.key">
                
                <robo-smarthome-controls
                    :config = "cfg"
                    :datalog = "dLogs"
                    :cid="cid"
                    :updateTime="updateTime"
                    :datalogBackupUpdate="dUpdated"
                    :configBackupUpdated="cfgUpdated"
                />

                <robo-section v-if="cfg && dLogs" offset="x2">
                    <robo-smarthome-entities :config="cfg" :datalog="dLogs" />
                </robo-section>
            </template>

        </template>

    </robo-layout-section>

</template>

<script>
  export default { name: 'RoboSmarthomeDashboard' }
</script>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'

const props = defineProps({
    config: {
        type: [Object, String]
    },
    datalog: {
        type: [Object, String]
    },
    cid: {
        type: String
    },
    //timestamp
    updateTime: {
      type: Number,
      default: null
    }
});

const dLogs = ref(null);
const dUpdated = ref(null);
const cfg = ref(null);
const cfgUpdated = ref(null);


import { useStore } from 'vuex';
const store = useStore();

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws?.list;
});

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users;
});

const user = computed(() => {
    return store.state.robonomicsUIvue.rws.active
})

const useLocalStorageBackup = (propRef, storageKey, targetRef, updatedRef, fieldName = 'data') => {
  let timeout = null

  watch(propRef, v => {
    if (v) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      let list = JSON.parse(localStorage.getItem(storageKey)) || []
      const index = list.findIndex(item => item.owner === user.value)

      const newObj = {
        owner: user.value,
        [fieldName]: v,
        updated: new Date().toISOString()
      }

      if (index >= 0) {
        list[index] = newObj
      } else {
        list.push(newObj)
      }

      localStorage.setItem(storageKey, JSON.stringify(list))
      targetRef.value = v

    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          const list = JSON.parse(localStorage.getItem(storageKey) || '[]')
          const entry = list.find(item => item.owner === user.value)

          if (entry) {
            targetRef.value = entry[fieldName]
            if (updatedRef) {
              updatedRef.value = entry.updated
            }
            console.log(`Loaded ${fieldName} from localStorage after 3 min wait`)
          }

          timeout = null

          if(!updatedRef.value) {
            console.log('no datalog available')
          }
        }, 3 * 60 * 1000) 
      }
    }
  }, { immediate: true })
}

useLocalStorageBackup(
  () => props.datalog,
  'datalog_polkadot_owner',
  dLogs,
  dUpdated,
  'data'
)

useLocalStorageBackup(
  () => props.config,
  'config_polkadot_owner',
  cfg,
  cfgUpdated,
  'config'
)

</script>