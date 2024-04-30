<template>
  <robo-account-polkadot-generate class="usersetup-generate" v-model:address="genaddress" v-model:json="genkey" v-model:password="genpassword" beforename="User" :aftergenerating="savekey" :beforegenerating="removeLocal">
      <template #link><robo-icon icon="wand-magic"/></template>
      <template #title>Create tech account for the user</template>
      <template #successmsg>User account has been set up. Remember to save your password and JSON file for future use. If everything is saved, close this popup to proceed.</template>
  </robo-account-polkadot-generate>

    <robo-grid offset="x05" gap="x05" columns="1">
      <robo-details v-if="showchoise" summarystyle="select" block class="userlist">
        <template #summary>Choose from uploaded keys</template>
        <robo-grid offset="x05" gap="x05" columns="1">
            <robo-grid type="flex" galign="stretch" valign="center" offset="x0" 
            v-for="(useritem,index) in userslist" :key="index">
              <div>
                <robo-text weight="bold" v-if="useritem.name">{{useritem.name}}</robo-text>
                <robo-text v-if="useritem.address">{{shortenAddress(useritem.address)}}</robo-text>
              </div>
              <robo-grid type="flex" valign="center" offset="x0" gap="x05" galign="end">
                <robo-button size="small" clean @click="addexistinguser(useritem.name, useritem.address)"><robo-icon icon="plus" /></robo-button>
                <robo-button type="error" size="small" clean @click="removeuserkey(useritem.address)"><robo-icon icon="trash" /></robo-button>
              </robo-grid>
            </robo-grid>

        </robo-grid>
      </robo-details>

      <robo-card v-if="ukey">
        <robo-grid type="flex" galign="stretch" valign="center" offset="x0">
          <div>
            <robo-text weight="bold" v-if="uname">{{uname}}</robo-text>
            <robo-text v-if="uaddress">{{shortenAddress(uaddress)}}</robo-text>
          </div>
          <div>
            <robo-button type="error" @click="removeLocal" size="small" clean><robo-icon icon="xmark"/></robo-button>
          </div>
        </robo-grid>
      </robo-card>

      <robo-card v-if="uploadedkey && !ukey" class="waitingforpass">
        <robo-grid type="flex" galign="stretch" valign="center" offset="x0">
          <div>
            <robo-text weight="bold" v-if="uploadedname">{{uploadedname}}</robo-text>
            <robo-text v-if="uploadedaddress">{{shortenAddress(uploadedaddress)}}</robo-text>
          </div>
          <div>
            <robo-button type="error" @click="removeLocal" size="small" clean><robo-icon icon="xmark"/></robo-button>
          </div>
        </robo-grid>
      </robo-card>

      <robo-file-upload v-if="!uploadedkey && !ukey" :onloadfunc="getkey" title="Upload user account key (json file)" drop>
        <template #label>
          <span v-if="!uaddress">Upload user account key e.g. 4cCPY...if9V.json</span>
          <span v-if="uaddress">Please, load missing key for {{shortenAddress(uaddress)}} or upload another account</span>
        </template>
      </robo-file-upload>

      <template v-if="needsave && uploadedkey && !ukey">
        <robo-input type="password" placeholder="Password for the key" v-model="upassword" />
        <robo-button block :disabled="!upassword" @click="savekey">Save</robo-button>
      </template>

      <robo-status v-if="errormsg && !ukey" type="error">{{errormsg}}</robo-status>
        
    </robo-grid>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupKey' }
</script>

<script setup>
import { ref, computed, onMounted, watch, isProxy } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import {isValidAddress, shortenAddress} from '../polkadot/tools'

const uploadedkey = ref(null)
const uploadedaddress = ref(null)
const uploadedname = ref(null)

const upassword = ref(null)
const errormsg = ref(null)
const allusers = ref([])
const needsave = ref(false)

const genaddress = ref(null)
const genkey = ref(null)
const genpassword = ref(null)

const activerws = computed( () => {
  return store.state.robonomicsUIvue.rws.list.find(rws => rws.owner === store.state.robonomicsUIvue.rws.active)
})

const uaddress = computed( () => {
  return activerws.value?.user || genaddress.value
})

const uname = computed( () => {
  return allusers.value.find(i => i.address === uaddress.value)?.name
})

const ukey = computed( () => {
  return allusers.value.find(i => i.address === uaddress.value)?.file || genkey.value
})

const userslist = computed( () => {
  return allusers.value
})

const validatekey = file => {
  try {
    return JSON.parse(file) && typeof JSON.parse(file)?.address === 'string' && JSON.parse(file)?.address !== '' && isValidAddress(JSON.parse(file)?.address)
  } catch (e) {
      return false
  }
}

