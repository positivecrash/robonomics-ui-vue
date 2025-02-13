<template>
    <template v-if="rws?.length > 0">
      <robo-section width="narrow">
        <robo-text title="3" offset="x1">Saved subscription setups</robo-text>

        <robo-section offset="x1">
            <robo-text size="small" offset="x025" v-if="rws?.length > 1">Setup</robo-text>
            <robo-rws-setup-active-select />

            <robo-text size="small" offset="x025">Polkadot Ecosystem account
              <span v-if="store.state.robonomicsUIvue.polkadot.address && rwsEndDate">(<template v-if="isAdmin">admin role</template>
            <template v-if="!isAdmin && isUser">user role</template>
            <template v-if="!isAdmin && !isUser">not added</template>)</span>
            </robo-text> 
            <robo-account-polkadot
                short 
                extensionAllowShift
                extensionShowIcon
                selectable
                selectstyle
                selectblock
            />
        </robo-section>
    
        <robo-section>

            <robo-section card>
              <robo-rws-setup-active 
                :onUserDelete="onUserDelete" 
                :onUserAdd="onUserAdd" 
                :onControllerEdit="onControllerEdit"
                :onControllerRequest="onControllerRequest"
              />
            </robo-section>
        </robo-section>

        <robo-section offset="x3" v-if="rwsnotempty && users && users.length > 0">
            <robo-text title="3">Home assistant</robo-text>
            <robo-rws-ha-pass @on-save-ha-pass="onSaveHapass"/>
        </robo-section>
      </robo-section>
    </template>
    <template v-else>
        <robo-status type="warning" solid>You haven't added any setups yet</robo-status>
    </template>
</template>

<script>
  export default { name: 'RoboRwsSetup' }
</script>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { isAccountsIdentical } from '../../polkadot/tools';
import { useStore } from 'vuex';
const store = useStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({

    onUserDelete: {
        type: Function
    },
    onUserAdd: {
        type: Function
    },
    onSaveHapass: {
        type: Function
    },
    onControllerEdit: {
        type: Function
    },
    onControllerRequest: {
        type: Function
    },
})

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
})

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const activerws = computed( () => {
  return rws.value.find(item => item.owner === store.state.robonomicsUIvue.rws.active);
});

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

const isAdmin = computed ( () => {
  return isAccountsIdentical(store.state.robonomicsUIvue.polkadot.address, store.state.robonomicsUIvue.rws.active)
});

const isUser = computed ( () => {
    return users.value?.find(user => isAccountsIdentical(user, store.state.robonomicsUIvue.polkadot.address));
});

const labeledusers = computed(() => {
    store.dispatch('rws/findrws', active.value).then(index => {
        return rws.value[index].users
    })
})

const rwsuser = computed( () => {
    return store.state.robonomicsUIvue.rws.list.find(rws => rws.owner === store.state.robonomicsUIvue.rws.active)?.user
})

/* if !rwsEndDate -> no subscription */
const rwsEndDate = computed( () => {
  return store.state.robonomicsUIvue.rws.expiredate;
});

let rwsnotempty = ref(false)

let isrwsempty = () => {
    store.dispatch('rws/findrws', active.value).then(index => {
        if(index > -1 && rws.value[index].owner!=="" && rws.value[index].controller!=="") {
            rwsnotempty.value = true
        } else {
            rwsnotempty.value = false
        }
    })
}

const errormsg = ref(null)
const upload = uploaded => {

  errormsg.value = null

  store.dispatch('rws/import', uploaded).then( e => {
    if(e) {
      router.push(store.state.robonomicsUIvue.rws.links.setup)
    } else {
      errormsg.value = 'Something went wrong while uploading'
    }
  })
}

const noSetupForActive = computed( () => {
  if(rws.value.findIndex(item => item.owner === active.value) === -1) {
    return true
  } else {
    return false
  } 
})

onMounted( () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    isrwsempty()

    watch(rws.value, () => {
        isrwsempty();
    })

    watch(() => active.value, () => {
        isrwsempty();
    })

})

</script>