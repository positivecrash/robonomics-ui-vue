<template>
  <robo-details :type="interact" :class="classes" :closeOutOfFocus="false" :summarystyle="selectstyle ? 'select' : 'text'">

    <template #summary>

      <robo-grid type="flex" offset="0" gap="x05" galign="start">
        <template v-if="activeAddress">
          <img v-if="extensionShowIcon && activeExtensionImg" :src="activeExtensionImg" class="robo-account-polkadot-extensionLogo" />
          <span v-if="activeAccount" v-html="accountTitle" class="robo-account-polkadot-title" />
          <span v-else>{{shortenAddress(activeAddress)}}</span>
        </template>
        <template v-else>
          
          <svg class="svginline-polkadot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13 17" style="enable-background:new 0 0 13 17;" xml:space="preserve"><path class="st0" d="M6.5,0C2.9,0,0,2.9,0,6.5c0,0.7,0.1,1.4,0.3,2.1C0.5,9,1,9.3,1.5,9.1C1.9,9,2.2,8.5,2,8 C1.9,7.4,1.8,6.9,1.8,6.3c0.1-2.4,2-4.4,4.4-4.5c2.7-0.1,4.9,2,4.9,4.6c0,2.5-1.9,4.5-4.4,4.6c0,0-0.9,0.1-1.3,0.1 c-0.2,0-0.4,0.1-0.5,0.1c-0.1,0-0.1,0-0.1-0.1l0.2-0.8l0.8-3.8c0.1-0.5-0.2-1-0.7-1.1S4.1,5.8,4,6.3c0,0-2,9.4-2,9.5 c-0.1,0.5,0.2,1,0.7,1.1c0.5,0.1,1-0.2,1.1-0.7C3.7,16,4,14.8,4,14.8c0.2-1,1-1.7,1.9-1.8c0.2,0,1-0.1,1-0.1c3.3-0.3,6-3,6-6.4 C12.9,2.9,10,0,6.5,0z"/> <path class="st0" d="M11,14.9c-0.6-0.1-1.1,0.2-1.3,0.8c-0.1,0.6,0.2,1.2,0.8,1.3c0.6,0.1,1.2-0.2,1.3-0.8 C11.9,15.5,11.6,15,11,14.9z"/></svg>

          <span class="robo-account-polkadot-title">
            <template v-if="selecttitle">
              {{selecttitle}}
            </template>
            <template v-else>
              Connect <template v-if="type">{{type}}</template> account
            </template>
            </span>
        </template>
      </robo-grid>

    </template>

    <section v-if="(activeExtension || activeAddress)" class="robo-account-polkadot-info-section">

      <robo-status type="warning" textRight="Account not found" v-if="activeExtension && !activeAddress" />
      
      <template v-if="activeAddress">
        <robo-text lines="dotted" size="small">
          <robo-grid type="flex" offset="x0" gap="x025" galign="start" valign="center">
            <span v-html="shortenAddress(activeAddress)"/>
            <robo-copy :text="activeAddress" />
          </robo-grid>

          <robo-grid v-if="balanceXRT" type="flex" offset="x0" gap="x025" galign="start" valign="center">
            <span>Balance:</span>
            <span>{{balanceXRT}} XRT</span>
          </robo-grid>

          <robo-grid v-if="activeAccount" type="flex" offset="x0" gap="x025" galign="start" valign="center">
            <span>Type:</span>
            <span>{{activeAccount?.type}}</span>
          </robo-grid>

          <robo-grid v-if="activeAccount" type="flex" offset="x0" gap="x025" galign="start" valign="center">
            <span>Format:</span>
            <robo-account-polkadot-chain clean />
          </robo-grid>

        </robo-text>
      </template>
    </section>

    <section v-if="(accounts?.length > 1) && activeAddress && selectable" class="robo-account-polkadot-info-section">
      <h4>Connect another account</h4>
      <robo-select
          :values="getAvailableAddresses()"
          :options="getAvailableNames()"
          v-model="activeAddress"
          block
          size="small"
      />
    </section>

    <section v-if="extensionAllowShift" class="robo-account-polkadot-info-section">
      <h4 v-if="activeWallet">Shift extension</h4>

      <robo-grid type="grid" offset="x0" gap="x1" :columns="4">
        <template v-for="item in extensions" :key="item.id">
          <robo-account-polkadot-extension :wallet="item.wallet" />
        </template>
      </robo-grid>
      
    </section>
  </robo-details>

  <robo-text size="tiny" weight="bold" highlight="error" v-if="typeerror">Your account's type is {{activeAccount?.type}}, you need here {{props.type}}. Try another account.</robo-text>

