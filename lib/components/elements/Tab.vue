<template>
    <div 
      v-show="isActive"
      ref="tab"
      :class="classList" 
      :aria-hidden="! isActive"
      role="tabpanel"
    >
      <slot/>
    </div>
</template>

<script>
import { defineComponent, inject, onBeforeMount, watch, toRefs, ref } from 'vue'

export default defineComponent({
  name: 'RoboTab',

  props: {
    label: {
      type: String,
      default: ''
    },
    labelnumber: {
      type: Number,
    }
  },

  computed: {
    classList() {
      return {
        [`robo-tab`]: true
      };
    }
  },

  setup(props) {
    const tabsProvider = inject('tabs')
    const addTab = inject('addTab')
    let isActive = ref(false)

    onBeforeMount(() => {
      addTab({
        label: props.label,
        labelnumber: props.labelnumber,
      })
    })

    watch(tabsProvider, () => {
      tabsProvider.forEach((value) => {
        if( value.label === props.label ) {
          isActive.value = value.active  
        }
      })

    })

    return {
      ...toRefs(tabsProvider),
      isActive
    }
  },


})
</script>