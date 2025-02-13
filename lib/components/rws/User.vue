<template>
    <robo-section class="user" v-if="useraddress && status!=='removed'" :disabled="status === 'loading'">
        <robo-grid type="flex" galign="stretch" gap="x1">
            <robo-grid type="flex" gap="x1">
                <robo-text nowrap>
                    {{shortenAddress(useraddress)}}
                    <robo-copy :text="useraddress" />
                </robo-text>

                <robo-input-new v-model="userlabel" placeholder="Label (dapp only)" type="text" width="fit" view="line" edit @on-edit="labeledit" />
            </robo-grid>

            <robo-button-approve 
                v-if="isAdmin" 
                @click-approve="removeuser" 
                :approvetext="`Delete account from the subscription? <br/> <span class='robo-longline'>${useraddress}</span>`" 
                approvebuttontext="Remove"
                clean 
                type="error" 
                size="small"
            >
                <robo-loader v-if="status === 'loading'"/>
                <robo-icon v-else icon="trash" />
            </robo-button-approve>

        </robo-grid>

        <robo-status v-if="status === 'cancel'" type="warning" solid>The removal of the user has been canceled</robo-status>
        <robo-status v-if="status === 'error'" type="error" solid>{{msg ?? 'Something went wrong during user removing'}}</robo-status>
    </robo-section>
</template>

<script>
  export default { name: 'RoboRwsUser' }
</script>

<script setup>
import { shortenAddress } from '../../tools'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    useraddress: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
})

const status = ref('init')
const statusmsg = ref(null)
const emit = defineEmits(['onUserDelete'])

const remove = (st, msg) => {

    if(st ==='ok') {
        status.value = 'removed';
        statusmsg.value = null;
    } else {
        status.value = st;
        statusmsg.value = msg ?? null;
    }

}

const removeuser = () => {
    status.value = 'loading'
    emit('onUserDelete', props.useraddress, (status, message) => remove(status, message))
}


/* + LABEL */
const userlabel = ref('');

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list;
})

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active;
})

const labeledit = (save) => {

    console.log('labeledit pressed')

    store.dispatch('rws/editUserListLabel', {address: props.useraddress, label: userlabel.value}).then(result => {
        if(result) {
            save('ok');
        } else {
            save('error');
        }
    });
}

const initlabel = () => {
    store.dispatch('rws/findrws', active.value).then(index => {
        if(index > -1) {
            if(rws.value[index]?.users) {
                const finduser = rws.value[index].users.map(item => item.address).indexOf(props.useraddress);
                if(finduser > -1) {
                    userlabel.value = rws.value[index].users[finduser].label
                }
            }
        }
    })
}

watch(() => active.value, () => {
    initlabel();
}, { immediate: true });
/* - LABEL */
</script>

<style scoped>
    .user {
        padding: var(--robo-space) calc(var(--robo-space) * .5);
        transition: 0.2s all ease-out;
        border-radius: 4px;
    }

    .user:hover {
        /* font-size: 110%;
        font-weight: bold; */
        box-shadow: 0 1px 4px var(--robo-color-light-90);
    }
</style>