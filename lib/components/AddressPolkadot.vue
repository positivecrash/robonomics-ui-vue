<template>

    <robo-input
        type="text"
        v-bind="$attrs"
        v-model="addressModel"
    />

</template>

<script>
  export default { name: 'RoboAddressPolkadot' }
</script>

<script setup>
    import { defineProps, defineEmits, computed, ref } from 'vue'
    import { encodeAddress } from "@polkadot/util-crypto"
    
    import { useStore } from 'vuex'
    const store = useStore()
    
    const props = defineProps({
        address: {
            type: String
        },
        chain: {
            type: String
        }
    })

    const emit = defineEmits([
        'update:address'
    ])

    let chainCalc = ref(props.chain ? props.chain : store.state.robonomicsUIvue.polkadot.chain ?? '32')

    const addressModel = computed({
        get: () => {
            if(props.address && chainCalc.value) {
                return encodeAddress(props.address, chainCalc.value)
            }
        },
        set: value => {
            emit('update:address', encodeAddress(value, chainCalc.value))
        }
    })

</script>
