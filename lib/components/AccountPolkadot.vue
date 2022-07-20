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
          <img v-if="extensionShowIcon && !isLocalAddress" :src="extensionPic" class="extensionLogo" />
          <robo-select
              v-if="selectable && !isLocalAddress"
              :values="addressList"
              :options="addressListFormatted"
              v-model="address"
              clean
          />
          <span 
            v-if="!selectable && !addressLocalAllowEdit" 
            v-html="short ? shortAddress(address) : address" 
          />
          <robo-input 
            v-if="isLocalAddress && addressLocalAllowEdit"
            v-model="address"
          />

        </robo-grid>

        <robo-button 
          v-if="copy && !addressLocalAllowEdit" 
          @click="clipboard"
          clean 
          :iconLeft="clipboardCopied ? 'check' : 'copy'"
        />

    </template>

    <robo-account-polkadot-connect
      v-if="extensionAllowShift && extension && !isLocalAddress"
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
    addressLocal: {
      type: String,
      default: null
    },
    addressLocalAllowEdit: {
      type: Boolean,
      default: false
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

  emits: ['beforeInjected', 'afterInjected', 'onAddressChange'],

  data () {
      return {
        address: this.addressLocal ?? (this.$store.getters['robonomicsUIvue/polkadot'].address ?? ''),
        // address: encodeAddress(this.$store.getters['robonomicsUIvue/polkadot'].address, this.addressChain) ?? '',
        extension: this.$store.getters['robonomicsUIvue/polkadot'].extension ?? '',
        accounts: null,
        clipboardCopied: false,
        addressListFormatted: [],
        addressList: [],
        extensionsData: extensions,
        isLocalFormat: this.chain ? true : false,
        isLocalAddress: this.addressLocal ? true : false,
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
    
    // setAccountsList(accounts) {
    //   let 
    //     result = [],
    //     accountLocal

    //   if(accounts) {

    //     Object.keys(accounts).map(key => {
  
    //       if( !this.isLocalFormat ) {
    //         accountLocal = accounts[key].address
    //       } else {
    //         accountLocal = encodeAddress(accounts[key].address, this.addressChain)
    //       }

    //       if(this.short) {
    //         accountLocal = this.shortAddress(accountLocal)
    //       }

    //       result.push(accountLocal)

    //     })

    //   }

    //   return result
    // },

    setAddressListFormatted(accounts) {
      let 
        result = [],
        accountBufer

      if(accounts) {

        Object.keys(accounts).map(key => {
  
          if( !this.isLocalFormat ) {
            accountBufer = accounts[key].address
          } else {
            accountBufer = encodeAddress(accounts[key].address, this.addressChain)
          }

          if(this.short) {
            accountBufer = this.shortAddress(accountBufer)
          }

          result.push(accountBufer)

        })

      }

      return result
    },

    setAddressList(accounts) {
      let result = []

      if(accounts) {

       if( !this.isLocalFormat ) {
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

    if( !this.isLocalAddress ) {

      // if we have address already encode it
      if( this.address != '' && this.isLocalFormat ) {
        this.address = encodeAddress(this.address, this.addressChain)
      }

      try {

        // if we have address already encode it
        if( this.address != '' && this.isLocalFormat ) {
          this.address = encodeAddress(this.address, this.addressChain)
        }

        this.$emit('beforeInjected')
        await this.$store.dispatch("robonomicsUIvue/waitWeb3Injected")
        this.$emit('afterInjected')

        // get list of accounts if there is extension
        this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts", this.addressChain)

        if(this.accounts.length > 0){
    
            if(this.address == '') {
              
              // set active address if there is extension & accounts but no active address
              this.$store.commit('robonomicsUIvue/setPolkadotAddress', this.accounts[0].address)

            } else {

              // check if active address is still avalaibale
              this.isAddressInAccounts(this.address, this.accounts)

            }

            this.addressListFormatted = this.setAddressListFormatted(this.accounts)
            this.addressList = this.setAddressList(this.accounts)

        } else {
          this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
        }

      } catch {
        this.$store.commit('robonomicsUIvue/setPolkadotExtension', '')
        this.$store.commit('robonomicsUIvue/setPolkadotAddress', '')
      }


      /* + WATCHERS */

      this.$watch('$store.state.robonomicsUIvue.polkadot.address', (value) => {
        if( !this.isLocalFormat ) {
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
        if( !this.isLocalFormat ) {
          this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts")
        }
      })

      this.$watch('accounts', (value) => {
        if(value.length > 0) {
          this.addressListFormatted = this.setAddressListFormatted(value)
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
        this.addressListFormatted = this.setAddressListFormatted(this.accounts)
      })

      /* - WATCHERS */

    } else {
      /* this.isLocalAddress true */
      this.address = encodeAddress(this.addressLocal, this.addressChain)
    }



    /* + OTHER WATCHERS */

    this.$watch('address', (value) => {
      if( !this.isLocalAddress ) {
        if( !this.isLocalFormat ) {
          this.$store.commit('robonomicsUIvue/setPolkadotAddress', value)
        }
      }
      else {
        if( !this.isLocalFormat ) {
          this.address = value
        } else {
          this.address = encodeAddress(value, this.addressChain)
        }
      }

      this.$emit('onAddressChange')
          
    })

    this.$watch('chain', (value) => {
      
      if(Object.values(chains).indexOf(value) > -1) {
        this.address = encodeAddress(this.address, value)
        this.isLocalFormat = true
      }

      if(!this.isLocalAddress) {
        this.addressListFormatted = this.setAddressListFormatted(this.accounts)
        this.addressList = this.setAddressList(this.accounts)
      }

    })

    this.$watch('addressLocal', (value) => {
      if (value) {
        this.isLocalAddress = true
        this.address = encodeAddress(this.addressLocal, this.addressChain)
      }
    })

    /* - OTHER WATCHERS */

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