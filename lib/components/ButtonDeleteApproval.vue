<template>
  <robo-button 
    v-bind="$attrs"
    @blur="approve = false" 
    @click.prevent="approve ? deleteAction() : approve = true"
    size="small" 
    type="error"
    :outline="!approve"
  >

    <robo-icon icon="trash" />
    <robo-text v-if="slots.default && (approve || label)" :class="approve ? 'approval':null">
        <template v-if="approve || label"><slot /></template>
        <template v-if="approve"> ?</template>
    </robo-text>

  </robo-button>
</template>

<script>
  export default { name: 'RoboButtonDeleteApproval' }
</script>

<script setup>
import { ref, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
    action: {
      type: Function
    },
    label: {
        type: Boolean,
        default: false
    }
})

let approve = ref(false)

let deleteAction = () => {
  props.action()
  approve.value = false
}

</script>


<style scoped>
.approval {
  font-size: 80%;
  text-transform: none;
  text-align: left;
}
</style>