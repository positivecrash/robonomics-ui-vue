<template>
    <div :class="classList">

      <div
        role="tablist" 
        aria-labelledby="tablist"
        v-if="tabs"
      >
        <robo-button  
          v-for="(tab, i) in tabs" 
          :key="i"
          @click="selectTab(i)"

          clean
          :type="tab.active ? 'ok' : 'dark'"

          role="tab" 
          :aria-selected="tab.active" 
          :aria-controls="`tabpanel-${i}`"
        >
          {{tab.label}}
        </robo-button>
      </div>

      <slot/>
    </div>
</template>

<script>
import { defineComponent, reactive, provide, onMounted, toRefs } from 'vue'

export default defineComponent({
  name: 'RoboTabs',

  computed: {
    classList() {
      return {
        [`robo-tabs`]: true
      };
    }
  },

  setup() {
    const state = reactive({
      tabs: []
    })

    provide('tabs', state.tabs)
    
    provide('addTab', (tab) => {
      if( !tab.active ) {
        tab.active = false
      }
      state.tabs.push(tab)
    })

    const selectTab = (index) => {
      state.tabs.forEach(tab => {
        tab.active = false
      })

      state.tabs[index].active = true
    }

    onMounted( () => {
      if (!state.tabs.length) {
        return;
      }

      if( state.tabs.findIndex((tab) => tab.active === true) < 0 ) {
        state.tabs[0].active = true
      }
    })

    return {
      ...toRefs(state),
      selectTab
    }
  }

})
</script>

<style scoped>

div[role="tablist"] .robo-button {
  margin-right: var(--gap-text);
}

div[role="tablist"] .robo-button:last-child {
  margin-right: 0;
}

</style>