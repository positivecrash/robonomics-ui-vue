<template>
    <details
      v-if="$slots.default && summary"  
      :class="classes" 
      tabindex="0"
      ref="details"
      :open="open ? true : null"
    >
        <summary 
          class="robo-details-summary" 
          aria-expanded="true/false" 
          tabindex="0" 
          role="button"
          @click="doFixRatio">

          <robo-button
            v-if="summary.button"
            :iconLeft="summary.icon ? summary.icon : null"
            :outlined="summary.button.outlined ? true : false"
            :loading="summary.loading"
            :size="summary.button.size"
            :type="summary.button.type"
          >
            <span v-if="summary.text">
              {{summary.text}}
            </span>
          </robo-button>

          <div v-if="!summary.button && summary.text">
            <robo-icon 
              v-if="summary.icon && !summary.loading"
              :icon="summary.icon" 
            />

            <robo-loader v-if="summary.loading" />

            {{summary.text}}

            <robo-icon 
              v-if="type === 'inline'"
              icon="ellipsis" 
              class="robo-details-summary-switchicon" 
            />
          </div>

        </summary>

        <div class="robo-details-content" ref="content">

            <h3
              v-if="popup"
            >
              <template v-if="popup.title">
                {{popup.title}}
              </template>
              <template v-else>
                {{summary.text}}
              </template>
            </h3>

            <slot/>

            <robo-icon 
              @click="closeDetails"
              class="robo-details-content-close"
              icon="xmark"
              v-if="tooltip && tooltip.closeButton || popup"
            />
        </div>

        <div 
          v-if="popup && popup.overlay"
          class="robo-overlay" 
          aria-hidden="true"
          @click="closeDetails"
        />
    </details>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboDetails',

  props: {

    content: {
      type: Object,
      default: {},
      
      validator: function (value) {
        let valid = true;

        // closeOutOfFocus
        if( value.closeOutOfFocus && typeof value.closeOutOfFocus !== 'boolean') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "content.closeOutOfFocus", required Boolean type')
          valid = false
        }

        // offset
        if( value.offset && typeof value.offset !== 'boolean') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "content.offset", required Boolean type')
          valid = false
        }
        
        // textalign
        if( value.textalign && 
        !['justify', 'left', 'right', 'center'].includes(value.textalign) ) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "content.textalign". Current value:', value.textalign)
          valid = false
        } 
        else if ( !value.textalign ) {
          value.textalign = 'justify'
        }

        return valid
      }
    },

    open: {
      type: Boolean,
      default: false
    },

    popup: {
      type: Object,
      default: null,
      
      validator: function (value) {
        let valid = true;

        // overlay
        if( typeof value.overlay !== 'undefined' && typeof value.overlay !== 'boolean') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "popup.overlay", required Boolean type')
          valid = false
        }
        else if ( typeof value.overlay === 'undefined' ) {
          value.overlay = true
        }

        // title
        if( value.title && typeof value.title !== 'string') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "popup.title", required String type')
          valid = false
        }

        return valid
      }
    },

    summary: {
      type: Object,
      default: null,
      
      validator: function (value) {
        let valid = true;

        if(value.button) {
          // button outlined
          if( value.button.outlined && typeof value.button.outlined !== 'boolean') {
            console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.button.outlined", required Boolean type')
            valid = false
          }

          // button size
          if( value.button.size && !['small', 'normal', 'big'].includes(value.button.size) ) {
            console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.button.size". Current value:', value.button.size)
            valid = false
          }

          // button type
          if( value.button.type && !['primary', 'ok', 'alarm', 'na'].includes(value.button.type) ) {
            console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.button.type". Current value:', value.button.type)
            valid = false
          }
        }

        // icon
        if( value.icon && typeof value.icon !== 'string') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.icon", required String type')
          valid = false
        }

        // loading
        if( value.loading && typeof value.loading !== 'boolean') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.loading", required Boolean type')
          valid = false
        }
        else if ( !value.loading ) {
          value.loading = false
        }

        // text
        if( value.text && typeof value.text !== 'string') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.text", required String type')
          valid = false
        }

        return valid
      }
    },


    tooltip: {
      type: Object,
      default: null,
      
      validator: function (value) {
        let valid = true;

        // closeButton
        if( value.closeButton && typeof value.closeButton !== 'boolean') {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.closeButton", required Boolean type')
          valid = false
        } 
        else if ( !value.closeButton ) {
          value.closeButton = true
        }

        // placement
        // TODO: auto detection
        if( value.placement && 
        !['bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
          'start-top',
          'start-bottom',
          'end-top',
          'end-bottom'].includes(value.placement) ) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.placement". Current value:', value.placement)
          valid = false
        } 
        else if ( !value.placement ) {
          value.placement = 'bottom-start'
        }

        // ratio
        if( value.ratio && 
        !['auto', 'none'].includes(value.ratio) ) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.ratio". Current value:', value.ratio)
          valid = false
        } 
        else if ( !value.ratio ) {
          value.ratio = 'auto'
        }

        // theme
        if( value.theme && 
        !['dark',
          'light'].includes(value.theme) ) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.theme". Current value:', value.theme)
          valid = false
        } 
        else if ( !value.theme ) {
          value.theme = 'dark'
        }

        return valid
      }
    },

  },

  computed: {
    type() {
      if( this.tooltip ) {
        return 'tooltip'
      }
      if( this.popup ) {
        return 'popup'
      }
      else {
        return 'inline'
      }
    },

    classes() {
      let classes = {
        [`robo-details`]: true,
        [`robo-details--${this.type}`]: this.type,
        [`robo-details--closeOutOfFocus`]: this.content.closeOutOfFocus || this.tooltip,
      }

      if (this.content) {
        Object.assign(classes, {
          [`robo-details--offset`]: this.content.offset,
          [`robo-details--content-align--${this.content.textalign}`]: this.content.textalign,
        })
      }

      if (this.summary) {
        Object.assign(classes, {
          [`robo-details--loading`]: this.summary.loading
        })
      }

      if (this.tooltip) {
        Object.assign(classes, {
          [`robo-details--tooltip`]: this.tooltip,
          [`robo-details--tooltip-closable`]: this.tooltip.closeButton,
          [`robo-details--tooltip--${this.tooltip.placement}`]: this.tooltip.placement,
          [`robo-details--tooltip-theme--${this.tooltip.theme}`]: this.tooltip.theme,
        })
      }

      if (this.popup) {
        Object.assign(classes, {
          [`robo-details--popup`]: this.popup
        })
      }

      return classes
    }
  },

  methods: {
    /*!
    * Check if an element is out of the viewport
    * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param  {Node}  elem The element to check
    * @return {Object}     A set of booleans for each side of the element
    */
    isOutOfViewport(elem) {
      // Get element's bounding
      var bounding = elem.getBoundingClientRect();

      // Check if it's out of the viewport on each side
      var out = {};
      out.top = bounding.top < 0;
      out.left = bounding.left < 0;
      out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
      out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
      out.any = out.top || out.left || out.bottom || out.right;
      out.all = out.top && out.left && out.bottom && out.right;

      return out;
    },

    doFixRatio() {

      if(this.tooltip) {
        if(this.tooltip.ratio === 'auto' && this.type === 'tooltip') {
          let o = this

          /* wait for details openning */
          setTimeout( function(){

            if( o.$refs.details.open ) { 

                let tipContent = o.$refs.content
                let tipContentWidth = tipContent.offsetWidth || tipContent.clientWidth
                let tipContentHeight = tipContent.offsetHeight
                let ratio = tipContentHeight/tipContentWidth
                
                /* if the width is less than the height by more than 1.5 times, swap it for better view */
                if (ratio > 1.3 && ratio < 3 ) {
                  tipContent.style.width = tipContentHeight + 'px'
                  tipContent.style.maxHeight = tipContentWidth + 10 + 'px'
                  let out = o.isOutOfViewport(tipContent)

                  /* Try to catch if tip is going out the view */
                  if( out.left || out.right ) {
                    let bound = tipContent.getBoundingClientRect()
                    tipContent.style.width =  window.innerWidth - bound.left - 40 + 'px'
                  }

                }

                /* if the width is less than the height by more than 1.5 times, swap it for better view */
                if (ratio > 3 ) {
                  tipContent.style.width = tipContentWidth * 3 + 'px'
                  tipContent.style.maxHeight = tipContentHeight / 3 + 'px'
                  let out = o.isOutOfViewport(tipContent)

                  /* Try to catch if tip is going out the view */
                  if( out.left || out.right ) {
                    let bound = tipContent.getBoundingClientRect()
                    tipContent.style.width =  window.innerWidth - bound.left - 40 + 'px'
                  }

                }
            }
          }, 5)
        }
      }

    },

    closeDetails() {
      this.$refs.details.open = false
    }
  },

  mounted() {
    
        // Close all opened details on body click if this is Tooltip
    
        document.body.onclick = (e) => {
            const current = e.target.closest('.robo-details--closeOutOfFocus[tabindex="0"]'); //save clicked element to detect if it is our current detail

            document.body.querySelectorAll('.robo-details--closeOutOfFocus[tabindex="0"]')
                .forEach((e) => {
                    if(e !== current){ //we need this condition not to break details behavior
                        e.open = false
                    }
            })
        }
    }
  
})
</script>

