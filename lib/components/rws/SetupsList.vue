<template>
    <robo-section v-for="(i, k) in rws" :key="k" offset="x05" card>
        <robo-button clean @click.prevent="setactive(i.owner, i.network)" >
            <robo-text weight="bold">
                <robo-icon :icon="i.network" />
                {{i.name}}
            </robo-text>
        </robo-button>
        <robo-text size="small">{{i.owner}}</robo-text>
    </robo-section>
</template>

<script>
  export default { name: 'RoboRwsSetupsList' }
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
});

async function setactive(owner, network) {
    await store.dispatch('rws/changeActiveSetup', owner);
    store.commit('polkadot/setConnectionNetwork', network);
    router.go();
}
</script>