<template>
    <robo-grid 
        v-if="extensionData"
        columns="200px auto" 
        gap="x1"
        offset="x05" 
        valign="center"
        mediaMobile="none"
    >
        <robo-grid-item>
        <robo-grid columns="50px auto" gap="x1" offset="x0" valign="center" mediaMobile="none">
            <img :src="extPic" class="robo-popup-extensionLogo" />
            <span>{{extensionData.name}}</span>
        </robo-grid>
        </robo-grid-item>

        <robo-grid-item align="right">

           <template v-if="walletNotInstalled">
                <robo-button  
                    :href="extensionData.install"
                    clean
                >Install</robo-button>
            </template>
            <template v-else-if="walletNotConnected">
                <robo-button 
                    clean
                    @click="enable()"
                >Connect</robo-button>
            </template>
            <template v-else>
                <robo-button 
                    clean 
                    disabled="ok"
                    @click="enable()"
                >Connected</robo-button>
            </template>

        </robo-grid-item>
    </robo-grid>
</template>

<script>
import { defineComponent } from 'vue'
import extensions from '../polkadotExtensions'

export default defineComponent({
  name: 'RoboAccountPolkadotExtensions',

  props: {
    // extension: {
    //   type: String,
    //   default: null,
    //   validator: function (value) {
    //     return ['polkadot-js', 'talisman', 'subwallet-js'].indexOf(value) !== -1;
    //   }
    // },
    wallet: {
      type: String,
      default: null,
      validator: function (value) {
        return ['polkadot-js', 'talisman', 'subwallet-js', 'nova'].indexOf(value) !== -1;
      }
    },
  },

  data() {
      return {
            getExtension: null,
            extensionsData: extensions,
            addresses: null
      }
  },

  computed: {
    extensionData() {
        return this.extensionsData.find(ext => ext.wallet === this.wallet)
    },

    extPic() {
        return new URL(`../images/${this.extensionData.picture}`, import.meta.url)
    },

    novaDetected() {
        if (window.walletExtension) {
            return window.walletExtension?.isNovaWallet
        } else {
            return false
        }
    },

    walletNotInstalled() {
        return (!this.getExtension || (this.getExtension && this.wallet === 'nova' && !this.novaDetected))
    },

    walletNotConnected() {
        return this.$store.getters['robonomicsUIvue/polkadot'].wallet !== this.wallet
    }

  },
 
  methods: {
    async enable() {

    await this.getExtension.enable().then(
        async (value) => {
            // set chosen extension
            this.$store.commit('robonomicsUIvue/setPolkadotExtension', this.extensionData.extension)
            // this.$store.commit('robonomicsUIvue/setPolkadotExtension', this.extensionData.wallet)

            // set active account (first by default)
            this.accounts = await value.accounts.get()
            if(this.accounts.length > 0) {
                this.$store.commit('robonomicsUIvue/setPolkadotAddress', this.accounts[0].address)
            }

            document.body.querySelectorAll('.robo-details--closeOutOfFocus[tabindex="0"]')
            .forEach((e) => {
                e.open = false
            })
        }).catch(
            (reason) => {
            console.log('[robonomics-ui-vue]:', reason)
        })
    },
  },

  async mounted() {
    try {
        await this.$store.dispatch("robonomicsUIvue/waitWeb3Injected")
        this.getExtension = window.injectedWeb3[this.extensionData.extension]
    } catch (e) {
      console.warn('[robonomics-ui-vue]: no extension found in robo-account-polkadot-extensions')
    }
  }
})
</script>

<style scoped>
    .robo-popup-extensionLogo {
        max-width: 2.5rem; /* hack for Safari */
    }
</style>