const idbworkflow = (dbtable, mode, onsuccess) => {
  const IDB = window.indexedDB || window.webkitIndexedDB
  if(!IDB) { return }

  let db = null
  const DBOpenReq = IDB.open(store.state.robonomicsUIvue.rws.dbname, store.state.robonomicsUIvue.rws.dbver)
  
  DBOpenReq.addEventListener('error', err => {
    console.warn(err)
  })

  DBOpenReq.addEventListener('success', e => {
    db = e.target.result;

    if(db.objectStoreNames.contains(dbtable)) {
      let tx = db.transaction(dbtable, mode);
      tx.addEventListener('error', err => {
        console.warn(err)
      })
      const store = tx.objectStore(dbtable)
      onsuccess(store)
    }
  })


  DBOpenReq.addEventListener('upgradeneeded', (e) => {
    db = e.target.result
        
    const oldVersion = e.oldVersion
    const newVersion = e.newVersion || db.version
    console.log('DB updated from version', oldVersion, 'to', newVersion)

    if (!db.objectStoreNames.contains(dbtable)) {
      const objectStore = db.createObjectStore(dbtable, {keyPath: 'id', autoIncrement: true})
      objectStore.createIndex('addressIDX', 'address', { unique: true })
    }
         
  })
}

const getkey = file => {
  if(validatekey(file)) {
    uploadedkey.value = file
    uploadedaddress.value = JSON.parse(file)?.address
    uploadedname.value = JSON.parse(file)?.meta?.name
    needsave.value = true
    errormsg.value = null
  } else {
    errormsg.value = 'The key is not valid, here should be json file of existing ed25519 account'
  }
}

const encryptpass = async () => {
  const webcrypto = window.crypto.subtle || window.crypto.webkitSubtle

  if (!webcrypto) {
    console.error('Web Crypto API not supported')
    return
  }

  const ALGO_NAME = 'AES-GCM'
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const key = await webcrypto.generateKey(
    {
      name: ALGO_NAME,
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  )

  const enc = new TextEncoder()
  const passdata = enc.encode(upassword.value)
  
  const encryptedPass = await webcrypto.encrypt(
    {
      name: ALGO_NAME,
      iv
    },
    key,
    passdata
  )

  return {iv: iv, key: key, encryptedPass: encryptedPass}
}

const savekey = async () => {

  const addressbufer = uaddress.value || uploadedaddress.value || genaddress.value
  const namebufer = uname.value || uploadedname.value || 'User account ' + Date.now() 
  let keybufer = ukey.value || uploadedkey.value || genkey.value
  const password = upassword.value || genpassword.value
  const {iv, key, encryptedPass} = await encryptpass()

  if(isProxy(keybufer)) {
    keybufer = JSON.stringify(keybufer)
  }
  if( password && addressbufer && namebufer && keybufer && iv && key && encryptedPass) {
    
    idbworkflow('users', 'readwrite', table => {
        const request = table.add({
          address: addressbufer,
          name: namebufer,
          iv: iv,
          key: key,
          pass: encryptedPass,
          file: keybufer
        })
        request.onsuccess = () => {
          console.log('onsuccess')
          store.dispatch('rws/setUser', { rwsowner: store.state.robonomicsUIvue.rws.active, value: addressbufer })
          getkeysIDB()
          needsave.value = false
          uploadedaddress.value = null
          uploadedname.value = null
          uploadedkey.value = null
        }
        request.onerror = e => {
          console.log('onerror', e)
          if(e.target.error) {
            errormsg.value = e.target.error
          }
        }
      
    })
  }
}

const removeLocal = () => {
  store.dispatch('rws/deleteUser', { rwsowner: store.state.robonomicsUIvue.rws.active })
  activerws.value.user = null
  needsave.value = false
  uploadedkey.value = null
  uploadedaddress.value = null
  uploadedname.value = null  
  errormsg.value = null
}

const removeuserkey = (address) =>{
  // remove from idb
  idbworkflow('users', 'readwrite', store => {
    const addressIDX = store.index("addressIDX")
    const tx = addressIDX.openKeyCursor(IDBKeyRange.only(address))
    tx.addEventListener('success', e => {
      errormsg.value = null
      const cursor = e.target.result
      if (cursor) {
          store.delete(cursor.primaryKey)
          // cursor.continue()
      }
    })
    getkeysIDB()
  })
}

const getkeysIDB = () => {
  idbworkflow('users', 'readonly', store => {
    const addressIDX = store.index("addressIDX")
    allusers.value = []
    addressIDX.openCursor().addEventListener('success', e => {
        const cursor = e.target.result
        if(cursor){
          allusers.value.push({address: cursor.key, name: JSON.parse(cursor.value.file)?.meta?.name, file: cursor.value.file})
          cursor.continue()
        }
      })
  })
}

const addexistinguser = (name, address) => {
  store.dispatch('rws/setUser', { rwsowner: store.state.robonomicsUIvue.rws.active, value: address })
  document.querySelector('.userlist').open = false
}

const showchoise = computed(() => {
  let show = false

  if(allusers.value.length > 0) {
    show = true

    if(uaddress.value) {
      if(allusers.value.length === 1 && allusers.value[0].address === uaddress.value) {
        show = false
      }
    }
  }
  
  return show
})

onMounted( () => {
   getkeysIDB()
})
</script>

<style scoped>
.waitingforpass {
  opacity: 0.7;
}

.usersetup-generate {
  position: absolute;
  top: var(--robo-space);
  right: 0;
}
</style>