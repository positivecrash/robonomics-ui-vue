<template>
    <robo-text weight="bold">

        <robo-details 
            contentOffset
            :summaryIcon="summaryIcon"
            :summaryText="summaryText"
            summaryButtonSize='big'
            popup
            :popupTitle="popupTitle"
        >
        <robo-text weight="normal">Choose one of the prefferable extension:</robo-text>

        <template v-for="item in walletsList" :key="item.id">
            <robo-account-polkadot-extensions :wallet="item.wallet" />
        </template>

        </robo-details>
    </robo-text>
</template>

<script>
import { defineComponent } from 'vue'
import wallets from '../polkadotExtensions'

export default defineComponent({
    name: 'RoboAccountPolkadotConnect',

    props: {
        popupTitle: {
            type: String,
            default: 'Connect Polkadot account'
        },

        summaryIcon: {
            type: String,
            default: 'plus'
        },

        summaryText: {
            type: String,
            default: 'connect account'
        }
    },

    data() {
      return {
        walletsList: wallets
      }
    },
})
</script>
