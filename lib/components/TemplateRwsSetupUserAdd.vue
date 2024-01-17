<template>
    <robo-grid columns="auto 60px" offset="x0" gap="x1">
        <robo-input v-model="useraddr" label="New user" block placeholder="Polkadot address (ed25519)" @input="clear" />
        <robo-button @click.prevent="adduser" size="small" :loading="statuscomp==='loading'" :type="buttontype">
            <robo-icon icon="plus" v-if="statuscomp==='init'" />
            <robo-icon icon="check" v-if="statuscomp==='added'" />
            <robo-icon icon="bolt" v-if="statuscomp==='error'" />
        </robo-button>
        <robo-status v-if="statuscomp==='error' && statusmsg" type="error">{{statusmsg}}</robo-status>
    </robo-grid>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupUserAdd' }
</script>

<script setup>
import { defineEmits, ref, computed } from 'vue'

const statuscomp = ref('init')
const statusmsg = ref(null)
const useraddr = ref(null)
const emit = defineEmits(['onUserAdd'])

const buttontype = computed( () => {
    
    if( statuscomp.value === 'error') {
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
    }

    if(status === 'error') {
        statuscomp.value = 'error'
        statusmsg.value = 'Something went wrong, user was not added'
    }

    setTimeout(() => {
        clear()

        if(status === 'ok') {
            useraddr.value = null
        }
    }, 3000)
}

let adduser = () => {
    statuscomp.value = 'loading'
    statusmsg.value = null

    if( useraddr.value ) {
        emit('onUserAdd', useraddr.value, (status, message) => add(status, message))
    } else {
        statuscomp.value = 'error'
        statusmsg.value = 'Please, enter the address for user'

        setTimeout(() => {
            clear()
        }, 3000)
    }
}

let clear = () => {
    statusmsg.value = null
    statuscomp.value = 'init'
}
</script>