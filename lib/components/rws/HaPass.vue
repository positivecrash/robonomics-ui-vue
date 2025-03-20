<template>
    <robo-text offset="x1" weight="normal-italic" size="small">
        To log in to the Home Assistant application via browser locally 
        (in the same network where your smart devices work) create or reset the password for your user. 
        Make sure this user has been added to the RWS subscription. 
        <robo-link href="https://www.home-assistant.io/getting-started/onboarding/">More info</robo-link>
    </robo-text>
    
    <template v-if="users">

        <robo-rws-user-signin />

        <form @submit.prevent="savepass" v-if="useraccount && userkey">
            <robo-grid gap="x05" columns="1">
                <div class="robo-hapass-line">
                    <robo-select 
                        v-model="useraccount" 
                        @change="reset" 
                        :options="shortennedusers" 
                        :values="users" 
                        label="Selected user" 
                        block 
                    />
                    <robo-copy v-if="status === 'ok'" :text="useraccount" />
                </div>

                <div class="robo-hapass-line">
                    <robo-input-new 
                        v-model="userpass"
                        @input="changed = true"
                        label="New password" 
                        type="password" 
                        width="wide" 
                    />
                    <robo-copy v-if="status === 'ok'" :text="userpass" />
                </div>

                <robo-button 
                    block
                    :disabled="!changed || status === 'process' || status === 'ok'"
                    :type="buttontype"
                >
                    <template v-if="status === 'process'"><robo-loader /> Saving</template>
                    <template v-if="status === 'init'">Save</template>
                    <template v-if="status === 'ok'">Saved</template>
                    <template v-if="status === 'error' || status === 'cancel'">Not saved</template>
                </robo-button>

                <robo-status v-if="msg" :type="errortype" offset="x1" solid>{{msg}}</robo-status>
            </robo-grid>
        </form>

    </template>
    <template v-else>
        <robo-status type="warning" solid>Add users to the subscription first</robo-status>
    </template>

</template>

<script>
  export default { name: 'RoboRwsHaPass' }
</script>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { shortenAddress, dateGetRange } from '../../tools';
import { useStore } from 'vuex';
const store = useStore();

const useraccount = ref(store.state.robonomicsUIvue.rws.user.account);
const userpass = ref(null);
const changed = ref(false);
const status = ref('init');
const msg = ref(null);

const emit = defineEmits(['onSaveHaPass']);

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users;
});

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key;
});

const expiration = computed( () => {
    return store.state.robonomicsUIvue.rws.expiredate;
});

const expiresin = computed( () => {
    return dateGetRange(expiration.value);
});

const shortennedusers = computed( () => {
    if(users.value) {
        return users.value.map(i => {
            return shortenAddress(i);
        })
    }
});

const reset = () => {
    changed.value = false;
    msg.value = null;
    status.value = 'init';
    userpass.value = null;
}

const savepass = () => {

    if(expiresin.value > 0) {
        status.value = 'error';
        msg.value = 'Please, renew your subscription first';
        return;
    }

    if(!userpass.value || userpass.value === '') {
        msg.value = 'Password can not be empty';
        status.value = 'error';
        return;
    }

    status.value = 'process';
    emit('onSaveHaPass', userpass.value, (savestatus, savemsg) => {

        if(savestatus === 'cancel' && !savemsg) {
            msg.value = 'The saving process has been canceled';
            return;
        }

        status.value = savestatus;
        msg.value = savemsg;

        // if(savestatus !== 'error') {
        //     setTimeout( () => {
        //         reset();
        //     }, 3000);
        // }
    });
}

const buttontype = computed( () => {
    return ({
      'error': 'error',
      'cancel': 'warning',
      'ok': 'ok',
    }[status.value] ?? 'primary');
});

const errortype = computed( () => {
  return ({
      'error': 'error',
      'ok': 'ok',
      'cancel': 'warning'
    }[status.value] ?? null);
});

onMounted( () => {

    watch(() => useraccount.value, v => {
        store.commit('rws/setUser', v);
        reset();
    });

    watch(() => store.state.robonomicsUIvue.rws.user.account, v => {
        useraccount.value = v;
        reset();
    });
})
</script>

<style scoped>
    .robo-hapass-line {
        position: relative;
        width: 100%;
    }

    .robo-hapass-line .robo-copy {
        position: absolute;
        right: calc(-1 * (var(--robo-font-size) + var(--robo-space) ));
        top: calc(50% - var(--robo-font-size)/2);
    }
</style>