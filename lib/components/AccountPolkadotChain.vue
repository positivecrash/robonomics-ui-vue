<template>
    <robo-select
        :values="Object.values(chains)"
        :options="Object.keys(chains)"
        :size="props.size"
        v-model="activeChain"
        :clean="clean"
    />
</template>

<script>
  export default { name: 'RoboAccountPolkadotChain' }
</script>

<script setup>
  import { defineProps, ref, onMounted, watch, computed } from 'vue'

  import { useStore } from 'vuex'
  const store = useStore()
  const polkadotstore = computed( () => {
    return store.state.robonomicsUIvue.polkadot
  })

  import chains from '../polkadot/chains'

  const props = defineProps({
    chain: {
      type: String,
      default: null
    },
    clean: {
      type: Boolean,
      default: false
    },
    size: {
    type: String,
    default: 'small',
        validator(value) {
        return ['small', 'medium', 'large'].includes(value)
        }
    },
  })

  let getActiveChain = () => {

    if( props.chain && Object.values(chains).indexOf(props.chain) > -1 ) {
      return props.chain
    } else {
      // return store.getters['polkadot/chain'] ?? '32'
      return polkadotstore.chain ?? '32'
    }

  }

  let activeChain = ref(getActiveChain())

  onMounted(async () => {
    watch(activeChain, async (value) => {
        store.commit('polkadot/setChain', value)
    })
  })

  
</script>