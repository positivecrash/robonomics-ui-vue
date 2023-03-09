<template>      

    <robo-layout-section :width="(rws?.length < 1) ? 'narrow' : null" :vcenter="rws?.length < 1" :gcenter="rws?.length < 1">
        <template v-if="rws?.length < 1">
            <robo-template-devices-empty />
            <robo-section offset="x2">
                <robo-template-rws-setup-backup />
            </robo-section>
        </template>

        <temlate v-if="rws?.length > 0">
            <robo-template-devices-dashboard 
                @before-update="beforeUpdate"
                @on-update="onUpdate"
                @after-update="afterUpdate"

                :config = "config"
                :datalog = "datalog"
            />

            <robo-section offset="x2">
                <robo-template-devices
                    :config = "config"
                    :telemetry = "datalog"
                />
            </robo-section>
        </temlate>
    </robo-layout-section>

</template>

<script>
  export default { name: 'RoboTemplateDevicesLayout' }
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    config: {
        type: [Object, String]
    },
    datalog: {
        type: [Object, String]
    },

    beforeUpdate: {
        type: Function
    },
    onUpdate: {
        type: Function
    },
    afterUpdate: {
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

</script>