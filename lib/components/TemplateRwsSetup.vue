<template>

    <robo-section offset="x2" width="narrow">

        <robo-section offset="x2">
            <robo-template-rws-active :create="newsetup" />
        </robo-section>

        <robo-section offset="x3">
            <robo-text title="3" v-if="newsetup">Manual configuration for existing subscription</robo-text>
            <robo-text title="3" v-else>Subscription settings</robo-text>
            <robo-template-rws-setup-form :create="newsetup" @on-update="onRwsUpdate" />
        </robo-section>

        <template v-if="!newsetup">
            <robo-section offset="x3" id="userslist">
                <robo-text title="3" offset="x0">Users in subscription</robo-text>
                <robo-text offset="x1" weight="normal-italic" size="small">
                    <template v-if="!isAdmin">To add/remove users you need the owner account connected.</template> 
                    User account recommendations: technical ed25519 Polkadot account, no tokens required.
                </robo-text>

                <template v-if="rwsnotempty">

                    <robo-section offset="x05">
                        <robo-loader v-if="!users" />
                    </robo-section>

                    <template v-if="users">
                        <robo-template-rws-setup-user 
                        v-for="(user , index) in users" :key="index" 
                        :useraddress="user"
                        @on-user-delete="onUserDelete"
                        :canDelete="isAdmin"
                    />
                    </template>

                    <robo-template-rws-setup-user-add
                        v-if="isAdmin"
                        @on-user-add="onUserAdd"
                    />
                
                </template>
                
                <template v-else>
                    <robo-status type="warning">Start by filling the "General settings"</robo-status>
                </template>

                <robo-account-polkadot-generate>
                    <template #link><robo-icon icon="wand-magic"/> <robo-text weight="bold" size="small">Create an account</robo-text></template>
                    <template #successmsg>Now you may
                        <template v-if="!isAdmin">ask the owner to </template>
                        add this address as a user to the subscription.
                    </template>
                </robo-account-polkadot-generate>
            </robo-section>
        </template>

        <robo-section offset="x3" v-if="!newsetup">
            <robo-text title="3" offset="x0">Home assistant</robo-text>
            <robo-text offset="x1" weight="normal-italic" size="small">
                To login into the Home Assistant application via browser locally 
                (in the same network where your smart devices work) create here the password for your user. Make sure this user has been added to the RWS subscription. <robo-link href="https://www.home-assistant.io/getting-started/onboarding/">More info</robo-link>
            </robo-text>
            
            <robo-template-rws-setup-ha-pass 
                v-if="rwsnotempty && users"
                @on-save-ha-pass="onSaveHapass"
            />
            <robo-status type="warning" v-else>
                <template v-if="!rwsnotempty">Start by filling the general settings</template>
                <template v-if="!users">First please add a user to the subscription</template>
            </robo-status>
        </robo-section>

    </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetup' }
</script>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { isOwnerConnected } from '../polkadot/tools'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    // component settings
    create: {
        type: Boolean,
        default: false
    },

    onRwsUpdate:{
        type: Function
    },
    onUserDelete: {
        type: Function
    },
    onUserAdd: {
        type: Function
    },
    onSaveHapass: {
        type: Function
    }
})

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
})

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const newsetup = computed( () => {
    if(active.value === '') {
        return true
    } else {
        return props.create
    }
})

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

const isAdmin = computed ( () => {
  return isOwnerConnected(store.state.robonomicsUIvue.polkadot.address, store.state.robonomicsUIvue.rws.active)
})

const labeledusers = computed(() => {
    store.dispatch('rws/findrws', active.value).then(index => {
        return rws.value[index].users
    })
})

const rwsuser = computed( () => {
    return store.state.robonomicsUIvue.rws.list.find(rws => rws.owner === store.state.robonomicsUIvue.rws.active)?.user
})

let rwsnotempty = ref(false)

let isrwsempty = () => {
    store.dispatch('rws/findrws', active.value).then(index => {
        if(index > -1 && rws.value[index].owner!=="" && rws.value[index].controller!=="") {
            rwsnotempty.value = true
        } else {
            rwsnotempty.value = false
        }
    })
}

onMounted( () => {
    isrwsempty()

    watch(rws.value, () => {
        isrwsempty()
    })

    watch(() => active.value, () => {
        isrwsempty()
    })

})

</script>