</template>

<script>
  export default { name: 'RoboAccountPolkadot' }
</script>

<script setup>
  import { defineProps, defineEmits, computed, ref, onMounted, watch } from 'vue'
  import { encodeAddress } from "@polkadot/util-crypto"
  import { shortenAddress } from '../tools'

  import { useStore } from 'vuex'
  const store = useStore()

  const props = defineProps({

    chain: {
      type: String,
      default: null
    },
    extensionAllowShift: {
      type: Boolean,
      default: false
    },
    extensionShowIcon: {
      type: Boolean,
      default: false
    },
    generationAllow: {
      type: Boolean,
      default: true
    },
    inline: {
        type: Boolean,
        default: false
    },
    interact: {
      type: String,
      default: 'tooltip',
      validator: function (value) {
        return ['tooltip', 'popup', 'inital'].includes(value)
      }
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selectstyle: {
      type: Boolean,
      default: false
    },
    selectblock: {
      type: Boolean,
      default: false
    },
    selecttitle: {
      type: String,
      default: null
    },
    short: {
        type: Boolean,
        default: false
    },
    showAccountsAs: {
      type: String,
      default: 'name',
      validator: function (value) {
        return ['name', 'address'].indexOf(value) !== -1;
      }
    },
    // addressType
    type: {
      type: String,
      default: null,
      validator: function (value) {
        return ['sr25519', 'ed25519'].indexOf(value) !== -1;
      }
    },
  })

  const emit = defineEmits(['beforeInjected', 'afterInjected', 'onAddressChange' ,'update:modelValue'])

  const classes = computed( () => {
    return {
      [`robo-account-polkadot`]: true,
      [`robo-polkadot-account--inline`]: props.inline,
      [`robo-polkadot-account--selectstyle`]: props.selectstyle,
      [`robo-polkadot-account--selectblock`]: props.selectblock,
      // [`robo-account--error`]: typeerror.value
    }
  })

  /* + data */
  import extensions from '../polkadot/extensions'
  import chains from '../polkadot/chains'

  let accounts = ref(null)
  let activeAccount = ref(null)
  /* - data */

  /* Note: Extensions != wallets: Nova wallet e.g. detected as polkadot-js extension */


  /* + Init all nessesary variables */

  const activeExtension = computed( () => {
    // return store.getters['polkadot/extension'] ?? ''
    return store.state.robonomicsUIvue.polkadot.extension ?? ''
  })

  const activeWallet = computed( () => {
    return store.state.robonomicsUIvue.polkadot.wallet ?? ''
  })

  const activeExtensionImg = computed( () => {
    const wallet = store.state.robonomicsUIvue.polkadot.wallet
    const data = extensions.find(ext => ext.wallet === wallet)
    if(data) {
      return new URL(`../polkadot/extensions/${data.picture}`, import.meta.url)
    } else {
      return null
    }
  })
  
  /* balanceXRT needs to be rewritten with getting balance here */
  const balanceXRT = computed( () => {
    return store.state.robonomicsUIvue.polkadot.balanceXRT
  })
  
  let getActiveChain = () => {

    if( props.chain && Object.values(chains).indexOf(props.chain) > -1 ) {
      return props.chain
    } else {
      return store.state.robonomicsUIvue.polkadot.chain ?? '32'
    }

  }

  let activeChain = ref(getActiveChain())

  let activeAddress = ref(store.state.robonomicsUIvue.polkadot.address ?? '')
  /* - Init all nessesary variables */



  /* + Active account */
  const accountTitle = computed( () => {
    if(props.showAccountsAs === 'name') {
      return activeAccount.value.name
    }

    if(props.showAccountsAs === 'address') {
      return activeAccount.value.address
    }
  })
  /* - Active account */

  /* + All account tools */
  let getActiveAccount = () => {
    if(accounts.value != null && activeAddress.value) {
      return accounts.value.find(item => item.address === activeAddress.value)
    }
  }

  let activeAddressRecalculate = (address, accounts) => {
    if(accounts.length > 0) {
      if(address === '') {
        return accounts[0].address
      } else {
        const activeAddressEncoded = encodeAddress(address, activeChain.value)
        if( accounts.filter(account => account.address === activeAddressEncoded).length == 0 ) {
          return accounts[0].address
        }
        else {
          return activeAddressEncoded
        }
      }
    } else {
      return ''
    }
  }

  let getAvailableAddresses = (view = 'normal') => {
    let result = []
    let bufer = ''

    if(accounts.value && activeChain.value) {
      Object.keys(accounts.value).map(key => {
        bufer = encodeAddress(accounts.value[key].address, activeChain.value)

        if (view === 'short') {
          bufer = shortenAddress(bufer)
        }

        result.push(bufer)
      })
    }

    return result
  }

  let getAvailableNames = () => {
    let result = []

    if(accounts.value) {
      Object.keys(accounts.value).map(key => {
        result.push(accounts.value[key].name)
      })
    }

    return result
  }
  /* - All account tools */

  /* + Type error */
  const typeerror = computed( () => {
    if(props.type && activeAccount.value && activeAccount.value?.type !== props.type) {
      return true
    } else {
      return false
    }
  })
  /* - Type error */

  
  onMounted(async () => {

    try {

      /* + Get list of available accounts from extension */
      emit('beforeInjected')
      await store.dispatch('polkadot/waitWeb3Injected').then( () => {
        emit('afterInjected')
      })

      accounts.value = await store.dispatch('polkadot/getAccounts', activeChain.value)
      activeAddress.value = activeAddressRecalculate(activeAddress.value, accounts.value)
      activeAccount.value = getActiveAccount()

    } catch {
      // reset()
      console.warn('[robonomics-ui-vue]: RoboAccountPolkadot error')
    }

    watch(() => store.state.robonomicsUIvue.polkadot.address, value => {
      activeAddress.value = encodeAddress(value, activeChain.value)
    })

    watch(() => store.state.robonomicsUIvue.polkadot.extension, async (value) => {
      activeExtension.value = value
      activeWallet.value = store.state.robonomicsUIvue.polkadot.wallet
      accounts.value = await store.dispatch('polkadot/getAccounts')
    })

    watch(() => store.state.robonomicsUIvue.polkadot.chain, async (value) => {
      activeChain.value = value
    })

    watch(accounts, value => {
      activeAddress.value = activeAddressRecalculate(activeAddress.value, value)
      activeAccount.value = getActiveAccount()
    })


    watch(activeAddress, value => {

      store.commit('polkadot/setAddress', value)
      activeAccount.value = getActiveAccount()

      emit('onAddressChange')
          
    })

    watch(activeChain, async (value) => {

      store.commit("polkadot/setChain", value)
      activeChain.value = value
      accounts.value = await store.dispatch("polkadot/getAccounts")
      
      if(Object.values(chains).indexOf(value) > -1) {
        activeAddress.value = encodeAddress(activeAddress.value, value)
      }

      activeAddress.value = activeAddressRecalculate(activeAddress.value, accounts.value)

    })
    
  })

</script>


<style>
  /* for outside rewriting */
  :root {
    --robo-account-polkadot-extension-logo: 1.2rem;
  }

  /* needs check*/
  .robo-account--error .robo-details--summarystyle-select .robo-details-summary {
    --robo-color-inputborder: var(--robo-color-red)
  }

  .robo-polkadot-account--selectblock.robo-details, .robo-polkadot-account--selectblock .robo-details-summary {
    display: block !important;
  }
</style>


<style scoped>

    .robo-account-polkadot--inline {
        display: inline-flex !important;
    }

    .robo-account-polkadot-extensionLogo {
      display: inline-block;
      width: var(--robo-account-polkadot-extension-logo);
    }

    .robo-account-polkadot-title {
      font-weight: bold;
    }

    .robo-account-polkadot-info-section:not(:first-child) {
      margin-top: calc(var(--space)*2);
    }

    .robo-account-polkadot-info-section h4 {
      margin-bottom: 0.4rem;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .attention .robo-details-summary {
      color: var(--color-red)
    }

    .robo-account--error {
      color: var(--color-red)
    }

    .svginline-polkadot {
      display: block;
      width: 1rem;
    }
    .svginline-polkadot .st0 { fill:#FFFFFF; }

</style>