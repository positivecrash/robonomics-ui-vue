<template>

    <robo-grid  
      flex
      offset="x0"
      gap="x05"
      :class="classes"
    >
      <template v-if="address && !selectable">
        <span v-html="short ? shortAddress(address) : address" />
      </template>

      <template v-if="address && selectable">
        <robo-select
            :values="addressList"
            :options="accountsList"
            v-model="address"
            clean
        />
      </template>
      
      <template v-if="!address">
        <robo-account-polkadot-connect
          v-if="!extension"
        />

        <span v-if="extension">Turn on account in your extension</span>
      </template>

      <robo-account-polkadot-connect
        v-if="allowShiftExtensions && extension"
        summaryIcon='right-left'
        summaryText=''
        popup
      />

      <robo-button v-if="copy && address" @click="clipboard" clean>
        <font-awesome-icon icon="copy" class="icon" v-if="!clipboardCopied" />
        <font-awesome-icon icon="check" class="icon" v-if="clipboardCopied" />
      </robo-button>
    </robo-grid>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboAccountPolkadot',

  props: {
    allowShiftExtensions: {
        type: Boolean,
        default: false
    },
    copy: {
        type: Boolean,
        default: true
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
        address: this.$store.getters.polkadot.address ? this.$store.getters.polkadot.address : null,
        extension: this.$store.getters.polkadot.extension ? this.$store.getters.polkadot.extension : null,
        accounts: null,
        clipboardCopied: false,
        accountsList: this.setAccountsList(this.accounts) || null,
        addressList: this.setAddressList(this.accounts) || null,
      }
  },

  watch: {
    "$store.state.robonomicsUIvue.polkadot.address": function(value) {
      this.address = value
    },
    "$store.getters.polkadot.extension": function(value) {
      this.extension = value
    },
    "$store.getters.polkadot.chain": async function() {
      this.$store.commit('setPolkadotAddress', this.address)
      this.accounts = await this.$store.dispatch("getPolkadotAccounts")
    },
    "address": function(value) {
      this.$store.commit('setPolkadotAddress', value)
    },
    "accounts": function(value) {
      this.accountsList = this.setAccountsList(value)
      this.addressList = this.setAddressList(value)

      if(value) {
        if ( value.filter(account => account.address === this.address).length == 0 ) {
          if(value.length > 0) {
            this.$store.commit('setPolkadotAddress', account[0].address)
          } else {
            this.$store.commit('setPolkadotAddress', null)
          }
        }
      }
    },
    "extension": async function() {
      this.accounts = await this.$store.dispatch("getPolkadotAccounts")
    }
  },

  computed: {
    classes() {
      return {
        [`robo-account`]: true,
        [`robo-account--inline`]: this.inline
      };
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

            setTimeout(() => reject(new Error("no extension")), 1000);
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
  },

  async mounted() {

    await this.onLoad(500)

    // get list of accounts if there is extension
    if( this.extension ) {
      this.accounts = await this.$store.dispatch("getPolkadotAccounts")
    }

    // check if active address is still avalaibale
    if( this.address && this.accounts ) {

      if ( this.accounts.filter(account => account.address === this.address).length == 0 ) {
        this.$store.commit('setPolkadotAddress', account[0].address)
      }

    }

    // check if active address is still avalaibale, if no - delete it
    if( this.address && !this.accounts ) {
      this.$store.commit('setPolkadotAddress', null)
    }

    // set active address if there is extension & accounts but no active address
    if( !this.address && this.extension && this.accounts.length > 0 ) {
      this.$store.commit('setPolkadotAddress', this.accounts[0].address)
    }

    if(this.accounts) {
      this.accountsList = this.setAccountsList(this.accounts)
      this.addressList = this.setAddressList(this.accounts)
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
</style>

<style>
    .robo-details--popup[open] .robo-details-content {
        font-size: calc(var(--font-size)*.8) !important;
    }
</style>