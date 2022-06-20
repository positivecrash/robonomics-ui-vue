<template>
    <component 
      :is="href ? 'a' : 'div'"
      :href="href"
      :class="classList"
      :target="external() ? '_blank' : null"
      :rel="external() ? 'noopener' : null"
    >

        <svg class="robo-logo-sign" aria-hidden="true" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.5 40" style="enable-background:new 0 0 45.5 40;" xml:space="preserve">
            <path class="stroke" d="M23,1.4L1.5,38.7h43.1L23,1.4z"/>
            <path class="fill" d="M43.3,37.1c0.8-0.4,1.7,0,2,0.7c0.4,0.8,0,1.7-0.7,2s-1.7,0-2-0.7c0,0,0,0,0,0C42.2,38.4,42.5,37.5,43.3,37.1C43.3,37.1,43.3,37.1,43.3,37.1"/>
            <path class="fill" d="M23.1,0c0.8,0,1.5,0.7,1.5,1.5S23.9,3,23.1,3c-0.8,0-1.5-0.7-1.5-1.5c0,0,0,0,0,0C21.5,0.7,22.2,0,23.1,0"/>
            <path class="fill" d="M1.5,37C2.4,37,3,37.6,3,38.5S2.4,40,1.5,40S0,39.3,0,38.5c0,0,0,0,0,0C0,37.6,0.7,37,1.5,37C1.5,37,1.5,37,1.5,37"/>
            <path class="fill" d="M13.8,32.1h18.8l-9.4-5L13.8,32.1z"/>
            <path class="fill" d="M22.9,15l-9.6,16.6l9.6-5L22.9,15z"/>
            <path class="fill" d="M33.1,31.5L23.6,15l0.1,11.4L33.1,31.5z"/>
        </svg>

        <div v-if="title" class="robo-logo-text">
            <b>Robonomics Dapp</b>
            <span>Manage your IoT with Robonomics Services</span>
        </div>

    </component>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLogo',

  props: {
    href: {
      type: String,
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    mediaMobile: {
      type: String,
      default: 'none',
      validator: function (value) {
        return ['none', 'collapse', 'transfer'].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-logo`]: true,
        [`robo-logo--link`]: this.href,
        [`robo-logo--vertical`]: this.vertical,
        [`robo-logo--title`]: this.title,
        [`robo-logo--animate`]: this.animate,
        [`robo-logo--light`]: this.light,
        [`robo-logo--media-${this.mediaMobile}`]: this.mediaMobile,
      };
    }
  },

  methods: {
    external() {
      
      if( this.href ) {
        let parser = document.createElement('a')
        parser.href = this.href
        if (  parser.host !== window.location.host ) {
          return true
        }
      }
    }
  }

})
</script>

<style scoped>

    .robo-logo {
        display: inline-block;
        vertical-align: middle;
    }

    /* sign */
    .robo-logo-sign {
        width: 100%;
        height: 100%;
        max-width: 3.5rem;
    }

    .robo-logo-sign .stroke {
        fill: none;
        stroke: var(--color-text);
        stroke-width: 0.3;
        stroke-miterlimit: 10;
    }
    /* end of sign */

    /* title */
    /* .robo-logo-title {
        max-width: 12rem;
    } */

    .robo-logo-text span, .robo-logo-text b {
        display: block;
    }

    .robo-logo-text b {
        font-size: calc(var(--font-size) * 0.8);
    }

    .robo-logo-text span {
        font-weight: 300;
        font-size: calc(var(--font-size) * 0.5);
    }

    /*end of title */

    /* logo -- link */
    .robo-logo--link {
        text-decoration: none;
        transition: all 0.3s ease-out;
    }

    .robo-logo--link:hover {
        color: var(--color-link)
    }

    .robo-logo--link:hover .robo-logo-sign .stroke {
        stroke: var(--color-link);
    }

    .robo-logo--link:hover .robo-logo-sign .fill {
        fill: var(--color-link);
    }
    /* end of logo -- link */
    
    /* logo with title */
    .robo-logo--title {
        display: grid;
        grid-template-columns: var(--size-logo-title-gorizontal) 1fr;
        gap: var(--space);
        text-align: left;
        color: var(--color-text);
    }
    /* end of logo with title */

    /* logo with title -- vertical */
    .robo-logo--title.robo-logo--vertical {
        grid-template-columns: none;
        grid-template-rows: 6rem 1fr;
        justify-content: center;
        justify-items: center;
        align-content: center; 
        align-items: center;
        text-align: center;
    }

    /* .robo-logo--title.robo-logo--vertical .robo-logo-title {
        max-width: 600px;
    } */
    /* end of logo with title -- vertical */

    /* logo -- animate */
    .robo-logo--animate .robo-logo-sign .stroke {
        stroke-dasharray: 100;
        stroke-dashoffset: 1000;
        animation: svgStrokeDash 10s linear 0.3s infinite;
    }
    /* end of logo -- animate */

    /* logo -- title -- animate */
    .robo-logo--animate.robo-logo--title .robo-logo-title span,
    .robo-logo--animate.robo-logo--title .robo-logo-title b
    {
        transform: translateY(1rem);
        visibility: hidden;
		    opacity: 0;
    }

    .robo-logo--animate.robo-logo--title .robo-logo-title b {
        animation: FadeIn 0.4s linear 0.2s forwards, TrasnalteYnone 0.4s linear 0.2s forwards;
    }

    .robo-logo--animate.robo-logo--title .robo-logo-title span {
        animation: FadeIn 0.3s var(--animation-bump) 0.5s forwards, TrasnalteYnone 0.3s var(--animation-bump) 0.5s forwards;
    }
    /* end of logo -- title -- animate */

    .robo-logo--light .robo-logo-sign .stroke {
      stroke: var(--color-card-background);
    }
    .robo-logo--light .robo-logo-sign .fill {
      fill: var(--color-card-background);
    }

    .robo-logo--light.robo-logo--title {
      color: var(--color-card-background);
    }

    .robo-logo--light.robo-logo--link:hover {
        color: var(--color-card-background)
    }

    .robo-logo--light.robo-logo--link:hover .robo-logo-sign .stroke {
        stroke: var(--color-card-background);
    }

    .robo-logo--light.robo-logo--link:hover .robo-logo-sign .fill {
        fill: var(--color-card-background);
    }


    /* MEDIA */
    @media screen and (max-width: 700px) {
      .robo-logo--media-collapse .robo-logo-text {
        display: none;
      }

      .robo-logo--title {
        display: block;
      }
    }
    /* end of MEDIA */
</style>