<style>
  /* Tweak for card labels */
  .robo-card-label summary .robo-btn .robo-btn--part {
    --padding-v: calc(var(--space) * 0.18);
    --padding-g: calc(var(--space) * 0.5);
  }

  .robo-details[open] .robo-btn .robo-btn--part:nth-child(2n+1) {
    background-color: var(--background-hover);
    border-color: var(--border-hover);
    color: var(--color-hover);
  }

  .robo-details[open] .robo-btn .robo-btn--part:nth-child(2n+1) .robo-loader {
    --loader-color: var(--color-hover)
  }

  .robo-details[open] .robo-btn .robo-btn--part:nth-child(2n) {
    background-color: var(--background-2-hover);
    border-color: var(--border-2-hover);
    color: var(--color-2-hover);
  }

  .robo-details[open] .robo-btn .robo-btn--part:nth-child(2n) .robo-loader {
    --loader-color: var(--color-2-hover)
  }
</style>

<style scoped>
    .robo-details {
      --tipGap: 0;

        display: inline-block;
        position: relative;
    }

    .robo-details--offset {
      --tipGap: calc(var(--gap-text) * 0.4);
    }

    /* + SWITCHER STYLES */
    
    details summary::-webkit-details-marker,
    details summary::marker {
      display: none; 
      content: "";
    }

    summary {
      --color-text: var(--color-link);
      --color-text-hover: var(--color-dark);
      --color-text-active: var(--color-green);

      cursor: pointer;
      transition: 0.2s linear all;
      user-select: none;

      display: flex;
      align-items: center;
      align-content: center;
    }

    summary:hover {
      color: var(--color-text-hover);
    }

    summary > *:not(:last-child) {
      margin-right: calc(var(--space) * 0.5);
    }

    details[open] summary {
      color: var(--color-text-active);
    }

    .robo-details-summary-text {
      font-weight: bold;
    }

    .robo-btn {
      letter-spacing: 0;
      pointer-events: none;
      text-transform: none;
    }

    .robo-details--loading summary {
      pointer-events: none;
      cursor: not-allowed;
    }

    /* - SWITCHER STYLES */


    /* + INLINE */
    .robo-details--inline summary {
      transition: margin 600ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    .robo-details--popup summary {
      color: var(--color-text)
    }

    .robo-details--inline[open] summary {
      margin-bottom: var(--tipGap);
      /* margin-bottom: calc(var(--space)*0.5); */
    }

    .robo-details--inline:not(:last-child) {
      margin-bottom: var(--space);
    }

    .robo-details-summary-switchicon {
      transition: 0.2s linear transform;
      transform: rotate(90deg);
      color: var(--color-link);
    }

    .robo-details--inline[open] .robo-details-summary-switchicon {
      transform: rotate(0);
    }
    /* - INLINE */


    /* + TOOLTIP */
    .robo-details--tooltip {
      position: relative;
    }

    .robo-details--tooltip .robo-details-content {
      --tip-content-padding: calc(var(--space) * 0.5);
      font-size: inherit;
      max-width: 450px;
      max-height: 450px;
      overflow: auto;
      position: absolute;
      padding: var(--tip-content-padding);
      z-index: 1000;
    }

    /* + position */
    .robo-details--tooltip--bottom-start .robo-details-content {
      top: calc(100% + var(--tipGap));
      left: 0;
    }

    .robo-details--tooltip--bottom-end .robo-details-content {
      top: calc(100% + var(--tipGap));
      right: 0;
    }

    .robo-details--tooltip--top-start .robo-details-content {
      bottom: calc(100% + var(--tipGap));
      left: 0;
    }

    .robo-details--tooltip--top-end .robo-details-content {
      bottom: calc(100% + var(--tipGap));
      right: 0;
    }

    .robo-details--tooltip--start-top .robo-details-content {
      bottom: 0;
      right: calc(100% + var(--tipGap));
    }

    .robo-details--tooltip--start-bottom .robo-details-content {
      top: 0;
      right: calc(100% + var(--tipGap));
    }
    
    .robo-details--tooltip--end-top .robo-details-content {
      bottom: 0;
      left: calc(100% + var(--tipGap));
    }

    .robo-details--tooltip--end-bottom .robo-details-content {
      top: 0;
      left: calc(100% + var(--tipGap));
    }
    /* - position */


    /* + position animation */
    .robo-details--tooltip--bottom-start .robo-details-content,
    .robo-details--tooltip--bottom-end .robo-details-content {
      transform: translateY(5%);
      opacity: 0;
    }

    .robo-details--tooltip--bottom-start[open] .robo-details-content,
    .robo-details--tooltip--bottom-end[open] .robo-details-content {
      animation: TooltipBottom 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
    }

    @keyframes TooltipBottom {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }


    .robo-details--tooltip--top-start .robo-details-content,
    .robo-details--tooltip--top-end .robo-details-content {
      transform: translateY(-5%);
      opacity: 0;
    }

    .robo-details--tooltip--top-start[open] .robo-details-content,
    .robo-details--tooltip--top-end[open] .robo-details-content {
      animation: TooltipTop 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
    }

    @keyframes TooltipTop {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .robo-details--tooltip--start-top .robo-details-content,
    .robo-details--tooltip--start-bottom .robo-details-content {
      transform: translateX(5%);
      opacity: 0;
    }

    .robo-details--tooltip--start-top[open] .robo-details-content,
    .robo-details--tooltip--start-bottom[open] .robo-details-content {
      animation: TooltipStartEnd 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
    }

    .robo-details--tooltip--end-top .robo-details-content,
    .robo-details--tooltip--end-bottom .robo-details-content {
      transform: translateX(-5%);
      opacity: 0;
    }

    .robo-details--tooltip--end-top[open] .robo-details-content,
    .robo-details--tooltip--end-bottom[open] .robo-details-content {
      animation: TooltipStartEnd 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
    }

    @keyframes TooltipStartEnd {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* - position animation */


    /* + theme */
    .robo-details--tooltip-theme--dark.robo-details--tooltip[open] summary {
      --color-background-active: var(--color-dark);
      --color-border-active: var(--color-dark);
    }

    .robo-details--tooltip-theme--dark.robo-details--tooltip .robo-details-content {
      background-color: var(--color-dark);
      color: var(--color-light);
    }

    /* .robo-details--tooltip-theme--dark.robo-details--tooltip .robo-details-content a {
      color: var(--color-green);
      text-decoration: underline;
    } */

    .robo-details--tooltip-theme--light.robo-details--tooltip[open] summary {
      --color-text-active: var(--color-dark);
      --color-background-active: var(--color-light);
      --color-border-active: var(--color-light);
    }

    .robo-details--tooltip-theme--light.robo-details--tooltip .robo-details-content {
      background-color: var(--color-light);
      color: var(--color-dark);
    }
    /* - theme */

    /* + closing */
    .robo-details--tooltip-closable .robo-details-content {
      padding-right: calc(var(--tip-content-padding)*2 + 0.8rem);
    } 

    .robo-details--tooltip-closable .robo-details-content-close {
      right: var(--tip-content-padding);
      top: var(--tip-content-padding);
    }
    /* - closing */

    /* - TOOLTIP */


    /* + CLOSING */
    .robo-details-content-close {
      cursor: pointer;
      position: absolute;
    }
    /* - CLOSING */


    /* + ALIGN CONTENT */
    .robo-details--content-align--justify .robo-details-content {
      text-align: justify !important;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
    }

    .robo-details--content-align--left .robo-details-content {
      text-align: left;
    }

    .robo-details--content-align--right .robo-details-content {
      text-align: right;
    }

    .robo-details--content-align--center .robo-details-content {
      text-align: center;
    }
    /* - ALIGN CONTENT */


    /* + POPUP */
    
    .robo-details--popup .robo-details-content {
      --popup-content-padding: var(--space);
      --popup-content-width: 450px;

      background-color: var(--color-light);
      border-radius: var(--border-radius);
      color: var(--color-dark);
      left: calc(50% - var(--popup-content-width)/2);
      opacity: 0;
      overflow: auto;
      padding: var(--popup-content-padding);
      padding-right: calc(var(--popup-content-padding)*2 + 0.8rem);
      position: fixed;
      top: calc(var(--space) * 3);
      transform: translateY(-50%);
      width: var(--popup-content-width);
      z-index: 1001;
    }

    .robo-details--popup[open] .robo-details-content {
      animation: popup 0.3s linear 0.1s forwards;
    }

    @keyframes popup {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .robo-details--popup .robo-details-content-close {
      right: var(--popup-content-padding);
      top: var(--popup-content-padding);
    }

    @media screen and (max-width: 470px) {
      .robo-details--popup .robo-details-content {
        left: var(--space);
        right: var(--space);
        width: auto;
      }
    }

    .robo-details--popup h3 {
      margin-bottom: var(--gap-text);
    }
    /* - POPUP */

</style>

<style>
.robo-details--tooltip-theme--dark.robo-details--tooltip .robo-details-content a {
      color: var(--color-green);
      text-decoration: underline;
    }
</style>