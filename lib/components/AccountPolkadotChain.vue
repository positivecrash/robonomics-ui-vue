<template>
    <robo-select
        :options="chainsNames"
        :values = "chainPrefixes"
        v-model="chainSelected"
        clean
    />
</template>

<script>
import { defineComponent } from 'vue'
import chains from '../polkadotChains'

export default defineComponent({
  name: 'RoboAccountPolkadotChain',

  data() {
      return {
          chains: chains,
          chainSelected: this.$store.getters['robonomicsUIvue/polkadot'].chain ? this.$store.getters['robonomicsUIvue/polkadot'].chain : '32'
      }
  },

  computed: {
      chainsNames() {
        let chains = []
        //   return Object.keys(this.chains)
        Object.keys(this.chains).forEach((key) => {
            chains.push(`${key} chain`)
        })

        return chains
      },
      chainPrefixes(){
          return Object.values(this.chains)
      }
  },

  watch: {
      "chainSelected": function(value) {
          this.$store.commit("robonomicsUIvue/setPolkadotChain", value)
      }
  }
})
</script>