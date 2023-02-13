<template>

  <details :class="classes" tabindex="0" ref="details" :open="open ? true : null">
    <summary class="robo-details-summary" aria-expanded="false" tabindex="0" role="button" @click="doFixRatio">
      <robo-grid type="flex" offset="x0" gap="x025" valign="center">
        <slot name="summary" />
        <robo-icon v-if="toggler" icon="sort-down" class="robo-details-summary-toggler" />
      </robo-grid>
    </summary>
    
    <div class="robo-details-content" ref="content">
      <h3 class="robo-details-popup-title" v-if="popupTitle">{{popupTitle}}</h3>
      <div class="robo-details-content-inside"><slot/></div>
      <robo-icon class="robo-details-content-close" @click="closeDetails" tabindex="0" icon="xmark" v-if="props.type === 'tooltip' && tooltipCloseButton || props.type === 'popup'" />
    </div>

    <div 
      v-if="props.type === 'popup' && popupOverlay"
      class="robo-overlay" 
      aria-hidden="true"
      @click="closeDetails"
    />
  </details>

</template>

<script>
  export default { name: 'RoboDetails' }
</script>

<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'

const props = defineProps({
  contentCloseOutOfFocus: {
    type: Boolean,
    default: true
  },

  contentOffset: {
    type: Boolean,
    default: false
  },

  contentTextalign: {
    type: String,
    default: 'left',
    validator: function (value) {
      return ['justify', 'left', 'right', 'center'].includes(value)
    }
  },

  open: {
    type: Boolean,
    default: false
  },

  linkstyle: {
    type: Boolean,
    default: false
  },

  popupOverlay: {
    type: Boolean,
    default: true
  },

  popupTitle: {
    type: String,
    default: null
  },

  textStyle: {
    type: String,
    default: 'inherit',
    validator: function (value) {
      return ['inherit', 'initial'].includes(value)
    }
  },

  toggler: {
    type: Boolean,
    default: false
  },

  tooltipCloseButton: {
    type: Boolean,
    default: true
  },

  tooltipPlacement: {
    type: String,
    default: 'bottom-start',
    validator: function (value) {
      return ['bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'start-top',
        'start-bottom',
        'end-top',
        'end-bottom',
        'fix'].includes(value)
    }
  },

  tooltipRatio: {
    type: String,
    default: 'auto',
    validator: function (value) {
      return ['auto', 'none'].includes(value)
    }
  },

  type: {
    type: String,
    default: 'tooltip',
    validator: function (value) {
      return ['tooltip', 'popup', 'inital'].includes(value)
    }
  }
})

const details = ref(null)
const content = ref(null)
let tooltipPlacementValue = ref(props.tooltipPlacement)

const classes = computed( () => {
  
    let list = {
      [`robo-details`]: true,
      [`robo-details--${props.type}`]: props.type,
      [`robo-details--closeOutOfFocus`]: (props.type === 'popup') ? false : props.contentCloseOutOfFocus,
      [`robo-details--offset`]: props.contentOffset,
      [`robo-details--content-align--${props.contentTextalign}`]: props.contentTextalign,
      [`robo-details--loading`]: props.summaryLoading,
      [`robo-details--textStyle-${props.textStyle}`]: props.textStyle,
      [`robo-details--linkstyle`]: props.linkstyle,
    }  

    if (props.type === 'tooltip') {

      Object.assign(list, {
        [`robo-details--tooltip-closable`]: props.tooltipCloseButton,
        [`robo-details--tooltip--${tooltipPlacementValue.value}`]: tooltipPlacementValue.value,
      })
  
    }

    return list
})


/* + methods */
const isOutOfViewport = elem => {
  /*!
    * Check if an element is out of the viewport
    * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param  {Node}  elem The element to check
    * @return {Object}     A set of booleans for each side of the element
    */
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
}

const tooltipPlacementRecalc = watch => {
  let out

  if(watch==='any') {

    setTimeout( function(){
      out = isOutOfViewport(content.value)
      
      if(watch==='top' && out.top) {
        tooltipPlacementValue.value = 'fix'
      }
      
      if(out.any) {
        tooltipPlacementValue.value = 'fix'
      }

    }, 20)

  } else {

    setTimeout( function(){
      out = isOutOfViewport(content.value)
      
      if( 
        ( watch==='top' && out.top ) 
        || ( watch==='bottom' && out.bottom ) 
        || ( watch==='left' && out.left ) 
        || ( watch==='right' && out.right ) 
      ) {
        tooltipPlacementValue.value = 'fix'
      }

    }, 10)

  }
}

