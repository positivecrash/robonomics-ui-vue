<template>
    
</template>

<script>
  export default { name: 'RoboSignIn' }
</script>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import {IDBgettable, decrypt} from '../idb';

import { useStore } from 'vuex';
const store = useStore();

// const needsignin = ref(store.state.robonomicsUIvue.rws.user.needsignin);
const webcrypto = ref(window.crypto.subtle || window.crypto.webkitSubtle);
const savedusers = ref(null);

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users;
});

const useraccount = computed( () => {
    return store.state.robonomicsUIvue.rws.user.account;
});
  
const userkey = computed( () => {
    return store.state.robonomicsUIvue.rws.user.key;
});

const getKeyFromdb = async () => {
    savedusers.value = await IDBgettable('dbrws', 1, 'dbrwsuser', {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}]);

    if(savedusers.value.length > 0) {
         const waitkeys = new Promise((resolve, reject) => {
            savedusers.value.forEach(async (e, i, a) => {
                if(e.user === useraccount.value){
                    const pair = await decrypt(e.iv, e.key, e.pair);
                    store.commit('rws/setUserKey', pair);
                    resolve();
                }
                if(i === a.length-1) {
                    reject();
                }
            })
        })

        waitkeys.then(() => {
            store.commit('rws/setUserNeedsignin', 'n' );
        }).catch( () => {
            store.commit('rws/setUserNeedsignin', 'y' );
        })
    } else {
        store.commit('rws/setUserNeedsignin', 'y' );
    }
    
}

const inituser = async () => {

    if(users.value && users.value.length > 0) {

        store.commit('rws/setUserNeedsignin', 'w' );

        if(useraccount.value === '' && userkey.value === '') {
            store.commit('rws/setUserNeedsignin', 'y' );
            return;
        }

        if(useraccount.value && userkey.value === '') {
            if(!webcrypto.value) {
                store.commit('rws/setUserNeedsignin', 'y' );
            } else{
                await getKeyFromdb();
            }
            return
        }

        if(useraccount.value && userkey.value) {
            /* проверка есть ли такой аккаунт в подписке */
            if(!users.value.find(i => i === useraccount.value)) {
                store.commit('rws/setUser', '' );
                store.commit('rws/setUserKey', '' );
                store.commit('rws/setUserNeedsignin', 'y' );
                return;
            } else{
                store.commit('rws/setUserNeedsignin', 'n' );
            }
        }
    }
}

onMounted( async () => {
  await inituser();

  watch(() => users.value, async () => {
      await inituser();
  });

  watch(() => useraccount.value, async() => {
      await inituser();
  });

  watch(() => userkey.value, async() => {
      await inituser();
  });
})
</script>