<template>
    <robo-card :paddings="false" :class="classes">
        <component 
            v-if="picture && !router"
            :is="href ? 'a' : 'div'"

            :href="href ?? null"
            :target="(href && external()) ? '_blank' : null"
            :rel="(href && external()) ? 'noopener' : null"
        >
            <img 
                :alt="title ?? 'Robonomics Dapp Service'" 
                :src="picture" 
            />
        </component>

        <router-link 
            v-if="picture && router"
            :to="router"
        >
            <img 
                :alt="title ?? 'Robonomics Dapp Service'" 
                :src="picture" 
            />
        </router-link>

        <h3 v-if="title">
            <a 
                v-if="href" 

                :href="href" 
                :target="external() ? '_blank' : null"
                :rel="external() ? 'noopener' : null"
            >
            {{title}}
            </a>

            <router-link 
                v-if="router" 
                
                :to="router"
            >
                {{title}}
            </router-link>

            <template v-if="!href && !router">{{title}}</template>
        </h3>

        <robo-text 
            v-if="$slots.default" 
            size="small"
        >
            <slot/>
        </robo-text>

        <robo-text v-if="providers" class="providers" size="small">
            <!-- <robo-icon icon="screwdriver-wrench" /> -->

            <component 
                :is="provider.link ? 'a' : 'span'" 
                v-for="(provider,index) in providers" 
                :key="index"
                :href="provider.link ?? null"
                :target="(provider.link && external()) ? '_blank' : null"
                :rel="(provider.link && external()) ? 'noopener' : null"
            >{{provider.name}}</component>
        </robo-text>

        <robo-text 
            v-if="label !== 'none'"
            class="label"
            highlightLabel="success"
            size="small"
            weight="bold"
        >
            {{label}}
        </robo-text>

    </robo-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboTemplateServicesItem',

  props: {
      href: {
          type: String
      },
      label: {
        type: String,
        default: 'none',
        validator(value) {
            return ['none', 'demo'].includes(value)
        }
      },
      picture: {
          type: String
      },
      providers: {
          type: Object
      },
      router: {
          type: String
      },
      title: {
          type: String
      },
  },


  computed: {
    classes() {
      return {
        [`robo-template-service-item`]: true
      };
    }
  },

  methods: {
    external() {
      
      if( this.href ) {
        let parser = document.createElement('a')
        parser.to = this.href
        if (  parser.host !== window.location.host ) {
          return true
        }
      }
    }
  }
})
</script>

<style scoped>

.robo-template-service-item {
    position: relative;
}

.robo-template-service-item:hover {
    font-weight: bold;
    transition: 0.2s linear all;
}

.robo-template-service-item .label {
    display: inline;
    line-height: 1;
    pointer-events: none;
    position: absolute;
    right: calc(var(--space) * 0.5);
    text-transform: uppercase;
    top: calc(var(--space) * 0.5);
}

.robo-template-service-item .providers {
    margin-top: var(--space)
}

.robo-template-service-item h3 {
    margin-bottom: var(--space);
}

.robo-template-service-item .providers a:not(:last-child), .robo-template-service-item .providers span:not(:last-child), .robo-template-service-item .providers .icon {
    margin-right: calc(var(--space) * 2)
}

/* .robo-template-service-item .providers a, .robo-template-service-item .providers span {
    white-space: nowrap;
} */
</style>