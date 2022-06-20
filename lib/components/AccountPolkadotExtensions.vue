<template>
    <robo-grid 
        v-if="extensionData"
        columns="200px auto" 
        gap="x1"
        offset="x05" 
        valign="center"
    >
        <robo-grid-item>
        <robo-grid columns="50px auto" gap="x1" offset="x0" valign="center">
            <img :src="extPic" class="robo-popup-extensionLogo" />
            <span>{{extensionData.name}}</span>
        </robo-grid>
        </robo-grid-item>

        <robo-grid-item align="right">

           <template v-if="!getExtension">
                <robo-button  
                    :href="extensionData.install"
                    clean
                >Install</robo-button>
            </template>
            <template v-else-if="$store.state.robonomicsUIvue.polkadot.extension !== extension">
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

export default defineComponent({
  name: 'RoboAccountPolkadotExtensions',

  props: {
    extension: {
      type: String,
      default: null,
      validator: function (value) {
        return ['polkadot-js', 'talisman', 'subwallet-js'].indexOf(value) !== -1;
      }
    },
  },

  data() {
      return {
            getExtension: null,
            extensionsData: [
                {
                    extesion: 'polkadot-js',
                    name: 'Polkadot{.js}',
                    picture: 'PolkadotJSLogo.svg',
                    install: 'https://polkadot.js.org/extension/'
                },
                {
                    extesion: 'talisman',
                    name: 'Talisman',
                    picture: 'TalismanLogo.svg',
                    install: 'https://app.talisman.xyz/spiritkeys'
                },
                {
                    extesion: 'subwallet-js',
                    name: 'SubWallet',
                    picture: 'SubWalletLogo.svg',
                    install: 'https://subwallet.app/download.html'
                },
            ],
            addresses: null
      }
  },

  computed: {
      extensionData() {
          return this.extensionsData.find(ext => ext.extesion === this.extension)
      },

      extPic() {
          return new URL(`../images/${this.extensionData.picture}`, import.meta.url)
      }
  },
 
  methods: {
        onLoad(interval) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (window.injectedWeb3) { 
                        resolve()
                    }
                }, interval);

                setTimeout(() => reject(new Error("no extension")), 1000);
            })
        },

      async enable() {

        await this.getExtension.enable().then(
           async (value) => {
                // set chosen extension
                this.$store.commit('setPolkadotExtension', this.extension)

                // set active account (first by default)
                this.accounts = await value.accounts.get()
                if(this.accounts.length > 0) {
                    this.$store.commit('setPolkadotAddress', this.accounts[0].address)
                }

                document.body.querySelectorAll('.robo-details--closeOutOfFocus[tabindex="0"]')
                .forEach((e) => {
                    e.open = false
                })
            }).catch(
                (reason) => {
                console.log('[robonomics-ui-vue]:', reason)
            })
    }
  },

  async mounted() {
    await this.onLoad(500)
    this.getExtension =  window.injectedWeb3[this.extension]
  }
})
</script>

<style scoped>
    .robo-popup-extensionLogo {
        max-width: 50px; /* hack for Safari */
    }
</style>