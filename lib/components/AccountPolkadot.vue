<template>

  <robo-grid  
    align="right"
    flex
    offset="x0"
    gap="x05"
    :class="classes"
  >

    <template v-if="!address">
      <robo-account-polkadot-connect v-if="!extension" />
      <span v-if="extension">Turn on account in your extension</span>
    </template>
    <template v-else>
      
        <robo-grid  
          flex
          offset="x0"
          gap="x0">
          <img v-if="extensionShowIcon" :src="extensionPic" class="extensionLogo" />
          <span v-if="!selectable" v-html="short ? shortAddress(address) : address" />
          <robo-select
              v-else
              :values="addressList"
              :options="accountsList"
              v-model="address"
              clean
          />
        </robo-grid>

        <robo-button 
          v-if="copy" 
          @click="clipboard"
          clean 
          :iconLeft="clipboardCopied ? 'check' : 'copy'"
        />

    </template>

    <robo-account-polkadot-connect
      v-if="extensionAllowShift && extension"
      summaryIcon='right-left'
      summaryText=''
      popup
    />
  </robo-grid>

</template>

<script>
import { defineComponent } from 'vue'
import { encodeAddress } from "@polkadot/util-crypto"
import extensions from '../extensionsPolkadot'

export default defineComponent({
  name: 'RoboAccountPolkadot',

  props: {
    copy: {
        type: Boolean,
        default: true
    },
    extensionAllowShift: {
      type: Boolean,
      default: false
    },
    extensionShowIcon: {
      type: Boolean,
      default: false
    },
    inline: {
        type: Boolean,
        default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    short: {
        type: Boolean,
        default: false
    },
  
  },

  data () {
      return {
        address: this.$store.getters['robonomicsUIvue/polkadot'].address ?? '',
        extension: this.$store.getters['robonomicsUIvue/polkadot'].extension ?? '',
        accounts: null,
        clipboardCopied: false,
        accountsList: this.setAccountsList(this.accounts) ?? null,
        addressList: this.setAddressList(this.accounts) ?? null,
        extensionsData: extensions
      }
  },

  watch: {
    "$store.state.robonomicsUIvue.polkadot.address": function(value) {
      this.address = value
    },
    "$store.state.robonomicsUIvue.polkadot.extension": async function(value) {
      this.extension = value
      this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
    },
    "$store.state.robonomicsUIvue.polkadot.chain": async function() {
      this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
    },
    "address": function(value) {
      this.$store.commit('robonomicsUIvue/setPolkadotAddress', value)
    },
    "accounts": function(value) {
      if(value.length > 0) {
        this.accountsList = this.setAccountsList(value)
        this.addressList = this.setAddressList(value)
        this.isAddressInAccounts(this.address, value)
      } else {
        this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
      }
    },
    "extension": async function() {
      this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
    },
    "short": function() {
      this.accountsList = this.setAccountsList(this.accounts)
    }
  },

  computed: {
    classes() {
      return {
        [`robo-account`]: true,
        [`robo-account--inline`]: this.inline
      };
    },

    extensionData() {
        return this.extensionsData.find(ext => ext.extesion === this.extension)
    },

    extensionPic() {
        return new URL(`../images/${this.extensionData.picture}`, import.meta.url)
    }
  },

  methods: {
    shortAddress(address) {
      const addressArray = address.split('')
      const result = addressArray.slice(0, 6) + "..." + addressArray.slice(-4)
      return result.replace(/,/g, '')
    },

    clipboard() {
        navigator.clipboard.writeText(this.address)
        this.clipboardCopied = true;

        const o = this
        setTimeout(function(){
            o.clipboardCopied = false;
        }, 1500);
    },

    onLoad(interval) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (window.injectedWeb3) {
                    resolve()
                }
            }, interval);

            setTimeout(() => reject(console.warn('[robonomics-ui-vue]: no extension found in robo-account-polkadot')), 1000);
        })
    },

    setAccountsList(accounts) {
      let result = []

      if(accounts) {
        if(this.short) {
          Object.keys(accounts).map(key => {
            result.push(this.shortAddress(accounts[key].address))
          })
        } else {
          Object.keys(accounts).map(key => {
            result.push(accounts[key].address)
          })
        }
        
      }

      return result
    },

    setAddressList(accounts) {
      let result = []

      if(accounts) {
        
       Object.keys(accounts).map(key => {
          result.push(accounts[key].address)
        })
        
      }

      return result
    },

    isAddressInAccounts(address, accounts) {
      if( address &&  accounts.length > 0) {

        // if no address found in accounts
        if ( accounts.filter(account => account.address === address).length == 0 ) {
          
          const addressEncoded = encodeAddress(address, this.$store.getters['robonomicsUIvue/polkadot'].chain)
          if( accounts.filter(account => account.address === addressEncoded).length == 0 ) {
            // check chain format
            this.$store.commit('robonomicsUIvue/setPolkadotAddress', addressEncoded)
          }
          else {
            // set first addres in the accounts list
            this.$store.commit('robonomicsUIvue/setPolkadotAddress', accounts[0].address)
          }
          
        }
      }
    }
  },

  async mounted() {

    try {
      await this.onLoad(500)

      // get list of accounts if there is extension
      this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")

      if(this.accounts.length > 0){

          if(!this.address) {
            // set active address if there is extension & accounts but no active address
            this.$store.commit('robonomicsUIvue/setPolkadotAddress', this.accounts[0].address)
          } else {
            // check if active address is still avalaibale
            this.isAddressInAccounts(this.address, this.accounts)
          }

          this.accountsList = this.setAccountsList(this.accounts)
          this.addressList = this.setAddressList(this.accounts)

      } else {
        this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
      }
    } catch (e) {
      this.$store.commit('robonomicsUIvue/setPolkadotExtension', '')
      this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
    }
    
  }
  
  // async mounted() {
  //     await this.onLoad(100)

  //   const { ethereum } = window;
  //   if(ethereum) {
  //     console.log('ethereum.isMetaMask', ethereum.isMetaMask)

  //     try {
  //       // Will open the MetaMask UI
  //       // You should disable this button while the request is pending!
  //       await ethereum.request({ method: 'eth_requestAccounts' })
  //       const accounts = await ethereum.request({ method: 'eth_accounts' })
  //       if(accounts) {
  //         console.log(accounts[0])
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }

  //   } else {
  //     console.log('ethereum.isMetaMask no ext')
  //   }
      
  // }

})
</script>

<style scoped>
    .robo-account--inline {
        display: inline-flex !important;
    }

    .extensionLogo {
      width: 20px;
      margin-right: 3px;
    }
</style>

<style>
    .robo-details--popup[open] .robo-details-content {
        font-size: calc(var(--font-size)*.8) !important;
    }
</style>