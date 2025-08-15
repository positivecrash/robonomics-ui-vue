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
                    :config = "config"
                    :datalog = "datalog"
                    :cid="cid"
                    :updateTime="updateTime"
                />

                <robo-section v-if="config && datalog" offset="x2">
                    <robo-smarthome-entities :config="config" :datalog="datalog" />
                </robo-section>
            </template>

        </template>

    </robo-layout-section>

</template>

<script>
  export default { name: 'RoboSmarthomeDashboard' }
</script>

<script setup>
import { computed, watch } from 'vue'

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


import { useStore } from 'vuex';
const store = useStore();

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws?.list;
});

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users;
});


// watch(() => props.datalog, v => {
//     if (v) {
//         console.log('datalog', props.datalog)
//     }
// }, {immediate: true});

</script>