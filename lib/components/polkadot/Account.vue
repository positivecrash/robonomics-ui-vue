<template>
  <robo-details 
    :class="classes" 
    :summarystyle="selectstyle ? 'select' : 'text'" 
    fitContent 
    popupMinWidth="300px"
  >

    <template #summary>
      <robo-grid type="flex" :gap="showAccountsAs === 'connected' ? 'x0' : 'x05'">
        <robo-icon :icon="store.state.robonomicsUIvue.polkadot.connection.network" />

        <template v-if="showAccountsAs !== 'connected'">
          <robo-text size="small" weight="bold" class="robo-line-clipoverflow">
            <template v-if="activeAddress">
              <!-- <img v-if="extensionShowIcon && activeExtensionImg" :src="activeExtensionImg" class="robo-account-polkadot-extensionLogo" /> -->
              {{activeAccount ? accountTitle : shortenAddress(activeAddress)}}
            </template>
            <template v-else-if="selecttitle">{{selecttitle}}</template>
          </robo-text>
        </template>

        <span v-if="showAccountsAs === 'connected' && activeAddress && network" class="robo-dotlabel green">
          <robo-icon icon="check" size="supertiny" />
        </span>

      </robo-grid>

    </template>

      <robo-section offset="x05">
        <robo-polkadot-network-select block class="robo-polkadot-account--networkselect" />
      </robo-section>

      <robo-section offset="x05" v-if="extensionAllowShift">
        <robo-grid type="grid" offset="x05" gap="x1" :columns="4">
          <template v-for="item in extensions" :key="item.id">
            <robo-account-polkadot-extension :wallet="item.wallet" />
          </template>
        </robo-grid>
      </robo-section>

      <robo-status type="warning" v-if="activeExtension && !activeAddress">Account not found</robo-status>

      <robo-select
        v-if="(accounts?.length > 1) && activeAddress && selectable"
        :values="getAvailableAddresses()"
        :options="getAvailableNames()"
        v-model="activeAddress"
        block
        size="small"
      />
      
      <robo-section offset="x05" v-if="activeAddress">
        <robo-text lines="dotted" size="small">
          <robo-grid type="flex" gap="x025" galign="start" valign="center">
            <span v-html="shortenAddress(activeAddress)"/>
            <robo-copy :text="activeAddress" />
          </robo-grid>

          <robo-grid v-if="balanceXRT" type="flex" gap="x025" galign="start" valign="center">
            <span>Balance:</span>
            <span>{{balanceXRT}} XRT</span>
          </robo-grid>

          <robo-grid v-if="activeAccount" type="flex" gap="x025" galign="start" valign="center">
            <span>Type:</span>
            <span>{{activeAccount?.type}}</span>
          </robo-grid>

          <robo-grid v-if="activeAccount" type="flex" gap="x025" galign="start" valign="center">
            <span>Format:</span>
            <robo-account-polkadot-chain clean />
          </robo-grid>

        </robo-text>
      </robo-section>

      <robo-button v-if="activeWallet && accounts?.length > 0" @click.prevent="disconnect" type="error" size="tiny" outline block>Disconnect accounts</robo-button>

  </robo-details>

  <robo-text size="tiny" weight="bold" highlight="error" v-if="typeerror">Your account's type is {{activeAccount?.type}}, you need here {{props.type}}. Try another account.</robo-text>

</template>

<script>
  export default { name: 'RoboAccountPolkadot' }
</script>

<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { encodeAddress } from "@polkadot/util-crypto"
  import { isValidAddress } from './tools'
  import { shortenAddress } from '../../tools'
  import extensions from './extensions'
  import chains from './chains'

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
    showAccountsAs: {
      type: String,
      default: 'name',
      validator: function (value) {
        return ['name', 'address', 'connected'].indexOf(value) !== -1;
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

  const novaDetected = computed( () => {
      return window?.walletExtension?.isNovaWallet
  })

  /* + data */
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
      return (store.state.robonomicsUIvue.polkadot.chain !== '') ? store.state.robonomicsUIvue.polkadot.chain : '32'
    }

  }

  let activeChain = ref(getActiveChain())

  let activeAddress = ref(store.state.robonomicsUIvue.polkadot.address)
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
      if(address === '' || !isValidAddress(address)) {
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

  const disconnect = async () => {
    await store.dispatch('polkadot/disconnect')
  }

  /* + Watchers */
  watch(() => store.state.robonomicsUIvue.polkadot.address, value => {
    if(isValidAddress(value)) {
      activeAddress.value = encodeAddress(value, activeChain.value)
    }
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
  /* - Watchers */
  
  onMounted(async () => {

    try {

      /* + Get list of available accounts from extension */
      emit('beforeInjected')
      await store.dispatch('polkadot/waitWeb3Injected').then( () => {
        emit('afterInjected')
      });

      accounts.value = await store.dispatch('polkadot/getAccounts', activeChain.value)
      activeAddress.value = activeAddressRecalculate(activeAddress.value, accounts.value)
      activeAccount.value = getActiveAccount()

    } catch {
      // reset()
      console.warn('[robonomics-ui-vue]: RoboAccountPolkadot error')
    }
    
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
    width: 100%;
  }

  .robo-polkadot-account--networkselect select {
    text-transform: capitalize;
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

    .robo-account-polkadot-info-section h4 {
      margin-bottom: 0.4rem;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .attention .robo-details-summary {
      color: var(--robo-color-red)
    }

    .robo-account--error {
      color: var(--robo-color-red)
    }

</style>