<template>
    <robo-select 
        :options="rwsNames" 
        :values="rwsOwners" 
        v-model="rwsactiveModel" 
        @change="setActive()"
        v-bind="$attrs"
    />
</template>

<script>
  export default { name: 'RoboTemplateRwsActiveselect' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

/* + get rws */
const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})
/* + get rws */


store.dispatch('rws/getActive')
let rwsactiveModel = ref(store.state.robonomicsUIvue.rws.active)
onMounted( () => {
    watch(rwsactiveModel, value => {
        store.commit('rws/setActive', value)
    })
})
/* - get rws */

const rwsNames = computed( () => {
  return rws.value.map(item => {
    return item.name
  })
})

const rwsOwners = computed( () => {
  return rws.value.map(item => {
    return item.owner
  })
})

let setActive = () => {
    store.commit('rws/setActive', rwsactiveModel)
}

</script>