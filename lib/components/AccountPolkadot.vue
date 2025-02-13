<template>
  <robo-details 
    :class="classes" 
    :summarystyle="selectstyle ? 'select' : 'text'" 
    fitContent 
    popupMinWidth="300px"
  >

    <template #summary>
      <robo-grid type="flex" :gap="showAccountsAs === 'connected' ? 'x0' : 'x05'">
        <svg v-if="network==='polkadot'" class="network-default-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13 17" style="enable-background:new 0 0 13 17;" xml:space="preserve"><path d="M6.5,0C2.9,0,0,2.9,0,6.5c0,0.7,0.1,1.4,0.3,2.1C0.5,9,1,9.3,1.5,9.1C1.9,9,2.2,8.5,2,8 C1.9,7.4,1.8,6.9,1.8,6.3c0.1-2.4,2-4.4,4.4-4.5c2.7-0.1,4.9,2,4.9,4.6c0,2.5-1.9,4.5-4.4,4.6c0,0-0.9,0.1-1.3,0.1 c-0.2,0-0.4,0.1-0.5,0.1c-0.1,0-0.1,0-0.1-0.1l0.2-0.8l0.8-3.8c0.1-0.5-0.2-1-0.7-1.1S4.1,5.8,4,6.3c0,0-2,9.4-2,9.5 c-0.1,0.5,0.2,1,0.7,1.1c0.5,0.1,1-0.2,1.1-0.7C3.7,16,4,14.8,4,14.8c0.2-1,1-1.7,1.9-1.8c0.2,0,1-0.1,1-0.1c3.3-0.3,6-3,6-6.4 C12.9,2.9,10,0,6.5,0z"/> <path class="st0" d="M11,14.9c-0.6-0.1-1.1,0.2-1.3,0.8c-0.1,0.6,0.2,1.2,0.8,1.3c0.6,0.1,1.2-0.2,1.3-0.8 C11.9,15.5,11.6,15,11,14.9z"/></svg>
        <svg v-if="network==='kusama'" class="network-default-icon" viewBox="0 0 88 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M82 2.84478C80.42 1.35578 78.425 0.378775 76.28 0.0447752C73.6 -0.305225 70.89 1.47478 69.05 2.66478C67.21 3.85478 63.76 7.33478 62.28 8.33478C60.8 9.33478 57.16 10.3348 51.28 13.9248C45.4 17.5148 22.11 32.3848 22.11 32.3848L28.16 32.4448L1.18002 46.4148H3.87L0 49.4148C2.14 49.9178 4.39302 49.5888 6.30002 48.4948V49.3248C6.30002 49.3248 38.39 36.6748 44.62 39.9548L40.86 41.0348C41.19 41.0348 47.3 41.4248 47.3 41.4248C47.596 43.9788 49.021 46.2698 51.18 47.6648C54.86 50.0948 54.92 51.4148 54.92 51.4148C54.92 51.4148 53.02 52.1948 53.02 53.1848C56.399 52.1288 60.021 52.1288 63.4 53.1848C66.779 54.2408 63.2 52.1848 60.64 51.4148C58.08 50.6448 55.58 47.9248 54.33 46.4148C52.795 44.4588 52.414 41.8258 53.33 39.5148C54.21 37.2348 57.33 35.9648 63.64 32.6848C71.13 28.8148 72.83 25.9148 73.88 23.6848C74.93 21.4548 76.51 16.9848 77.38 14.8848C78.107 12.9238 79.351 11.1968 80.98 9.88478C82.971 8.81678 85.036 7.89478 87.16 7.12478C89.284 6.35478 83.25 3.83478 82 2.84478Z" /></svg>

        <template v-if="showAccountsAs !== 'connected'">
          <template v-if="activeAddress">
            <!-- <img v-if="extensionShowIcon && activeExtensionImg" :src="activeExtensionImg" class="robo-account-polkadot-extensionLogo" /> -->
            <span v-if="activeAccount" v-html="accountTitle" class="robo-account-polkadot-title robo-line-clipoverflow" />
            <span v-else>{{shortenAddress(activeAddress)}}</span>
          </template>
          <template v-else>
            <span v-if="selecttitle" v-html="selecttitle" class="robo-account-polkadot-title robo-line-clipoverflow" />
          </template>
        </template>

        <span v-if="showAccountsAs === 'connected' && activeAddress && network" class="robo-dotlabel green">
          <robo-icon icon="check" size="supertiny" />
        </span>

      </robo-grid>

    </template>

    <robo-section offset="x05">

      <robo-status type="warning" v-if="activeExtension && !activeAddress">Account not found</robo-status>

      <robo-section offset="x05">
        <robo-select
            :values="networks"
            :options="networks"
            v-model="network"
            block
            size="small"
            class="robo-polkadot-account--networkselect"
            @change="networkChanged"
        />
      </robo-section>

      <robo-grid gap="x05" columns="1">
        <robo-select
          v-if="(accounts?.length > 1) && activeAddress && selectable"
          :values="getAvailableAddresses()"
          :options="getAvailableNames()"
          v-model="activeAddress"
          block
          size="small"
        />

        <robo-button v-if="activeWallet && accounts?.length > 0" @click.prevent="disconnect" type="error" size="tiny" outline block>Disconnect</robo-button>
      </robo-grid>
      
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
    </robo-section>

    <robo-section offset="x05" v-if="extensionAllowShift">
      <robo-grid type="grid" offset="x05" gap="x1" :columns="4">
        <template v-for="item in extensions" :key="item.id">
          <robo-account-polkadot-extension :wallet="item.wallet" />
        </template>
      </robo-grid>
    </robo-section>
  </robo-details>

  <robo-text size="tiny" weight="bold" highlight="error" v-if="typeerror">Your account's type is {{activeAccount?.type}}, you need here {{props.type}}. Try another account.</robo-text>

</template>

<script>
  export default { name: 'RoboAccountPolkadot' }
</script>

<script setup>
  import { computed, ref, onMounted, watch } from 'vue'
  import { encodeAddress } from "@polkadot/util-crypto"
  import { isValidAddress } from '../polkadot/tools'
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
  import extensions from '../polkadot/extensions'
  import chains from '../polkadot/chains'

  let accounts = ref(null)
  let activeAccount = ref(null)
  /* - data */

  /* Note: Extensions != wallets: Nova wallet e.g. detected as polkadot-js extension */

  /* + Network */
  const networks = ref(['kusama', 'polkadot']);
  const network = ref(null);
  /* - Network */


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

  const networkChanged = () => {
    store.commit('polkadot/setNetwork', network.value);
    window.location.reload();
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

      network.value = store.state.robonomicsUIvue.polkadot.network;

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

    .network-default-icon {
      display: block;
      height: 1.2rem;
    }
    .network-default-icon path { fill: var(--robo-details-summary-color); }

</style>