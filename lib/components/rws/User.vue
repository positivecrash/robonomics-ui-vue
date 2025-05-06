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

        <robo-status v-if="status === 'cancel' || status === 'error'" type="warning" solid>
            <template v-if="status === 'cancel'">The removal of the user has been canceled</template>
            <template v-else>{{statusmsg ?? 'Something went wrong during user removing'}}</template>
        </robo-status>

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
import { dateGetRange } from '../../tools'

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

const expiration = computed( () => {
    return store.state.robonomicsUIvue.rws.expiredate;
});

const expiresin = computed( () => {
    return dateGetRange(expiration.value);
});

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

    if(expiresin.value > 0) {
        status.value = 'error';
        statusmsg.value = 'Please, renew your subscription first';
        return;
    }

    status.value = 'loading';
    emit('onUserDelete', props.useraddress, (status, message) => remove(status, message))
}


/* + LABEL */
const userlabel = ref('');

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list;
});

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active;
});

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
});

const labeledit = (save) => {

    store.dispatch('rws/editUserListLabel', {address: props.useraddress, label: userlabel.value}).then(result => {
        if(result) {
            save('ok');
        } else {
            save('error');
        }
    });
}

const initlabel = async () => {
    // Ищем индекс текущего сетапа
    const index = await store.dispatch('rws/findSetupIndex', active.value);

    if (index > -1) {
        const setup = rws.value[index];
        
        if (setup?.users) {
            // Ищем пользователя в списке users по адресу
            const finduser = setup.users.findIndex(user => user.address === props.useraddress);

            if (finduser > -1) {
                userlabel.value = setup.users[finduser].label;
            }
        }
    }
};

watch([() => active.value, () => users.value], () => {
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