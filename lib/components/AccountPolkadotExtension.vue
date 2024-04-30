<template>
    <robo-button 
    v-if="(novaDetected && wallet === 'nova') || (!novaDetected)"
    @click="(walletInstalled && !walletConnected) ? enable() : null" 
    :href="(!walletInstalled && !walletConnected) ? extensionData.install : null" 
    :disabled="walletConnected ? 'ok' : null" 
    :title="extensionData.name"
    :class="classes"
    clean>
        <img :src="getImageUrl(extensionData.picture)" />

        <span v-if="!walletInstalled" class="label">
            <robo-icon icon="arrow-down" size="tiny" />
        </span>

        <span v-if="walletConnected" class="label green">
            <robo-icon icon="check" size="tiny" />
        </span>
    </robo-button>
</template>

<script>
  export default { name: 'RoboAccountPolkadotExtension' }
</script>

<script setup>
    import { defineProps, computed, ref, onMounted, watch } from 'vue'

    import { useStore } from 'vuex'
    const store = useStore()

    const props = defineProps({
        wallet: {
        type: String,
        default: null,
        validator: function (value) {
            return ['polkadot-js', 'talisman', 'subwallet-js', 'nova'].indexOf(value) !== -1;
        }
        }
    })

    import extensions from '../polkadot/extensions'
    let getExtension = ref(null)
    const extensionData = computed( () => { return extensions.find(ext => ext.wallet === props.wallet) })
    let getImageUrl = image => { return new URL(`../polkadot/extensions/${image}`, import.meta.url) }

    let enable = async () => {
        await getExtension.value.enable().then(
        async value => {
            /* set chosen extension */
            /* wallet set inside of setPolkadotExtension */
            store.commit('polkadot/setExtension', extensionData.value.extension)

            /* set active account (first by default) */
            const accounts = await value.accounts.get()
            if(accounts.length > 0) {
                store.commit('polkadot/setAddress', accounts[0].address)
            }
        }).catch(
        (reason) => {
            console.warn('[robonomics-ui-vue]:', reason)
        })
    }

    const novaDetected = computed( () => {
        return window?.walletExtension?.isNovaWallet
    })

    const walletInSettings = computed( () => {
        return store.state.robonomicsUIvue.polkadot.wallet === props.wallet
    })

    let walletConnected = ref(false)
    let walletInstalled = ref(false)

    let isWalletInstalled = () => {
        if(props.wallet === 'nova') {
            if(getExtension.value && novaDetected.value) {
                return true
            } 
        } else if(getExtension.value) {
           return true
        } else {
            return false
        }
    }

    const classes = computed( () => {
        return {
            [`robo-account-polkadot-extension`]: true,
            [`robo-account-polkadot-extension--connected`]: walletConnected.value
        }
    })

    onMounted(async () => {
        try {
            await store.dispatch("polkadot/waitWeb3Injected")
            getExtension.value = window?.injectedWeb3[extensionData.value.extension]
        } catch (e) {
            console.warn('[robonomics-ui-vue]: no extension found in robo-account-polkadot-extension')
        }

        walletInstalled.value = isWalletInstalled()

        if(walletInSettings.value && walletInstalled.value) {
            walletConnected.value = true
        }

        watch(() => store.state.robonomicsUIvue.polkadot.wallet, value => {
            walletInstalled.value = isWalletInstalled()

            if(walletInSettings.value && walletInstalled.value) {
                walletConnected.value = true
            } else {
                walletConnected.value = false
            }
        })
    })
</script>

<style>
    /* for outside rewriting */
    :root {
        --robo-account-polkadot-extension-img-size: 40px;
        --robo-account-polkadot-extension-label-size: 15px;
    }

    .robo-account-polkadot-extension--connected {
        opacity: 0.7;
    }

    .robo-account-polkadot-extension {
        position: relative;
    }
</style>

<style scoped>

.label {
    align-items: center;
    background: var(--robo-color-link);
    border-radius: var(--robo-account-polkadot-extension-label-size);
    color: var(--robo-color-light);
    display: block;
    display: flex;
    height: var(--robo-account-polkadot-extension-label-size);
    justify-content: center;
    padding-left: 0 !important;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
    width: var(--robo-account-polkadot-extension-label-size);
}

.label.green {
    background: var(--robo-color-green);
}

img {
    display: block;
    width: var(--robo-account-polkadot-extension-img-size);
}
</style>
