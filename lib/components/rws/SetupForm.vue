<template>

    <robo-grid gap="x05" columns="1">

        <div class="generativeline">
            <robo-input-new
                v-model="name"
                width="wide" 
                label="Name of setup (dapp only)"
                required 
            />
            <robo-button clean class="generativeline-tog" @click.prevent="createname"><robo-icon icon="wand-magic"/></robo-button>
        </div>

        <robo-input-new
            v-model="owner" 
            width="wide" 
            label="Owner" 
            required 
        />

        <robo-button @click.prevent="addSubscription" block>Add setup</robo-button>

        <robo-status v-if="msg" type="error" solid>{{msg}}</robo-status>

    </robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateRwsSetupForm' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { isValidAddress } from '../../polkadot/tools';
import { generateName } from '../../tools';
const store = useStore();
const router = useRouter();

const name = ref(null);
const owner = ref(null);
const msg = ref(null);

const createname = () => {
    name.value = generateName();
};

const addSubscription = () => {

    if( !isValidAddress(owner.value) ) {
        msg.value = 'Owner address is not valid';
        return;
    }

    if(name.value === '') {
        msg.value = 'Name of setup is required';
        return;
    }

    store.dispatch('rws/add', { name: name.value, owner: owner.value });
    router.push({path: store.state.robonomicsUIvue.rws.links.setup });
};

</script>

<style>
    .generativeline .robo-input input {
        padding-right: calc(var(--robo-space) * 3);
    }
</style>

<style scoped>
.generativeline {
    position: relative;
    width: 100%;
}

.generativeline .generativeline-tog {
    position: absolute;
    right: 10px;
    bottom: 15px;
}
</style>