<template>
    <robo-grid offset="x0" gap="x05" columns="1">
        <template v-if="users">
            <robo-rws-user-signin v-if="needsignin === 'y'" />
            <template v-if="needsignin === 'n'">
                <robo-select v-model="useraccount" @change="msgcomp = null" :options="shortennedusers" :values="users" label="Selected user" block />
                <robo-input label="New password" type="password" v-model="passresult" @input="changeWatch" />
                <robo-button 
                    :disabled="!changed" 
                    @click.prevent="saveData"
                    :type="buttontype"
                >
                    <template v-if="statuscomp === 'process'"><robo-loader /> Saving</template>
                    <template v-if="statuscomp === 'init'">Save</template>
                    <template v-if="statuscomp === 'ok'">Saved</template>
                    <template v-if="statuscomp === 'error' || statuscomp === 'cancel'">Not saved</template>
                </robo-button>

                <robo-status v-if="msgcomp" :type="errortype" offset="x1">{{msgcomp}}</robo-status>
            </template>
        </template>
        <template v-else>
            <robo-status type="warning">Add users to the subscription first</robo-status>
        </template>

    </robo-grid>

    <RoboSignIn />
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupHaPass' }
</script>

<script setup>
import { computed, ref, onMounted, watch, defineEmits } from 'vue'
import RoboSignIn from '../components/SignIn.vue'
import { shortenAddress } from '../polkadot/tools'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    hapass: {
        type: String
    }
})

// const needsignin = ref(null)
const useraccount = ref(store.state.robonomicsUIvue.rws.user.account);
const passresult = ref(null)
const passsaved = ref(null)
const changed = ref(false)
const statuscomp = ref('init')
const msgcomp = ref(null)
const emit = defineEmits(['onSaveHaPass'])

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
})

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

const shortenusers = computed( () => {
    return store.state.robonomicsUIvue.rws.users.map(e => shortenAddress(e))
})

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key
})

const needsignin = computed( () => {
    return store.state.robonomicsUIvue.rws.user.needsignin;
})

const shortennedusers = computed( () => {
    if(users.value) {
        return users.value.map(i => {
            return shortenAddress(i)
        })
    }
})

let changeWatch = () => {
    changed.value = passresult.value !== passsaved.value
}

let responsePass = (savestatus, msg) => {

    statuscomp.value = savestatus
    msgcomp.value = msg

    if(savestatus !== 'error') {
        // убираем сообщения и статус дляуспешного сохранения или отмены через какое-то время
        setTimeout( () => {
            statuscomp.value = 'init'
            changed.value = false
        }, 3000)
    }

    if(savestatus === 'cancel' && !msg) {
        msgcomp.value = 'The saving process has been canceled'
    }
}

let saveData = () => {

    if(!passresult.value || passresult.value === '') {
        msgcomp.value = 'Password can not be empty'
        statuscomp.value = 'error'
        return
    }

    statuscomp.value = 'process'
    emit('onSaveHaPass', passresult.value, (savestatus, msg) => responsePass(savestatus, msg))
}

const buttontype = computed( () => {
    
    if( statuscomp.value === 'error' || statuscomp.value === 'cancel') {
        return 'error'
    }

    if( statuscomp.value === 'ok') {
        return 'ok'
    }

    return 'primary'
})

let clean = () => {
    statuscomp.value = 'init'
    msgcomp.value = null
}

const errortype = computed( () => {
  return getErrorType(statuscomp.value)
})

const getErrorType = (statuscomp) => {
    return ({
      'error': 'error',
      'ok': 'ok',
      'cancel': 'warning'
    }[statuscomp] ?? null)
}

onMounted( () => {
    watch(() => changed.value, () => {
      clean()
    })

    watch(() => passresult.value, () => {
      clean()
    })

    watch(() => useraccount.value, value => {
        store.commit('rws/setUser', value);
    });

    watch(() => store.state.robonomicsUIvue.rws.user.account, value => {
        useraccount.value = value;
    });
})
</script>