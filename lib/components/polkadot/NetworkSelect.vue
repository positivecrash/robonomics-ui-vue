<template>
    <robo-grid :gap="props.icon && 'x05'" :offset="props.icon && 'x05'" type="flex" valign="center">
        <robo-text v-if="props.icon" :size="props.size || 'small'">
            <robo-icon :icon="store.state.robonomicsUIvue.polkadot.connection.network" />
        </robo-text>
        <robo-select
            v-bind="$attrs"
            :values="networks"
            :options="networksOptions"
            v-model="network"
            :size="props.size || 'small'"
            @change="networkChanged"
        />
    </robo-grid>
</template>

<script setup>
defineOptions({
    name: 'RoboPolkadotNetworkSelect',
    inheritAttrs: false
});

import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const props = defineProps({
    icon: {
        type: Boolean
    },
    size: {
        type: String
    }
});

const networks = ref(['kusama', 'polkadot']);
const networksOptions = ref(['Kusama', 'Polkadot']);
const network = ref(store.state.robonomicsUIvue.polkadot.connection.network);

const networkChanged = () => {
    store.commit('polkadot/setConnectionNetwork', network.value);
    window.location.reload();
}
</script>

<style scoped>
    .robo-icon { display: block; }
</style>