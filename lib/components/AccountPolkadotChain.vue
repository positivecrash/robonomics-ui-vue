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

          chainSelected: this.$store.getters.polkadot.chain ? this.$store.getters.polkadot.chain : '32'
      }
  },

  computed: {
      chainsNames() {
          return Object.keys(this.chains)
      },
      chainPrefixes(){
          return Object.values(this.chains)
      }
  },

  watch: {
      "chainSelected": function(value) {
          this.$store.commit("setPolkadotChain", value)
      }
  }
})
</script>