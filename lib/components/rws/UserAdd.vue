<template>
    <robo-section class="user" :disabled="status === 'loading'">
        <robo-grid type="flex" galign="stretch" gap="x1">
            <robo-grid type="flex" gap="x1">
                <robo-input-new class="useraddress" v-model="useraddress" placeholder="Account address" type="text" width="fit" view="line" />
                <robo-input-new v-model="userlabel" placeholder="Label (dapp only)" type="text" width="fit" view="line" />
            </robo-grid>

            <robo-button
                @click="adduser"
                clean
                size="small"
            >
                <robo-loader v-if="status === 'loading'"/>
                <robo-icon v-else icon="plus" />
            </robo-button>

        </robo-grid>

        <robo-status v-if="status === 'cancel' || status === 'error'" type="warning" solid class="status">
            <template v-if="status === 'cancel'">Adding of the user has been canceled</template>
            <template v-if="status === 'error'">{{message ?? 'Something went wrong during user adding'}}</template>
        </robo-status>
    </robo-section>
</template>

<script>
  export default { name: 'RoboRwsUserAdd' }
</script>

<script setup>
import { ref, computed, watch } from 'vue'
import { isValidAddress } from '../polkadot/tools'
import { encodeAddress } from '@polkadot/keyring'
import { dateGetRange } from '../../tools'

import { useStore } from 'vuex';
const store = useStore();

const status = ref('init');
const message = ref(null);
const useraddress = ref(null);
const userlabel = ref(null);
const emit = defineEmits(['onUserAdd']);

const users = computed( () => {
    return store.state.robonomicsUIvue?.rws?.users;
});

const expiration = computed( () => {
    return store.state.robonomicsUIvue.rws.expiredate;
});

const expiresin = computed( () => {
    return dateGetRange(expiration.value);
});

const add = (st, msg) => {
    status.value = st ?? 'init';
    message.value = msg ?? null;
}

const adduser = () => {
    status.value = 'loading';
    message.value = null;

    try{
        if(expiresin.value > 0) {
            status.value = 'error';
            message.value = 'Please, renew your subscription first';
            return;
        }

        if( useraddress.value && useraddress.value != '' && isValidAddress(useraddress.value) ) {
            useraddress.value = encodeAddress(useraddress.value, 32);

            if(users.value.includes(useraddress.value)) {
                status.value = 'error';
                message.value = 'This account is already has been added to the subscription';
                return;
            }

            emit('onUserAdd', useraddress.value, (status, message) => add(status, message));

            watch(users, v => {
                try {
                    /* assume that message 'user list updated' is in the list, no need here */
                    if(v.includes(useraddress.value)) {
                        
                        /* add label */
                        store.dispatch('rws/editUserListLabel', {address: useraddress.value, label: userlabel.value}).then(() => {
                            /* reset all */
                            status.value = 'init';
                            message.value = null;
                            useraddress.value = null;
                            userlabel.value = null;
                        });
                        
                    }
                } catch(e) {
                    console.log(e);
                }
            });

        } else {
            status.value = 'error';
            message.value = 'Please, enter valid address for user';
        }
    } catch(e) {
        console.log(e);
    }
}

watch(useraddress, () => {
    status.value = 'init';
    message.value = null;
});
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

    .status {
        margin-top: calc(var(--robo-space) * 0.5);
    }
</style>

<style>
    .useraddress {
        max-width: 200px;
    }
</style>