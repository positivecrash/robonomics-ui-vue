<template>
    <template v-if="!users || users.length < 1">
        <robo-text title="3">Almost there...</robo-text>
        <robo-text offset="x1" size="small">You need to add users in the subscription, wich accounts can see and control subscription's smart panel.</robo-text>
        <robo-button :router="store.state.robonomicsUIvue.rws.links.setup" size="small">
            <robo-icon icon="user" />
            <robo-text>Add users</robo-text>
        </robo-button>
    </template>
    <form v-else @submit.prevent="signin">
        <robo-grid offset="x0" gap="x025" columns="1">
            <div>
                <robo-text title="3">Almost there...</robo-text>
                <robo-text offset="x1" size="small">For the datalog decryption we need the key of the user added in the subscription.</robo-text>
            </div>
            <robo-select v-model="useraccount" @change="errormsg = null" :options="shortennedusers" :values="users" label="Select a user" block />
            <robo-input :disabled="pairdb" v-model="userseed" @input="errormsg = null" type="password" placeholder="The mnemonic phrase for the account" label="Pass phrase" block />
            <robo-text v-if="pairdb" weight="bold" size="small">Your key has been already saved locally, you may sign in</robo-text>
            <robo-grid v-if="webcrypto" type="flex" galign="start" gap="x05" offset="x1">
                <robo-input type="checkbox" id="keepsigned" v-model="keepsigned" /> 
                <label for="keepsigned">Keep me signed in (only for trusted devices)</label>
            </robo-grid>
            <!-- <robo-select v-if="webcryptosupport" label="Keep me signed in (only for trusted devices)" v-model="expire" :options="expireoptions" :values="expireoptions" block /> -->
            <robo-button block>Sign in</robo-button>
            <robo-status v-if="errormsg" type="error">{{errormsg}}</robo-status>
        </robo-grid>
    </form>
</template>

<script>
  export default { name: 'RoboRwsUserSignin' }
</script>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {ed25519PairFromSeed, mnemonicToMiniSecret, encodeAddress, mnemonicValidate} from "@polkadot/util-crypto"
import { shortenAddress } from '../polkadot/tools'
import { dateGetString } from '../tools'
import { IDBworkflow, IDBgettable, decrypt } from '../idb'
import { useStore } from 'vuex'
const store = useStore()

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

const shortennedusers = computed( () => {
    return users.value.map(i => {
        return shortenAddress(i)
    })
})

const useraccount = ref(store.state.robonomicsUIvue.rws.user.account)
const userseed = ref(null)
const errormsg = ref(null)
const keepsigned = ref(false)
const savedusers = ref(false)

const webcrypto = ref(window.crypto.subtle || window.crypto.webkitSubtle)
// const expireoptions = ['Never', '1 day', '1 month', '1 year']
// const expire = ref('1 month')

// const getexpiredate = expireson => {
//     const day = 24 * 3600 * 1000
//     const dateexp =  ({
//       '1 day': day,
//       '1 month': day * 30,
//       '1 year': day * 365,
//     }[expireson] ?? 0)
//     return Date.now() + dateexp
// }

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key
})

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
    errormsg.value = null

    if(!useraccount.value || (!userseed.value && !pairdb.value)) {
        errormsg.value = 'Please, enter user address & pass phrase'
        return
    }

    if(userseed.value){
        if(!mnemonicValidate(userseed.value)) {
            errormsg.value = 'Please, enter a correct pass phrase'
            return
        }
    }

    let seed = null
    let pair = null
    let addedaccount = null

    if(!pairdb.value){
        try {
            seed = mnemonicToMiniSecret(userseed.value)
            pair = ed25519PairFromSeed(seed)
            addedaccount = encodeAddress(pair.publicKey)
        } catch(e) {
            errormsg.value = e
            return
        }

        if(encodeAddress(addedaccount) !== encodeAddress(useraccount.value)) {

            errormsg.value = "This pass phrase doesn't match to user account or you are trying to add not ed25519 key"
            return
            // useraccount.value = ''
            // users.value.forEach(i => {
            //     if(encodeAddress(addedaccount) === encodeAddress(i)) {
            //         useraccount.value = i
            //     }
            // })
            // if(useraccount.value === '') {
            //     errormsg.value = 'There is no user in the subscription matching with this pass phrase or you are trying to add not ed25519 key'
            //     return
            // }
        }
    } else {
        pair = pairdb.value
    }
    

    store.commit('rws/setUser', useraccount.value)
    store.commit('rws/setUserKey', pair)

    if(webcrypto.value && keepsigned.value) {
        // const setexpire = getexpiredate(expire.value)
        // console.log('setexpire',setexpire, dateGetString(setexpire))
        const {iv, key, encryptedPair} = await encryptkey(pair)

        let objtosave = {}
        objtosave.user = useraccount.value
        objtosave.iv = iv
        objtosave.key = key
        objtosave.pair = encryptedPair

        try {
            IDBworkflow('dbrws', 1, 'dbrwsuser', 'readwrite', store => {
                const request = store.put(objtosave)

                request.onsuccess = () => {
                    idbchanged()
                }

                request.onerror = e => {
                    if(e.target.error) {
                        errormsg.value = e.target.error
                    }
                }
            }, {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])
        } catch(e) {
            errormsg.value = e
        }
    }

    if(webcrypto.value && !keepsigned.value && pairdb.value) {
        IDBworkflow('dbrws', 1, 'dbrwsuser', 'readwrite', store => {
            const request = store.delete(useraccount.value)

            request.onsuccess = () => {
                idbchanged()
            }

            request.onerror = e => {
                if(e.target.error) {
                    errormsg.value = e.target.error
                }
            }
        }, {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])
    }
}

const pairdb = ref(null)

const checkKeys = async () => {
    if(webcrypto.value){
        const savedusers = await IDBgettable('dbrws', 1, 'dbrwsuser', {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])

        savedusers.forEach(async (e) => {
            if(e.user === useraccount.value){
                const pair = await decrypt(e.iv, e.key, e.pair, true)
                pairdb.value = pair
                console.log(pairdb.value.publicKey)
            }
        })
    }
}

onMounted(async () => {

    await checkKeys()

    watch(() => useraccount.value, async () =>{
        pairdb.value = null
        await checkKeys()
    })

    watch(() => users.value, () =>{
        useraccount.value = ''
        store.commit('rws/setUser', useraccount.value)
    })
})
</script>