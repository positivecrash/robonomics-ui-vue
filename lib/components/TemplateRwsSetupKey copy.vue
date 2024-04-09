<template>
    <robo-grid offset="x05" gap="x05" columns="1">

      <robo-file-upload v-if="!useraddress" :onloadfunc="saveuser" title="Upload user account key (json file)" drop>
        <template #label>Upload user account key e.g. 4cCPY...if9V.json</template>
      </robo-file-upload>

      <robo-card v-if="useraddress">
        <robo-text weight="bold" v-if="username">{{username}}</robo-text>
        <robo-text v-if="useraddress">{{useraddress}}</robo-text>
      </robo-card>

      <template v-if="uservalid">
        <robo-input type="password" placeholder="Password for the key" v-model="pass" />
        <robo-button block>Add</robo-button>
      </template>
        
    </robo-grid>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupKey' }
</script>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const pass = ref(null)
const userkey = ref(null)

const uservalid = computed(() => {
  try {
    return JSON.parse(userkey.value) && typeof JSON.parse(userkey.value)?.address === 'string' && JSON.parse(userkey.value)?.address !== ''
  } catch (e) {
      return false
  }
})

const useraddress = computed( () => {
  if(uservalid.value) {
    return JSON.parse(userkey.value)?.address
  }
})

const username = computed( () => {
  if(uservalid.value) {
    return JSON.parse(userkey.value)?.meta?.name
  }
})

const saveuser = async (json) => {
  
    userkey.value = json

    if(uservalid.value && useraddress.value) {
      
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
        const passdata = enc.encode(pass.value)
        
        const encryptedData = await webcrypto.encrypt(
          {
            name: ALGO_NAME,
            iv
          },
          key,
          passdata
        )

        // await webcrypto.decrypt(
        //   {
        //       name: ALGO_NAME,
        //       iv
        //     },
        //     key,
        //     encryptedData
        // )
        // .then(function(decrypted){
        //     const decoder = new TextDecoder()
        //     console.log(decoder.decode(decrypted));
        // })
        // .catch(function(err){
        //     console.error(err);
        // })
    
      
      const IDB = window.indexedDB || window.webkitIndexedDB

      if(!IDB) {
        console.error('indexedDB not supported')
        return
      }

      const userdbname = 'users'
      const dbname = 'rwsdb'
      let db = null
      let objectStore = null
      let DBOpenReq = IDB.open(dbname, 1)

      DBOpenReq.addEventListener('error', (err) => {
        //Error occurred while trying to open DB
        console.warn('DBOpenReq error', err);
      });

      DBOpenReq.addEventListener('success', (ev) => {
        //DB has been opened... after upgradeneeded
        db = ev.target.result;
        console.log('DBOpenReq success', db, db.objectStoreNames);

        if(db.objectStoreNames.contains(userdbname)) {

          // GET ALL ADDRESSSES
          const tx2 = db.transaction(userdbname, 'readonly')
          const obj = tx2.objectStore(userdbname)

          const addressIDX = obj.index("addressIDX")
          addressIDX.openCursor().addEventListener('success', e => {
            const cursor = event.target.result
            if(cursor){ 
              console.log('index', cursor)
              cursor.continue()
            }
          })
          // ++


          // JUST GET
          // const tx2 = db.transaction(userdbname, 'readonly')
          // const obj = tx2.objectStore(userdbname)
          // const req = obj.get(1)

          // req.addEventListener('error', e => {
          //   console.log('get address', e)
          // })

          // req.addEventListener('success', e => {
          //   console.log('get success', e)
          // })
          // ++

          // ADD
          // let tx = db.transaction(userdbname, 'readwrite');
          // tx.onerror = (err) => {
          //   console.warn('tx onerror', err);
          // };

          // tx.oncomplete = (ev) => {
          //   console.log('tx oncomplete', ev);
          // };

          // let store = tx.objectStore(userdbname)
          // let request = store.add({address: useraddress.value, iv: iv, key: key, pass: encryptedData, file: json})

          // request.onsuccess = (ev) => {
          //   console.log('successfully added an object');
          // };
          // request.onerror = (err) => {
          //   console.log('error in request to add', err);
          // };
          // ++
        }

        
      });

      DBOpenReq.addEventListener('upgradeneeded', (ev) => {
        console.log('DBOpenReq upgradeneeded')
        //first time opening this DB
        //OR a new version was passed into open()
        db = ev.target.result;
        
        let oldVersion = ev.oldVersion;
        let newVersion = ev.newVersion || db.version;
        console.log('DB updated from version', oldVersion, 'to', newVersion);
        console.log('upgrade', db);

        if (!db.objectStoreNames.contains(userdbname)) {
          console.log('!db.objectStoreNames.contains(userdbname)')
          objectStore = db.createObjectStore(userdbname, {keyPath: 'id', autoIncrement: true})
          objectStore.createIndex('addressIDX', 'address', { unique: true })
        }
         
      });

  }
}
</script>

<style scoped>
</style>