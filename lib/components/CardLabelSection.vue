<template>
    <div
        :class="classList"
        tabindex="0"
    >

        <div 
          v-if="!selectOptions && !info" 
          class="robo-card-label-section-content"
        >
          <slot/>
        </div>
        

        <robo-details 
          v-if="info" 
          :summary="{
              text: 'i',
              button: {
                size: 'small'
              }
          }"
          :tooltip="{}"
        >
          <slot/>
        </robo-details>


        <robo-select 
          v-if="selectOptions && selectName" 
          :options="selectOptions" 
          :name="selectName"
          v-model="selectModel"
        />
        
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboCardLabelSection',

  props: {
    info: {
      type: Boolean,
      default: false
    },
    selectModel: {
      type: String,
      default: null
    },
    selectName: {
      type: String,
      default: null
    },
    selectOptions: {
      type: Array,
      default: null
    },
    status: {
      type: String,
      default: null,
      validator(value) {
        // The value must match one of these strings
        return ['ok', 'error', 'na'].includes(value)
      }
    },
    
  },

  computed: {
    classList() {
      return {
        [`robo-card-label-section`]: true,
        [`robo-card-label-section--status`]: this.status,
        [`robo-card-label-section--${this.status}`]: this.status,
        [`robo-card-label-section--info`]: this.info,
        [`robo-card-label-section--select`]: this.selectOptions,
      };
    }
  }

})
</script>

<style scoped>
  .robo-card-label-section {
    --padding: calc(var(--space) * 0.6);

    padding-left: var(--padding);
    padding-right: var(--padding);
    height: 100%;
    line-height: var(--card-label-height);
    position: relative;
  }

  /* .robo-card--solid .robo-card-label-section:not(:first-child) {
    border-left: 1px solid var(--card-border-color);
  } */
  .robo-card-label-section:not(:first-child) {
    border-left: 1px solid var(--card-border-color);
  }

  .robo-card-label-section--status {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-card-background);
  }

  .robo-card-label-section--ok {
    background-color: var(--color-green);
  }

  .robo-card-label-section--error {
    background-color: var(--color-red);
  }

  .robo-card-label-section--na {
    background-color: var(--color-gray);
  }


  select {
    padding-left: var(--padding);
    padding-right: var(--padding);
    cursor: pointer;
    max-height: 100%;
  }

  select {
    background-color: var(--color-link);
    color: var(--color-card-background);
  }

  .robo-card-label-section--info, .robo-card-label-section--select {
    padding-left: 0;
    padding-right: 0;
  }

  .robo-details {
    height: 100%;
  }

  .robo-details:not([open]) {
    overflow: hidden;
  }
</style>

<style>

  .robo-card-label-section .robo-select, .robo-card-label-section .robo-select select {
    color: var(--color-card-background) !important;
    display: block !important;
    height: 100% !important;
  }

  .robo-card-label-section .robo-select {
    background-color: var(--color-link) !important;
    border-width: 0 !important;
  }

  .robo-card-label-section .robo-select select {
    font-size: calc(var(--font-size)*.7) !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-left: var(--padding) !important;
    padding-right: calc(var(--select-tog-size) + var(--padding)) !important;
  }

</style>