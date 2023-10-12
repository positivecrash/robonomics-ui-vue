<template>
  <component
    :is="componentType"
    :to="props.router ? { path: props.router } : null"
    :href="props.href ? props.href : null"
    :class="classes"
    :disabled="props.disabled ? true : null"
    :target="isExternal ? '_blank' : null"
    :rel="isExternal ? 'noopener' : null"
    v-bind="$attrs"
  >
    <slot name="iconleft" />

    <div class="robo-button-content">
      <robo-loader v-if="props.loading" />
      <slot />
    </div>

    <slot name="iconright" />

    <span class="robo-button-badge" v-if="slots.badge"><slot name="badge" /></span>
</component>
  

</template>

<script>
  export default { name: 'RoboButton' }
</script>

<script setup>
  import { defineProps, computed, useSlots } from 'vue'

  const slots = useSlots()

  const props = defineProps({
    block: {
      type: Boolean,
      default: false
    },
    clean: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fitLabeled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    router: {
      type: [Object,String],
      default: null
    },
    size: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return ['small', 'normal', 'large'].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'ok', 'error', 'na'].indexOf(value) !== -1;
      }
    }
  })

  const componentType = computed( () => {
    if(props.href) {
      return 'a'
    }

    if(props.router) {
      return 'router-link'
    }

    if(!props.href && !props.router) {
      return 'button'
    }

  })

  const classes = computed( () => {
    return {
      [`robo-button`]: true,
      [`robo-button-${props.type}`]: true,
      [`robo-button-solid`]: !props.outline,
      [`robo-button-outline`]: props.outline,
      [`robo-button-block`]: props.block,
      [`robo-button-clean`]: props.clean,
      [`robo-button-size-${props.size}`]: props.size,
    }
  })

  const disableStatus = computed( () => {
    if(props.disabled) {
      return true
    }
  })

  const isExternal = computed( () => {
    if( props.href ) {
        const parser = document.createElement('a')
        parser.href = props.href
        if ( parser.host !== window.location.host ) {
          return true
        }
      }
  })
</script>


<style>
  /* for outside rewriting */
  :root {
    --robo-button-fontsize: var(--robo-input-fontsize);
    --robo-button-padding: calc(var(--robo-input-padding) * 1.5);
    --robo-button-outlinewidth: 1.5px;

    --robo-button-background: var(--robo-color-blue);
    --robo-button-color: var(--robo-color-light);
    --robo-button-background-hover: var(--robo-color-blue-110);

    --robo-button-ok-background: var(--robo-color-green);
    --robo-button-ok-color: var(--robo-color-light);
    --robo-button-ok-background-hover: var(--robo-color-green-110);

    --robo-button-error-background: var(--robo-color-red);
    --robo-button-error-color: var(--robo-color-light);
    --robo-button-error-background-hover: var(--robo-color-red);
  }

  .robo-button-content > span:not(:first-child) {
    padding-left: var(--robo-button-padding);
  }
</style>


<style scoped>

.robo-loader {
  margin-right: var(--robo-button-padding);
}

.robo-button-size-small {
  /* --robo-button-fontsize: calc(var(--robo-input-fontsize) * 0.8); */
  --robo-button-padding: calc(var(--robo-input-padding) * 0.6);
}

.robo-button-size-large {
  --robo-button-fontsize: calc(var(--robo-input-fontsize)*2);
  --robo-button-padding: calc(var(--robo-input-padding)*2);
}

.robo-button {
  align-content: center;
  appearance: none;
  border-style: solid;
  border-width: var(--robo-button-outlinewidth);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--font-family);
  font-size: var(--robo-button-fontsize);
  font-weight: 500;
  gap: var(--robo-space);
  justify-content: center;
  line-height: 1.2;
  padding: var(--robo-button-padding);
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}

.robo-button-content {
  display: inline-flex;
}

.robo-button-badge {
  align-content: center;
  align-items: center;
  background-color: var(--robo-color-red);
  border-radius: 22px;
  color: var(--robo-color-light);
  display: flex;
  font-size: 12px;
  height: 22px;
  justify-content: center;
  position: absolute;
  right: -8px;
  top: -8px;
  white-space: nowrap;
  width: 22px;
}

  .robo-button-block {
    display: block;
    width: 100%;
  }

  .robo-button[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
  }


  /* + coloring */

  .robo-button.robo-button-solid {
    background-color: var(--robo-button-background);
    color: var(--robo-button-color);
    border-color: var(--robo-button-background);
  }

  .robo-button.robo-button-solid:hover {
    background-color: var(--robo-button-background-hover);
    border-color: var(--robo-button-background-hover);
  }

   .robo-button.robo-button-outline,
   .robo-button.robo-button-solid.robo-button-clean {
    color: var(--robo-button-background);
   }

   .robo-button.robo-button-outline:hover,
   .robo-button.robo-button-solid.robo-button-clean:hover {
    color: var(--robo-button-background-hover);
   }

  .robo-button.robo-button-outline {
    background-color: transparent;
    border-color: var(--robo-button-background);
  }

  .robo-button.robo-button-outline:hover {
    border-color: var(--robo-button-background-hover);
  }

  .robo-button.robo-button-clean,
  .robo-button.robo-button-clean:hover {
    --robo-button-padding: 0;
    background-color: transparent;
    border-color: transparent;
  }

  .robo-button-ok {
    --robo-button-background: var(--robo-button-ok-background);
    --robo-button-color: var(--robo-button-ok-color);
    --robo-button-background-hover: var(--robo-button-ok-background-hover);
  }

  .robo-button-error {
    --robo-button-background: var(--robo-button-error-background);
    --robo-button-color: var(--robo-button-error-color);
    --robo-button-background-hover: var(--robo-button-error-background-hover);
  }
  /* - coloring */

  .robo-button-content {
    align-self: center;
  }
</style>