<template>
    <div :class="classList">

      <div
        class="tablist"
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
          size="small"
          class="tab"

          role="tab" 
          :aria-selected="tab.active" 
          :aria-controls="`tabpanel-${i}`"
        >
          {{tab.label}}
          <span v-if="tab.labelnumber" class="tablabel">{{tab.labelnumber}}</span>
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

.tablist {
  margin-bottom: var(--robo-space);
  line-height: 1.8;
}

.tab {
  position: relative;
}

.tablabel {
  background-color: var(--robo-button-background);
  color: var(--robo-color-light);
  font-weight: bold;
  font-size: 70%;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -8px;
  right: -17px;
}

</style>