<template>

    <template v-if="rws?.length < 1">
        <robo-layout-section rwsrecover>
            <robo-section width="narrow" gcenter>
                <robo-template-devices-empty />
            </robo-section>
        </robo-layout-section>
    </template>

    <template v-if="rws?.length > 0">
        <robo-layout-section v-if="!config || !datalog" gcenter vcenter>
            <robo-loader size="2" />
        </robo-layout-section>

        <robo-layout-section v-if="config && datalog">
            <robo-template-devices-dashboard 
                @on-update="onUpdate"
                :config = "config"
            />

            <robo-section offset="x2">
                <robo-template-devices :config = "config" />
            </robo-section>
        </robo-layout-section>
        
    </template>

</template>

<script>
  export default { name: 'RoboTemplateDevicesLayout' }
</script>

<script setup>
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
    config: {
        type: [Object, String]
    },
    datalog: {
        type: [Object, String]
    },

    onUpdate: {
        type: Function
    },
})


/* + get rws */
import { useStore } from 'vuex'
const store = useStore()

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})
/* - get rws */

onMounted ( () => {
    watch(() => props.datalog, value => {
      store.commit('rws/setTelemetry', value)
    })
})

</script>