const doFixRatio = () => {

  if(props.type === 'tooltip') {

      /* wait for details openning */
      setTimeout( function() {

        if(details.value.open) { 

          let tipContent = content.value
          let tipContentWidth = tipContent.offsetWidth || tipContent.clientWidth
          let tipContentHeight = tipContent.offsetHeight
          let ratio = tipContentHeight/tipContentWidth
          let out
          
          if(props.tooltipRatio === 'auto') {
            /* if the width is less than the height by more than 1.5 times, swap it for better view */
            if (ratio > 1.3 && ratio < 3 ) {
              tipContent.style.width = tipContentHeight + 'px'
              tipContent.style.maxHeight = tipContentWidth + 10 + 'px'
              out = isOutOfViewport(tipContent)

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
              out = isOutOfViewport(tipContent)

              /* Try to catch if tip is going out the view */
              if( out.left || out.right ) {
                let bound = tipContent.getBoundingClientRect()
                tipContent.style.width =  window.innerWidth - bound.left - 40 + 'px'
              }

            }
          }


          /* if tip is out of view */
          out = isOutOfViewport(tipContent)

          // console.log('out.top', out.top, 'out.right', out.right, 'out.bottom', out.bottom, 'out.left', out.left)

          if(out.right && !out.left) {
            tooltipPlacementValue.value = tooltipPlacementValue.value.replace('start', 'end')
            /* recalc */
            tooltipPlacementRecalc('left')
          }

          if(!out.right && out.left) {
            tooltipPlacementValue.value = tooltipPlacementValue.value.replace('end', 'start')
            /* recalc */
            tooltipPlacementRecalc('right')
          }

          if(out.top && !out.bottom) {
            tooltipPlacementValue.value = tooltipPlacementValue.value.replace('top', 'bottom')
            /* recalc */
            tooltipPlacementRecalc('bottom')
          }

          if(!out.top && out.bottom) {
            tooltipPlacementValue.value = tooltipPlacementValue.value.replace('bottom', 'top')
            /* recalc */
            tooltipPlacementRecalc('top')
          }

          tooltipPlacementRecalc('any')

        }
    }, 5)
  }

}

const closeDetails = () => {
  details.value.open = false
}
/* - methods */



onMounted(() => {
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
})

</script>


<style>
  /* for outside rewriting */
  :root {
    --robo-details-content-padding: 0.7rem;
    --robo-details-popup-background: var(--robo-color-light);
    --robo-details-popup-color: var(--robo-color-dark);
    --robo-details-popup-content-offset: 3rem;
    --robo-details-popup-maxwidth: 650px;
    --robo-details-summary-background: transparent;
    --robo-details-summary-color: inherit;
    --robo-details-summary-padding: 0;
    --robo-details-tooltip-background: var(--robo-color-light);
    --robo-details-tooltip-color: var(--robo-color-dark);
    --robo-details-tooltip-border-color: var(--robo-color-dark);
    --robo-details-tooltip-content-offset: 0.4rem;
    --robo-details-tooltip-minheight: auto;
    --robo-details-tooltip-maxheight: 100vh;
    --robo-details-tooltip-minwidth: 200px;
    --robo-details-tooltip-maxwidth: 450px;
    --robo-details-summary-toggler-size: 80%;
  }

  @media (prefers-color-scheme: dark){
    :root {
      --robo-details-tooltip-background: var(--robo-color-light-95);
      --robo-details-tooltip-color: var(--robo-color-dark);
      --robo-details-tooltip-border-color: var(--robo-color-light);
    }
  }

  summary button {
    pointer-events: none;
  }
</style>

