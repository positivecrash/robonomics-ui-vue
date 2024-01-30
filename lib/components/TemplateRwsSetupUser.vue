<template>
    <robo-section offset="x05" v-if="useraddress && statuscomp!=='removed'">
        <robo-card>
            <robo-grid type="flex" galign="stretch" valign="center" offset="x0">
                <div>
                    <!-- <robo-input v-model="temp" view="text-edit" fitcontent /> -->
                    <robo-text weigth="light-italic">
                        {{shortenAddress(useraddress)}}
                        <robo-copy :text="useraddress" />
                    </robo-text>
                </div>
                <robo-button-delete-approval :action="removeuser" v-if="statuscomp!=='loading'">Delete this user</robo-button-delete-approval>
                <robo-loader v-if="statuscomp==='loading'" />
            </robo-grid>
        </robo-card>
        <robo-status v-if="statuscomp==='removecancelled'" type="warning">The removal of the user has been canceled</robo-status>
    </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupUser' }
  /* TODO:
  обработку ошибок
  показ сообщений
  возможноть тегировать именами и сохранять это в локальном хранилище
   */
</script>

<script setup>
import { shortenAddress } from '../polkadot/tools'
import { defineEmits, ref } from 'vue'

const props = defineProps({
    useraddress: {
        type: String,
        default: null
    }
})

let statuscomp = ref('init')
const emit = defineEmits(['onUserDelete'])

let remove = (status, message) => {
    if(status === 'ok') {
        statuscomp.value = 'removed'
    }

    if(status === 'cancel') {
        statuscomp.value = 'removecancelled'

        setTimeout( () => {
            statuscomp.value = 'init'
        }, 3000)
    }
}

let removeuser = () => {
    statuscomp.value = 'loading'
    emit('onUserDelete', props.useraddress, (status, message) => remove(status, message))
}
</script>