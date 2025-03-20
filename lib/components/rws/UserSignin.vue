<template>
    <robo-text v-if="checking" align="center"><robo-loader size="3" /></robo-text>
    <template v-else>
        <template v-if="!users || users?.length < 1">
            <robo-status type="warning" offset="x05">No accounts found in the subscription</robo-status>
            <robo-button :router="store.state.robonomicsUIvue.rws.links.setup" size="small" block>
                <robo-icon icon="pencil" />
                <span>Got to setup</span>
            </robo-button>
        </template>

        <form v-if="users?.length > 0 && !userkey" @submit.prevent="signin" class="signin">
        <!-- <form v-if="users?.length > 0 && (!useraccount || !userkey)" @submit.prevent="signin" class="signin"> -->

            <robo-grid gap="x025" columns="1">
                <!-- <robo-status type="warning" solid>Please sign in with a user account first</robo-status> -->

                <robo-select 
                    v-model="useraccount"
                    @change="errormsg = null" 
                    :options="shortennedusers" 
                    :values="users" 
                    label="Select a user" 
                    block 
                />

                <robo-input-new 
                    v-model="userseed"
                    :disabled="useraccount && userkey" 
                    @input="errormsg = null"
                    type="password" 
                    placeholder="Seed phrase for encryption" 
                    label="Pass phrase" 
                    width="wide" 
                />
                
                <robo-text v-if="useraccount && userkey" weight="bold" size="small">Your key has been already saved locally, you may sign in</robo-text>
                
                <robo-grid v-if="webcrypto" type="flex" galign="start" gap="x05" offset="x1">
                    <robo-input type="checkbox" id="keepsigned" v-model="keepsigned" /> 
                    <label for="keepsigned">Keep me signed in (only for trusted devices)</label>
                </robo-grid>

                <robo-button block>Sign in</robo-button>

                <robo-status v-if="errormsg" type="error" solid>{{errormsg}}</robo-status>
            </robo-grid>

        </form>
    </template>
</template>

<script>
  export default { name: 'RoboRwsUserSignin' }
</script>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {encodeAddress, mnemonicValidate} from "@polkadot/util-crypto"
import { getpair } from '../polkadot/tools'
import { shortenAddress } from '../../tools'
import { IDBworkflow, IDBgettable, decrypt } from '../../idb'

import { useStore } from 'vuex';
const store = useStore();

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users;
});

const shortennedusers = computed( () => {
    if(users.value) {
        return users.value.map(i => {
            return shortenAddress(i);
        })
    }
});

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key;
});

const acctype = 'ed25519';
const useraccount = ref(null); // v-model for select
const userseed = ref(null); // v-model for input to put seed in
const errormsg = ref(null);
const keepsigned = ref(false);
const webcrypto = ref(window.crypto.subtle || window.crypto.webkitSubtle);
const checking = ref(false);

const getinfo = async (user) => {
    let savedusers = [];
    savedusers = await IDBgettable('dbrws', 1, 'dbrwsuser', {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}]);
    const index = savedusers.findIndex(i => i.user === user);

    if(index !== -1) {
        const pair = await decrypt(savedusers[index].iv, savedusers[index].key, savedusers[index].pair);
        store.commit('rws/setUserKey', pair);
    } else {
        resetuserkey();
    }
}

const resetuser = () => {
    store.commit('rws/removeUser');
    checking.value = false;
    // if(users.value.length > 0) {
    //     useraccount.value = users.value[0];
    // } else {
    //     useraccount.value = null;
    // }
}

const resetuserkey = () => {
    store.commit('rws/setUserKey', null);
}

const checkkeys = async () => {

    if(users.value?.length < 1) {
        resetuser();
        checking.value = false;
        return;
    }

    if(!webcrypto.value || !useraccount.value){
        resetuserkey();
        checking.value = false;
        return;
    }

    if(useraccount.value) {

        store.commit('rws/setUser', useraccount.value);
        
        /* проверка есть ли такой аккаунт в подписке */
        if(!users.value.find(i => i === useraccount.value)) {
            resetuser();
            checking.value = false;
            return;
        }

        await getinfo(useraccount.value);
        checking.value = false;
        return;
    }
}



const encryptkey = async keytosave => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const key = await webcrypto.value.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  )

  const enc = new TextEncoder()
  const keytosaveenc = enc.encode(JSON.stringify(keytosave))
  
  const encryptedKey = await webcrypto.value.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    keytosaveenc
  )

  return {iv: iv, key: key, encryptedPair: encryptedKey}
}

const idbchanged = () => {
    const bc = new BroadcastChannel('IDBUser')
    bc.postMessage('changed')
    bc.close()
}

const signin = async () => {
    errormsg.value = null;

    if(!useraccount.value || !userseed.value) {
        errormsg.value = 'Please, enter user address & pass phrase';
        return;
    }

    try {
        const pair = await getpair(userseed.value, acctype);
        const addedaccount = encodeAddress(pair.publicKey);

        if(addedaccount !== encodeAddress(useraccount.value)) {
            errormsg.value = 'The entered pass phrase does not match the user address';
            return;
        }

        store.commit('rws/setUser', useraccount.value);
        store.commit('rws/setUserKey', pair);

        if(webcrypto.value) {
            if(!keepsigned.value) {
                /* remove from db */
                IDBworkflow('dbrws', 1, 'dbrwsuser', 'readwrite', store => {
                    const request = store.delete(useraccount.value);

                    request.onsuccess = () => {
                        idbchanged();
                    }

                }, {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}]);
            } else {
                /* save to db */
                const {iv, key, encryptedPair} = await encryptkey(pair);

                let objtosave = {};
                objtosave.user = useraccount.value;
                objtosave.iv = iv;
                objtosave.key = key;
                objtosave.pair = encryptedPair;

                try {
                    IDBworkflow('dbrws', 1, 'dbrwsuser', 'readwrite', store => {
                        const request = store.put(objtosave);

                        request.onsuccess = () => {
                            idbchanged();
                        }

                        request.onerror = e => {
                            if(e.target.error) {
                                errormsg.value = e.target.error;
                            }
                        }
                    }, {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])
                } catch(e) {
                    console.log(e);
                    errormsg.value = e
                }
            }
        }

    } catch(e) {
        console.log(e);
        errormsg.value = e;
        return;
    }

}

watch(() => store.state.robonomicsUIvue.rws.user.account, v => {
    useraccount.value = v;
}, {immediate: true});


watch(() => useraccount.value, async (v) => {

    checking.value = true;

    if(!v) {
        resetuser();
        return;
    }

    resetuserkey();
    await checkkeys();

}, {immediate: true});


watch(() => users.value, () =>{
    if(!users.value.find(i => i === useraccount.value)) {
        resetuser();
    }
}, {immediate: true});

watch( () => userkey.value, (v) => {
    if(v) {
        userseed.value = null;
    }
}, {immediate: true});

onMounted(async () => {
    const bc = new BroadcastChannel('IDBUser');
    bc.onmessage = async(e) => {
        if(e.data === 'changed') {
            await checkkeys();
        }
    };
});

</script>

<style scoped>
    .signin {
        width: 100%;
    }
</style>