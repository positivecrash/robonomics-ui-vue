<template>
    <robo-section offset="x05" v-if="useraddress && statuscomp!=='removed'">
        <robo-card>
            <robo-grid type="flex" galign="stretch" valign="center" offset="x0">
                
                <robo-grid type="flex" valign="center" offset="x0" gap="x1">
                    
                    <robo-text weigth="light" size="small" nowrap>
                        {{shortenAddress(useraddress)}}
                        <robo-copy :text="useraddress" />
                    </robo-text>

                    <robo-text weigth="light" size="small" nowrap>
                        <robo-grid type="flex" valign="center" offset="x0" gap="x025">
                            <robo-input v-model="userlabel" view="text" placeholder="Label for user"  />
                            <robo-button v-if="changed" clean size="small" @click.prevent="savelabel(userlabel)"><robo-icon icon="floppy" /></robo-button>
                        </robo-grid>
                    </robo-text>
                </robo-grid>
                
                <template v-if="canDelete">
                    <robo-button-delete-approval v-if="statuscomp!=='loading'" :action="removeuser">Delete this user</robo-button-delete-approval>
                    <robo-loader v-if="statuscomp==='loading'" />
                </template>
            </robo-grid>
        </robo-card>
        <robo-status v-if="statuscomp==='removecancelled' && canDelete" type="warning">The removal of the user has been canceled</robo-status>
        <robo-status v-if="statuscomp==='removeerror'" type="error" solid close>
            <template v-if="statusmsg">{{statusmsg}}</template>
            <template v-else>User has not been removed, some error occured</template>
        </robo-status>
    </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupUser' }
</script>

<script setup>
import { shortenAddress } from '../polkadot/tools'
import { defineEmits, ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    useraddress: {
        type: String,
        default: null
    },
    canDelete: {
        type: Boolean,
        default: true
    }
})

const statuscomp = ref('init')
const statusmsg = ref(null)
const emit = defineEmits(['onUserDelete'])

const remove = (status, message) => {
    if(status === 'ok') {
        statuscomp.value = 'removed'
    }

    if(status === 'cancel') {
        statuscomp.value = 'removecancelled'

        setTimeout( () => {
            statuscomp.value = 'init'
        }, 5000)
    }

    if(status === 'error') {
        statuscomp.value = 'removeerror'
    }

    if(message) {
        statusmsg.value = message
    }
}

const removeuser = () => {
    statuscomp.value = 'loading'
    emit('onUserDelete', props.useraddress, (status, message) => remove(status, message))
}


/* + LABEL */
const userlabel = ref(null)
const userlabelinit = ref(null)

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
})

const savelabel = (label) => {

    store.dispatch('rws/findrws', active.value).then(index => {
        if(index > -1) {
            if(!rws.value[index]?.users) {
                rws.value[index].users = [{'address': props.useraddress, 'label': label}]
            } else {
                const finduser = rws.value[index].users.map(item => item.address).indexOf(props.useraddress)
                if(finduser > -1) {
                    rws.value[index].users[finduser].label = label
                } else {
                    rws.value[index].users.push({'address': props.useraddress, 'label': label})
                }

                userlabelinit.value = label
            }

            store.dispatch('rws/add', rws.value[index])
        }
    })
}

const changed = computed( () => {
    return userlabel.value !== userlabelinit.value 
})

const initlabel = () => {
    store.dispatch('rws/findrws', active.value).then(index => {
        if(index > -1) {
            if(rws.value[index]?.users) {
                const finduser = rws.value[index].users.map(item => item.address).indexOf(props.useraddress)
                if(finduser > -1) {
                    userlabel.value = rws.value[index].users[finduser].label
                    userlabelinit.value = userlabel.value
                }
            }
        }
    })
}

onMounted( () => {
    initlabel()
    console.log('statuscomp mounted', statuscomp.value)

    watch(() => active.value, () => {
        initlabel()
    })

    watch( () => statuscomp.value, () => {
        console.log('statuscomp edited', statuscomp.value)
    })
})
/* - LABEL */
</script>