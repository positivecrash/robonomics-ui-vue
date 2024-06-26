<template>
    <robo-grid columns="auto 60px" offset="x0" gap="x025">
        <robo-input v-model="useraddr" label="Add a user" block placeholder="Polkadot address (ed25519)" @input="clear" />
        <robo-button @click.prevent="adduser" size="small" :loading="statuscomp==='loading'" :type="buttontype">
            <robo-icon icon="plus" v-if="statuscomp==='init'" />
            <robo-icon icon="check" v-if="statuscomp==='added'" />
            <robo-icon icon="bolt" v-if="statuscomp==='cancel'" />
            <robo-icon icon="bolt" v-if="statuscomp==='error'" />
        </robo-button>
    </robo-grid>
   <robo-section offset="x05">
    <robo-status v-if="statusmsg" :type="errorStatus" solid close>{{statusmsg}}</robo-status>
   </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupUserAdd' }
</script>

<script setup>
import { defineEmits, ref, computed, watch } from 'vue'
import { isValidAddress } from '../polkadot/tools'

const statuscomp = ref('init')
const statusmsg = ref(null)
const useraddr = ref(null)
const emit = defineEmits(['onUserAdd'])
const errorStatus = ref(null)

const buttontype = computed( () => {
    
    if( statuscomp.value === 'error' || statuscomp.value === 'cancel' ) {
        return 'error'
    }

    if( statuscomp.value === 'added') {
        return 'ok'
    }

    return 'primary'
})

let add = (status, message) => {
    if(status === 'ok') {
        statuscomp.value = 'added'
        errorStatus.value = 'ok'
    }

    if(status === 'error') {
        statuscomp.value = 'error'
        errorStatus.value = 'error'

        if(!message) {
            statusmsg.value = 'Something went wrong, user was not added'
        } else {
            statusmsg.value = message
        }
    }

    if(status === 'cancel') {
        statuscomp.value = 'cancel'
        errorStatus.value = 'warning'

        if(!message) {
            statusmsg.value = 'The saving process has been canceled'
        } else {
            statusmsg.value = message
        }
    }

    setTimeout(() => {
        if(status === 'ok') {
            clear()
            useraddr.value = null
        }
    }, 3000)
}

let adduser = () => {
    statuscomp.value = 'loading'
    statusmsg.value = null

    if( useraddr.value && isValidAddress(useraddr.value) ) {
        emit('onUserAdd', useraddr.value, (status, message) => add(status, message))
    } else {
        statuscomp.value = 'error'
        errorStatus.value = 'error'
        statusmsg.value = 'Please, enter valid address for user'
    }
}

let clear = () => {
    statusmsg.value = null
    statuscomp.value = 'init'
}
</script>