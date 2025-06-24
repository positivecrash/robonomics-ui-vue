<template>
    <template v-if="rws?.length > 0">
      <robo-section width="narrow" centered>
        <robo-text title="3" offset="x1">Saved subscription setups</robo-text>

        <robo-section offset="x1">
            <robo-text size="small" offset="x025" v-if="rws?.length > 1">Added setups</robo-text>
            <robo-rws-setup-active-select />

            <robo-text size="small" offset="x025">
              <template v-if="store.state.robonomicsUIvue.polkadot.connection.network"><span class="networkname">{{store.state.robonomicsUIvue.polkadot.connection.network}}</span> Network Connected</template>
              <template v-if="store.state.robonomicsUIvue.polkadot.connection.network && store.state.robonomicsUIvue.polkadot.address && rwsEndDate">, </template>
              <template v-if="store.state.robonomicsUIvue.polkadot.address && rwsEndDate">
                Account connected 
                (<b v-if="isAdmin">Admin</b>
                <b v-if="!isAdmin && isUser">as User</b>
                <template v-if="!isAdmin && !isUser">not added</template>)
              </template>
            </robo-text> 
            <robo-account-polkadot
                short 
                extensionAllowShift
                extensionShowIcon
                selectable
                selectstyle
                selectblock
                :selecttitle="store.state.robonomicsUIvue.polkadot.address ? 'Switch a network' : 'Connect an account / Switch a network'"
            />
        </robo-section>
    
        <robo-section>

            <robo-section card>
              <robo-rws-setup-active 
                :onUserDelete="onUserDelete" 
                :onUserAdd="onUserAdd" 
                :onControllerEdit="onControllerEdit"
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
        <robo-section width="narrow" gcenter centered>
          <robo-text size="small" weight="bold" offset="x05">You haven't added any setups yet</robo-text>
          <robo-button 
              v-if="store.state.robonomicsUIvue.rws.links.setupnew" 
              :router="store.state.robonomicsUIvue.rws.links.setupnew" 
              iconleft="rss">Add a setup
          </robo-button>
        </robo-section>
    </template>
</template>

<script>
  export default { name: 'RoboRwsSetup' }
</script>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { isAccountsIdentical } from '../polkadot/tools';
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
  const index = store.dispatch('rws/findSetupIndex', active.value);
  if (index !== -1) {
    return rws.value[index].users;
  }
})

const rwsuser = computed( () => {
    return store.state.robonomicsUIvue.rws.list.find(rws => rws.owner === store.state.robonomicsUIvue.rws.active)?.user
})

/* if !rwsEndDate -> no subscription */
const rwsEndDate = computed( () => {
  return store.state.robonomicsUIvue.rws.expiredate;
});

const rwsnotempty = computed(() => {
    const currentNetwork = store.state.robonomicsUIvue.polkadot.connection.network;
    const activeSetup = store.state.robonomicsUIvue.rws.list.find(rws => 
        rws.owner === store.state.robonomicsUIvue.rws.active && rws.network === currentNetwork
    );
    return activeSetup && activeSetup.owner && activeSetup.controller.address;
});

onMounted(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

</script>