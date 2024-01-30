<template>
    <robo-grid offset="x0" gap="x05" columns="1">
        <robo-input label="User (technical account, no tokens required)" v-model="user" required />
        <robo-input label="User's seed phrase" v-model="userseed" required type="password" />
        <robo-input label="New password" type="password" v-model="passresult" @input="changeWatch" />
        <robo-button 
            :disabled="!changed" 
            @click.prevent="saveData"
            :type="buttontype"
        >
            <template v-if="statuscomp === 'process'"><robo-loader /> Saving the password</template>
            <template v-if="statuscomp === 'init'">Create password</template>
            <template v-if="statuscomp === 'ok'">Password saved</template>
            <template v-if="statuscomp === 'error' || statuscomp === 'cancel'">Password not saved</template>
        </robo-button>

        <robo-status v-if="msgcomp" :type="errortype" offset="x1">{{msgcomp}}</robo-status>
    </robo-grid>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupHaPass' }
</script>

<script setup>
import { computed, ref, onMounted, watch, defineEmits } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    hapass: {
        type: String
    }
})

const user = ref(null)
const userseed = ref(null)
const passresult = ref(null)
const passsaved = ref(null)
const changed = ref(false)
const statuscomp = ref('init')
const msgcomp = ref(null)
const emit = defineEmits(['onSaveHaPass'])

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
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
    emit('onSaveHaPass', user.value, userseed.value, passresult.value, (savestatus, msg) => responsePass(savestatus, msg))

    // store.dispatch('rws/findrws', active.value).then(index => {
    //     if(index > -1) {
    //         activeuser.value = store.state.robonomicsUIvue.rws.list[index].user
    //         if(activeuser.value) {
    //             statuscomp.value = 'process'
    //             emit('onSaveHaPass', activeuser.value, passresult.value, (savestatus, msg) => responsePass(savestatus, msg))
    //         } else {
    //             msgcomp.value = 'User not found'
    //             statuscomp.value = 'error'
    //         }
    //     }
    // })
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
})
</script>