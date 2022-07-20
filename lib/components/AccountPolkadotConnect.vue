<template>
    <robo-text weight="bold">

        <robo-details 
            contentOffset
            :summaryIcon="summaryIcon"
            :summaryText="summaryText"
            popup
            :popupTitle="popupTitle"
        >
        <robo-text weight="normal">Choose one of the prefferable extension:</robo-text>

        <robo-account-polkadot-extensions extension="subwallet-js" />
        <robo-account-polkadot-extensions extension="talisman" />
        <robo-account-polkadot-extensions extension="polkadot-js" />

        </robo-details>
    </robo-text>
</template>

<script>
import { defineComponent } from 'vue'

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
    }
})
</script>
