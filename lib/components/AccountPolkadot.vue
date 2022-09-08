<template>

  <robo-grid 
    flex
    offset="x0"
    gap="x05"
    :class="classes"
  >

    <template v-if="!address && !isLocalAddress">
      <robo-account-polkadot-connect v-if="!extension" />
      <span v-if="extension">Turn on account in your extension</span>
    </template>
    <template v-else>
        <robo-grid  
          flex
          offset="x0"
          gap="x0"
        >
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
            class="robo-formatview-address"
          />
          <robo-input 
            v-if="isLocalAddress && addressLocalAllowEdit"
            v-bind="$attrs"
            v-model="vmodelAddress"
            :block="inline ? true : false"
            type="text"
            :tip="inputTip ? inputTip : null"
            :label="inputLabel ? inputLabel : null"
          />

        </robo-grid>

        <robo-button 
          v-if="!info && copy && !isLocalAddress" 
          @click="clipboard"
          clean 
          :iconLeft="clipboardCopied ? 'check' : 'copy'"
        />

        <robo-details 
            v-if="error === 'type'"
            summaryIcon='circle-exclamation'
            summaryText=''
            summaryButtonSize='big'
            summaryButtonType="alarm"
            tooltip
        >
        Address should be {{addressType}} type
        </robo-details>

        <robo-details 
            v-if="info && !isLocalAddress"
            summaryIcon='circle-user'
            summaryText=''
            summaryButtonSize='big'
            tooltip
        >
 
            <div v-if="accountCurrent">
              <robo-grid  
              class="robo-account-info-name robo-account-info-item"
              flex
              offset="x05"
              gap="x05">

                <img 
                  v-if="accountCurrent.avatar && accountCurrent.avatar != ''"
                  :src="accountCurrent.avatar" 
                />

                <b>{{accountCurrent.name}}</b>
              </robo-grid>
              
              <robo-section offset="x05" class="robo-account-info-item">
                <div class="robo-formatview-address">
                  {{accountCurrent.address}}
                </div>
                <div>
                  <robo-button 
                    @click="clipboard"
                    clean 
                    :iconLeft="clipboardCopied ? 'check' : 'copy'"
                    size="small"
                    type="ok"
                  >Copy to clipboard</robo-button>
                </div>
              </robo-section>

              <robo-section offset="x05" class="robo-account-info-item">
                <span>type: </span>
                <span>{{accountCurrent.type}}</span>
              </robo-section>
            </div>
       
        </robo-details>

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
    addressType: {
      type: String,
      default: null,
      validator: function (value) {
        return ['sr25519', 'ed25519'].indexOf(value) !== -1;
      }
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
    info: {
        type: Boolean,
        default: true
    },
    inline: {
        type: Boolean,
        default: false
    },
    inputLabel: {
      type: String
    },
    inputTip: {
      type: String
    },
    selectable: {
      type: Boolean,
      default: false
    },
    short: {
        type: Boolean,
        default: false
    },

    vmodelAddressInput: {
      type: String
    }
  
  },

  emits: ['beforeInjected', 'afterInjected', 'onAddressChange' ,'update:vmodelAddressInput'],

  data () {
      return {
        accounts: null,
        address: this.addressLocal !== null ? this.addressLocal : (this.$store.getters['robonomicsUIvue/polkadot'].address ?? ''),
        addressList: [],
        addressListFormatted: [],
        clipboardCopied: false,
        extension: this.$store.getters['robonomicsUIvue/polkadot'].extension ?? '',
        extensionsData: extensions,
        isLocalAddress: this.addressLocal !== null ? true : false,
        isLocalFormat: this.chain ? true : false,
        wallet: this.$store.getters['robonomicsUIvue/polkadot'].wallet ?? '',
      }
  },
  computed: {
    
    classes() {
      return {
        [`robo-account`]: true,
        [`robo-account--inline`]: this.inline,
        [`robo-account--local`]: this.isLocalAddress,
        [`robo-account--error`]: this.error,
      };
    },

    extensionData() {
      // return this.extensionsData.find(ext => ext.extension === this.extension)
      return this.extensionsData.find(ext => ext.wallet === this.wallet)
    },

    extensionPic() {
      if(this.extensionData){
        return new URL(`../images/${this.extensionData.picture}`, import.meta.url)
      }
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

    },

    accountCurrent() {
      if(this.accounts) {
        return this.accounts.find(item => item.address === this.address)
      }
    },

    error() {
      if(this.addressType && this.accountCurrent && (this.addressType !== this.accountCurrent.type) && !this.addressLocal) {
        return 'type'
      } else {
        return false
      }
    },

    vmodelAddress: {
      get() {
        if(this.vmodelAddressInput) {
          return this.vmodelAddressInput
        } else {
          if(!this.address){
            console.warn('[robonomics-ui-vue3 warn]: `robo-account-polkadot` required address missing')
          } else {
            return this.address
          }
        }
        
      },
      set(value) {
        this.$emit('update:address', value)
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
        // this.$store.commit('robonomicsUIvue/initExtensionObject')
        // this.$emit('afterInjected')

        // get list of accounts if there is extension
        this.accounts = await this.$store.dispatch("robonomicsUIvue/getPolkadotAccounts", this.addressChain)

        // this need to be after getPolkadotAccounts, so there is an object initialization there
        this.$emit('afterInjected')

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
          this.$emit('afterInjected')
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
        this.wallet = this.$store.state.robonomicsUIvue.polkadot.wallet
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
      if(!!this.addressLocal) {
        // check if addressLocal is not empty string
        this.address = encodeAddress(this.addressLocal, this.addressChain)
      } else {
        //console.warn('[robonomics-ui-vue3 warn]: addressLocal is empty string')
        // this.address = this.addressLocal
        this.address = null
      }
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

    .robo-account--local:not(.robo-account--inline) .robo-grid {
      display: block;
      width: 100%;
    }

    .robo-account-info-item:not(.robo-account-info-name) {
      font-weight: normal;
    }

    .attention .robo-details-summary {
      color: var(--color-red)
    }

    .robo-account--error {
      color: var(--color-red)
    }
</style>

<style>
    .robo-details--popup[open] .robo-details-content {
        font-size: calc(var(--font-size)*.8) !important;
    }
</style>