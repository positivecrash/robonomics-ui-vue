<template>
    <robo-details v-if="savedusers && savedusers.length > 0">
        <template #summary><robo-icon icon="user" /></template>
        <robo-text title="4">Saved keys</robo-text>
        <robo-text size="tiny" weight="normal-italic">These keys are saved locally on your device. Do not keep them if you do not trust the device you are using to view the application.</robo-text>
        <robo-grid gap="x025" offset="x1" divider="dotted">
            <div v-for="user in savedusers" :key="user.user">
                <robo-grid type="flex" gap="x0" offset="x025">
                    <robo-text weight="bold">{{shortenAddress(user.user)}}</robo-text>
                    <robo-button @click.prevent="deleteuser(user.user)" clean type="error"><robo-icon icon="xmark" /></robo-button>
                </robo-grid>
            </div>
        </robo-grid>
    </robo-details>
</template>

<script>
  export default { name: 'RoboRwsUserKeys' }
</script>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { IDBgettable, IDBworkflow } from '../idb'
import {shortenAddress} from '../polkadot/tools'
import { useStore } from 'vuex'
const store = useStore()

const savedusers = ref(null)

const useraccount = computed( () => {
  return store.state.robonomicsUIvue.rws.user.account
})

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key
})

const deleteuser = address => {

    IDBworkflow('dbrws', 1, 'dbrwsuser', 'readwrite', store => {
            const request = store.delete(address)

            // request.onsuccess = () => {
            //     console.log('saved', objtosave)
            // }

            request.onerror = e => {
                if(e.target.error) {
                    errormsg.value = e.target.error
                }
            }
        }, {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])
}

onMounted( async () => {
    savedusers.value = await IDBgettable('dbrws', 1, 'dbrwsuser', {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])
    
    const bc = new BroadcastChannel('IDBUser')
    bc.onmessage = async(e) => {
        if(e.data === 'changed') {
            savedusers.value = await IDBgettable('dbrws', 1, 'dbrwsuser', {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])
        }
    };
})
</script>

<style scoped>
.robo-details {
    --robo-details-tooltip-minwidth: 320px;
}
</style>