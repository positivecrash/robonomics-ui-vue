<template>
    <robo-text weight="bold">

        <robo-details 

            :content="{
                closeOutOfFocus: true,
                offset: true
            }"

            :summary="{
                icon: summary.icon,
                text: summary.text
            }"

            :popup="{
              title: popup.title
            }"
        >
        <robo-text weight="normal">Choose one of the prefferable extension:</robo-text>

        <robo-account-polkadot-extensions extension="polkadot-js" />
        <robo-account-polkadot-extensions extension="talisman" />
        <robo-account-polkadot-extensions extension="subwallet-js" />

        </robo-details>
    </robo-text>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'RoboAccountPolkadotConnect',

    props: {
        popup: {
            type: Object,
            default: null,
            
            validator: function (value) {
                let valid = true;

                // title
                if( value.title && typeof value.title !== 'string') {
                    console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "popup.title", required String type')
                    valid = false
                }
                else if ( !value.title ) {
                    value.title = 'Connect Polkadot account'
                }

                return valid
            }
        },

        summary: {
            type: Object,
            default: null,
            
            validator: function (value) {
                let valid = true;

                if(value.button) {
                // button outlined
                if( value.button.outlined && typeof value.button.outlined !== 'boolean') {
                    console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.button.outlined", required Boolean type')
                    valid = false
                }

                // button size
                if( value.button.size && !['small', 'normal', 'big'].includes(value.button.size) ) {
                    console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.button.size". Current value:', value.button.size)
                    valid = false
                }

                // button type
                if( value.button.type && !['primary', 'ok', 'alarm', 'na'].includes(value.button.type) ) {
                    console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.button.type". Current value:', value.button.type)
                    valid = false
                }
                }

                // icon
                if( value.icon && typeof value.icon !== 'string') {
                console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.icon", required String type')
                valid = false
                }
                else if ( !value.icon ) {
                    value.icon = 'plus'
                }

                // // loading
                if( value.loading && typeof value.loading !== 'boolean') {
                console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.loading", required Boolean type')
                valid = false
                }
                else if ( !value.loading ) {
                value.loading = false
                }

                // text
                if( value.text && typeof value.text !== 'string') {
                console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.text", required String type')
                valid = false
                }
                else if ( !value.text ) {
                    value.text = 'connect account'
                }

                return valid
            }
        },
    }
})
</script>