<style scoped>
  details {
    display: inline-block;
    position: relative;
  }


  /* + summary */
  details summary::-webkit-details-marker,
  details summary::marker {
    content: "";
    display: none; 
  }

  summary {
    background-color: var(--robo-details-summary-background);
    color: var(--robo-details-summary-color);
    cursor: pointer;
    fill: var(--robo-details-summary-color); /* for svgs inside */
    padding: var(--robo-details-summary-padding);
    transition: 0.2s linear all;
    user-select: none;
    vertical-align: middle;
  }

  details:not([open]):hover summary {
    opacity: 0.8;
  }

  .robo-details-summary-toggler {
    font-size: 40% !important;
  }
  /* - summary */

  /* + content */
  .robo-details-content {
    background-color: var(--robo-details-tooltip-background);
    color: var(--robo-details-tooltip-color);
    border: 1px solid var(--robo-details-tooltip-border-color);
    padding: var(--robo-details-content-padding);
  }

  .robo-details-content-inside {
    max-height: inherit;
    overflow: auto;
    padding: var(--robo-details-content-padding);
    position: relative;
  }
  /* - content */

  /* + actions */
  .robo-details--loading summary {
    pointer-events: none;
    cursor: not-allowed;
  }

  .robo-details-content-close {
    cursor: pointer;
    position: absolute;
    right: var(--robo-details-content-padding);
    top: var(--robo-details-content-padding);
  }

  .robo-details--tooltip-closable > .robo-details-content {
    padding-right: calc(var(--robo-details-content-padding) * 2 + 0.2rem) !important;
  }
  /* - actions */

  /* + tooltip */
  .robo-details--tooltip .robo-details-content {
    font-size: initial;
    letter-spacing: 0;
    min-height: var(--robo-details-tooltip-minheight);
    max-height: var(--robo-details-tooltip-maxheight);
    min-width: var(--robo-details-tooltip-minwidth);
    max-width: var(--robo-details-tooltip-maxwidth);
    overflow: hidden;
    position: absolute;
    text-transform: none;
    z-index: 1000;
  }
  /* - tooltip */

  /* + tooltip position */
  .robo-details--tooltip--bottom-start .robo-details-content {
    top: calc(100% + var(--robo-details-tooltip-content-offset));
    left: 0;
  }

  .robo-details--tooltip--bottom-end .robo-details-content {
    top: calc(100% + var(--robo-details-tooltip-content-offset));
    right: 0;
  }

  .robo-details--tooltip--top-start .robo-details-content {
    bottom: calc(100% + var(--robo-details-tooltip-content-offset));
    left: 0;
  }

  .robo-details--tooltip--top-end .robo-details-content {
    bottom: calc(100% + var(--robo-details-tooltip-content-offset));
    right: 0;
  }

  .robo-details--tooltip--start-top .robo-details-content {
    bottom: 0;
    right: calc(100% + var(--robo-details-tooltip-content-offset));
  }

  .robo-details--tooltip--start-bottom .robo-details-content {
    top: 0;
    right: calc(100% + var(--robo-details-tooltip-content-offset));
  }
  
  .robo-details--tooltip--end-top .robo-details-content {
    bottom: 0;
    left: calc(100% + var(--robo-details-tooltip-content-offset));
  }

  .robo-details--tooltip--end-bottom .robo-details-content {
    top: 0;
    left: calc(100% + var(--robo-details-tooltip-content-offset));
  }

  .robo-details--tooltip--fix .robo-details-content {
    font-size: initial;
    position: fixed;
    top: auto;
    bottom: 1px;
    left: 0;
    right: 0;
    max-width: 100%;
    max-height: 100svh;
  }
  /* - tooltip position */


  /* + tooltip position animation */
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
  /* - tooltip position animation */

  /* + popup */
  .robo-details--popup .robo-details-content {
    background-color: var(--robo-details-popup-background);
    color: var(--robo-details-popup-color);
    left: calc(50% - var(--robo-details-popup-maxwidth)/2);
    opacity: 0;
    overflow: auto;
    padding: var(--robo-details-content-padding);
    position: fixed;
    top: var(--robo-details-popup-content-offset);
    transform: translateY(-50%);
    width: var(--robo-details-popup-maxwidth);
    z-index: 1001;
  }

  @media screen and (max-width: 470px) {
    .robo-details--popup .robo-details-content {
      left: var(--space);
      right: var(--space);
      width: auto;
    }
  }

  .robo-details-popup-title {
    letter-spacing: 1px;
    padding: var(--robo-details-content-padding);
    text-transform: uppercase;
  }
  /* - popup */

  /* + popup animation */
  .robo-details--popup[open] .robo-details-content {
    animation: popup 0.3s linear 0.1s forwards;
  }

  @keyframes popup {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  /* - popup animation */

  .robo-details--linkstyle summary {
    color: var(--robo-color-blue);
    border-bottom: 1px dashed var(--robo-color-blue);
  }
</style>