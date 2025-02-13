<template>

    <robo-section>
        <robo-input
            type="text"
            v-bind="$attrs"
            v-model="addressModel"
        />
        <robo-icon v-if="!addressIsValid && addressLength > 0" icon="ban" color="var(--robo-color-red)" size="small" title="Check the address" />
    </robo-section>

</template>

<script>
  export default { name: 'RoboAddressPolkadot' }
</script>

<script setup>
    import { computed } from 'vue'
    import { isValidAddress } from '../polkadot/tools'

    import { useStore } from 'vuex'
    const store = useStore()
    
    const props = defineProps({
        modelValue: {
            type: String
        }
    })

    const emit = defineEmits([
        'update:modelValue'
    ])

    const addressModel = computed({
        get: () => {
           if(props.modelValue) {
                return props.modelValue
           } else {
            console.warn('[robonomics-ui-vue3 warn]: `robo-address-polkadot` component is missing required v-model directive')
           }
        },
        set: value => {
            emit('update:modelValue', value)
        }
    })

    const addressIsValid = computed(() => {
        return isValidAddress(addressModel.value)
    })

    const addressLength = computed(() => {
        if(addressModel.value){
            return addressModel.value.length
        }
    })

</script>

<style scoped>
.robo-section {
    position: relative;
}

.robo-icon {
    position: absolute;
    top: 4px;
    right: 6px;
}
</style>