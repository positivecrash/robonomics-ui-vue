<template>
    <robo-details type="tooltip" summarystyle="select" v-if="!expanded">
        <template #summary>
          {{enteredGateway ?? selectedGateway}}
        </template>

        <robo-text weight="bold">IPFS Gateway</robo-text>
        <robo-text size="tiny" offset="x025">Choose IPFS service for delivering content. If you have trouble on loading, try another gateway.</robo-text>

        <robo-section offset="x025">
          <robo-select 
            :options="ipfsGateways" 
            :values="ipfsGateways" 
            v-model="selectedGateway" 
            size="small" 
            @change="setGateway()"
            label="Choose gateway"
            block
          />
        </robo-section>

        <robo-section offset="x025">
          <robo-input 
            @change="setGateway()"
            v-model="selectedGateway" 
            size="small"
            label="Enter your gateway"
            block
          />
        </robo-section>

    </robo-details>

    <robo-section v-if="expanded" offset="x025">
        <robo-text weight="bold">IPFS Gateway</robo-text>
        <robo-text size="tiny">{{enteredGateway ?? selectedGateway}}</robo-text>

        <robo-section offset="x025">
          <robo-select 
            :options="ipfsGateways" 
            :values="ipfsGateways" 
            v-model="selectedGateway" 
            size="small" 
            @change="setGateway()"
            label="Choose gateway"
            block
          />
        </robo-section>

        <robo-section offset="x025">
          <robo-input 
            @change="setGateway()"
            v-model="selectedGateway" 
            size="small"
            label="Enter your gateway"
            block
          />
        </robo-section>
    </robo-section>
</template>


<script>
  export default { name: 'RoboTemplateGateway' }
</script>

<script setup>

import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    expanded: {
        type: Boolean,
        default: false
    }
})

const ipfsGateways = computed( () => {
    return store.state.robonomicsUIvue.ipfs.gateways
})

let selectedGateway = ref(store.state.robonomicsUIvue.ipfs.activegateway)

let setGateway = value => {
  store.commit('ipfs/setActiveGateway', selectedGateway.value)
}

</script>
