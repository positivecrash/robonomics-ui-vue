<template>

  <robo-grid 
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
          <img v-if="extensionShowIcon && !addressIsolated" :src="extensionPic" class="extensionLogo" />
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

        <!-- {{addressChain}} -->

    </template>

    <robo-account-polkadot-connect
      v-if="extensionAllowShift && extension && !addressIsolated"
      summaryIcon='right-left'
      summaryText=''
      popup
    />
  </robo-grid>

</template>

<script>
import { defineComponent } from 'vue'
import { encodeAddress } from "@polkadot/util-crypto"
import extensions from '../polkadotExtensions'
import chains from '../polkadotChains'

export default defineComponent({
  name: 'RoboAccountPolkadot',

  props: {
    addressIsolated: {
      type: String,
      default: null
    },
    chain: {
      type: String,
      default: null
    },
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
        address: this.addressIsolated ?? (this.$store.getters['robonomicsUIvue/polkadot'].address ?? ''),
        // address: encodeAddress(this.$store.getters['robonomicsUIvue/polkadot'].address, this.addressChain) ?? '',
        extension: this.$store.getters['robonomicsUIvue/polkadot'].extension ?? '',
        accounts: null,
        clipboardCopied: false,
        accountsList: this.setAccountsList(this.accounts) ?? null,
        addressList: this.setAddressList(this.accounts) ?? null,
        extensionsData: extensions,
        localFormat: this.chain ? true : false
      }
  },

  // watch: {
  //   // "$store.state.robonomicsUIvue.polkadot.address": function(value) {
  //   //   if( !this.localFormat ) {
  //   //     this.address = value
  //   //   } else {
  //   //     this.address = encodeAddress(value, this.addressChain)
  //   //   }
  //   // },
  //   // "$store.state.robonomicsUIvue.polkadot.extension": async function(value) {
  //   //   this.extension = value
  //   //   this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
  //   // },
  //   // "$store.state.robonomicsUIvue.polkadot.chain": async function() {
  //   //   if( !this.localFormat ) {
  //   //     this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
  //   //   }
  //   // },
  //   // "address": function(value) {
  //   //   if( !this.localFormat ) {
  //   //     this.$store.commit('robonomicsUIvue/setPolkadotAddress', value)
  //   //   }
  //   // },
  //   // "accounts": function(value) {
  //   //   if(value.length > 0) {
  //   //     this.accountsList = this.setAccountsList(value)
  //   //     this.addressList = this.setAddressList(value)
  //   //     this.isAddressInAccounts(this.address, value)
  //   //   } else {
  //   //     this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
  //   //   }
  //   // },
  //   // "extension": async function() {
  //   //   this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
  //   // },
  //   // "short": function() {
  //   //   this.accountsList = this.setAccountsList(this.accounts)
  //   // }
  // },

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
    },

    addressChain() {
     
      if( this.chain && Object.values(chains).indexOf(this.chain) > -1 ) {
        // if chain set from props
        return this.chain
      } else if ( this.$store.getters['robonomicsUIvue/polkadot'].chain ) {
        // if chain set in vuex (this should be so anyway!)
        return this.$store.getters['robonomicsUIvue/polkadot'].chain
      } else {
        // fullish errors protecting fallback
        return '32'
      }

    }
  },

  methods: {
    shortAddress(address) {
      const addressArray = address.split('')
      const result = addressArray.slice(0, 4) + "..." + addressArray.slice(-4)
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

            setTimeout(() => reject(console.warn('[robonomics-ui-vue]: no extension found in robo-account-polkadot')), 2000);
        })
    },

    setAccountsList(accounts) {
      let 
        result = [],
        accountLocal

      if(accounts) {

        Object.keys(accounts).map(key => {
  
          if( !this.localFormat ) {
            accountLocal = accounts[key].address
          } else {
            accountLocal = encodeAddress(accounts[key].address, this.addressChain)
          }

          if(this.short) {
            accountLocal = this.shortAddress(accountLocal)
          }

          result.push(accountLocal)

        })

      }

      return result
    },

    setAddressList(accounts) {
      let result = []

      if(accounts) {
        
       if( !this.localFormat ) {
        Object.keys(accounts).map(key => {
          result.push(accounts[key].address)
        })
       } else {
        Object.keys(accounts).map(key => {
          result.push(encodeAddress(accounts[key].address, this.addressChain))
        })
       }
        
      }

      return result
    },

    isAddressInAccounts(address, accounts) {
      if( address &&  accounts.length > 0) {

        // if no address found in accounts
        if ( accounts.filter(account => account.address === address).length == 0 ) {
          
          const addressEncoded = encodeAddress(address, this.$store.getters['robonomicsUIvue/polkadot'].chain)
          if( accounts.filter(account => account.address === addressEncoded).length == 0 ) {
            this.$store.commit('robonomicsUIvue/setPolkadotAddress', addressEncoded)
          }
          else {
            // set first address in the accounts list
            this.$store.commit('robonomicsUIvue/setPolkadotAddress', accounts[0].address)
          }
          
        }
      }
    }
  },

  async mounted() {

    if( !this.addressIsolated ) {

      /* + WATCHERS */
      this.$watch('$store.state.robonomicsUIvue.polkadot.address', (value) => {
        if( !this.localFormat ) {
          this.address = value
        } else {
          this.address = encodeAddress(value, this.addressChain)
        }
      })

      this.$watch('$store.state.robonomicsUIvue.polkadot.extension', async (value) => {
        this.extension = value
        this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
      })

      this.$watch('$store.state.robonomicsUIvue.polkadot.chain', async () => {
        if( !this.localFormat ) {
          this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
        }
      })

      this.$watch('address', (value) => {
        if( !this.localFormat ) {
          this.$store.commit('robonomicsUIvue/setPolkadotAddress', value)
        }
      })

      this.$watch('accounts', (value) => {
        if(value.length > 0) {
          this.accountsList = this.setAccountsList(value)
          this.addressList = this.setAddressList(value)
          this.isAddressInAccounts(this.address, value)
        } else {
          this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
        }
      })

      this.$watch('extension', async () => {
        this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
      })

      this.$watch('short', () => {
        this.accountsList = this.setAccountsList(this.accounts)
      })
      /* - WATCHERS */


      try {
        // if we have address already encode it
        if( this.address && this.localFormat ) {
          this.address = encodeAddress(this.address, this.addressChain)
        }

        await this.onLoad(500)

        // get list of accounts if there is extension
        this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts", this.addressChain)

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
    } else {
      this.address = encodeAddress(this.addressIsolated, this.addressChain)

      if ( this.short ) {
        this.address = this.shortAddress(this.address)
      }
      // this.$watch('short', () => {
      //   this.setAccountIsolated()
      // })
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