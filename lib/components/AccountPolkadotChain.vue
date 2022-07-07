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

export default defineComponent({
  name: 'RoboAccountPolkadotChain',

  data() {
      return {
          chains: {
            Robonomics: '32',
            Kusama: '2',
            Polkadot: '0',
          },

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