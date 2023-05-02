<template>

    <template v-if="rws?.length < 1">
        <robo-layout-section rwsrecover>
            <robo-section width="narrow" gcenter>
                <robo-template-devices-empty />
            </robo-section>
        </robo-layout-section>
    </template>

    <template v-if="rws?.length > 0">
        <robo-layout-section>
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
import { computed, onBeforeMount, onMounted } from 'vue'

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

onBeforeMount( () => {
    store.commit('rws/setTelemetry', props.datalog)
})

// onMounted ( () => {
//     console.log('devicelayout datalog', props.datalog)
//     console.log('devicelayout config', props.config)
// })

</script>