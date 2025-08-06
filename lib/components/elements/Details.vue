<template>
  <details :class="classes" tabindex="0" ref="details" v-bind="$attrs" @click="clicked">
    <summary class="robo-details-summary" :aria-expanded="isOpened ? true : false" tabindex="0" role="button" @click="doFixRatio">
      <robo-grid type="flex" gap="x025" valign="center" galign="stretch">
        <slot name="summary" />
        <robo-icon :icon="toggleIcon" :class="togglerShow ? 'robo-details-summary-toggler' : null" />
      </robo-grid>
    </summary>
    
    <div class="robo-details-content" ref="content">
      <h3 class="robo-details-popup-title" v-if="popupTitle">{{popupTitle}}</h3>
      <robo-icon class="robo-details-content-close" @click="closeDetails" tabindex="0" icon="xmark" v-if="(props.type === 'tooltip' && tooltipCloseButton || props.type === 'popup') && summarystyle !== 'info'" />
      <div class="robo-details-content-inside"><slot/></div>
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
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({

  afterCloseDetails: {
    type: Function
  },

  block: {
    type: Boolean,
    default: false
  },

  contentCloseOutOfFocus: {
    type: Boolean,
    default: true
  },

  // contentCloseOutOfFocusDbl: {
  //   type: Boolean,
  //   default: false
  // },

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

  fitContent: {
    type: Boolean,
    default: false
  },

  popupMaxHeight: {
    type: String
  },

  popupMinWidth: {
    type: String
  },

  popupMinHeight: {
    type: String
  },

  popupOverlay: {
    type: Boolean,
    default: true
  },

  popupTitle: {
    type: String,
    default: null
  },

  summarystyle: {
    type: String,
    default: 'text',
    validator: function (value) {
      return ['text', 'link', 'select', 'info', 'expandlink'].includes(value)
    }
  },

  summarysize: {
    type: String,
    default: 'normal',
    validator: function (value) {
      return ['tiny', 'small', 'normal', 'large'].indexOf(value) !== -1;
    }
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
      return ['tooltip', 'popup', 'initial'].includes(value)
    }
  },

  doClose: {
    type: Boolean,
    default: false
  }
})

const details = ref(null)
const content = ref(null)
let tooltipPlacementValue = ref(props.tooltipPlacement)
const togglerShow = ref( (props.summarystyle === 'select' || props.summarystyle === 'info') ? true : props.toggler || props.toggler)

const classes = computed( () => {
  
    let list = {
      [`robo-details`]: true,
      [`robo-details--${props.type}`]: props.type,
      [`robo-details--offset`]: props.contentOffset,
      [`robo-details--content-align--${props.contentTextalign}`]: props.contentTextalign,
      [`robo-details--loading`]: props.summaryLoading,
      [`robo-details--textStyle-${props.textStyle}`]: props.textStyle,
      [`robo-details--summarystyle-${props.summarystyle}`]: props.summarystyle,
      [`robo-details--summarysize-${props.summarysize}`]: props.summarysize,
      [`robo-details--block`]: props.block,
      [`robo-details--fitContent`]: props.fitContent,
    }  

    if (props.type === 'tooltip') {

      Object.assign(list, {
        [`robo-details--tooltip-closable`]: props.tooltipCloseButton,
        [`robo-details--tooltip--${tooltipPlacementValue.value}`]: tooltipPlacementValue.value,
      })
  
    }

    return list
});

const toggleIcon = computed( () => {
  if(togglerShow.value) {
    return (props.summarystyle === 'info') ? 'circle-info' : 'select-arrow';
  }

  if(props.type === 'initial') {
    return isOpened.value ? 'arrowhead-top' : 'arrowhead-bottom';
  }
});

// const closeOnClick = computed(() =>
//   props.contentCloseOutOfFocus && !props.contentCloseOutOfFocusDbl
// )

// const closeOnDbl  = computed(() => props.contentCloseOutOfFocusDbl)

/* + methods */
const isOutOfViewport = elem => {
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

  if (props.type !== 'tooltip') return;

  setTimeout( function() {

    if (!details.value.open) return;

    let tipContent = content.value;
    let tipContentWidth = tipContent.offsetWidth || tipContent.clientWidth;
    let tipContentHeight = tipContent.offsetHeight;
    let ratio = tipContentHeight/tipContentWidth;
    let out;
    
    if(props.tooltipRatio === 'auto') {
      /* if the width is less than the height by more than 1.5 times, swap it for better view */
      if (ratio > 1.3 && ratio < 3 ) {
        if(!props.fitContent) {
          tipContent.style.width = tipContentHeight + 'px'
          tipContent.style.maxHeight = tipContentWidth + 10 + 'px'
        }
        
        out = isOutOfViewport(tipContent)

        /* Try to catch if tip is going out the view */
        if( out.left || out.right ) {
          let bound = tipContent.getBoundingClientRect()
          tipContent.style.width =  window.innerWidth - bound.left - 40 + 'px'
        }

      }

      /* if the width is less than the height by more than 1.5 times, swap it for better view */
      if (ratio > 3 ) {
        if(!props.fitContent) {
          tipContent.style.width = tipContentWidth * 3 + 'px'
          tipContent.style.maxHeight = tipContentHeight / 3 + 'px'
        }
        out = isOutOfViewport(tipContent)

        /* Try to catch if tip is going out the view */
        if( out.left || out.right ) {
          let bound = tipContent.getBoundingClientRect()
          tipContent.style.width =  window.innerWidth - bound.left - 40 + 'px'
        }

      }

          if(props.popupMaxHeight) {
            tipContent.style.maxHeight = props.popupMaxHeight
          }

          if(props.popupMinWidth) {
            tipContent.style.minWidth = props.popupMinWidth
          }

          if(props.popupMinHeight) {
            tipContent.style.minHeight = props.popupMinHeight
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
  }, 5);

}

const closeDetails = () => {
  details.value.open = false;
  isOpened.value = false;
  if(props.afterCloseDetails){
    props.afterCloseDetails()
  }
}
/* - methods */


const isOpened = ref(null);

const clicked = () => {
  setTimeout( function(){
    isOpened.value = details?.value?.open;
  }, 100)
}

watch(()=>props.doClose, doClose => {
  if(doClose) {
    closeDetails();
  }
});

const clickHandler = (e) => {

  if (!props.contentCloseOutOfFocus) return;
  if (!details.value) return;
  
  const path = e.composedPath();
  const host = path.find((n) =>
    n instanceof Element && n.classList?.contains('robo-details')
  );
  
  /* клик в другом details */
  if (host && host !== details.value) {
    details.value.open = false;
    return;
  }

  /* клик вне любого details */
  if (!host) {
    details.value.open = false;
  }
};

onMounted(() => {
  isOpened.value = details?.value?.open;
  document.body.addEventListener('click', clickHandler);
});


onUnmounted(() => {
  document.body.removeEventListener('click', clickHandler);
});

</script>


<style>
/* for outside rewriting */
:root {
  --robo-details-content-padding: 20px;
  --robo-details-popup-background: var(--robo-color-light);
  --robo-details-popup-color: var(--robo-color-dark);
  --robo-details-popup-content-offset: 3rem;
  --robo-details-popup-maxwidth: 650px;
  --robo-details-popup-maxheight: 85vh;
  --robo-details-summary-background: transparent;
  --robo-details-summary-color: inherit;
  --robo-details-summary-padding: 0;
  --robo-details-summary-borderw: 1px;
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

.robo-details--initial {
  --robo-details-content-padding: 0;
}

.robo-details:not(.robo-details--initial) {
  --robo-details-content-padding: 20px;
}

/* Убираем маркеры дефолтные у summary */
summary button {
  pointer-events: none;
}

details {
  display: inline-block;
  position: relative;
  line-height: 1.2;
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
  display: flex;
  fill: var(--robo-details-summary-color); /* для svg */
  padding: var(--robo-details-summary-padding);
  transition: 0.2s linear all;
  user-select: none;
  vertical-align: middle;
}
/* - summary */

/* + content */
/* Селектор «сразу ребёнок» вместо вложенного */
.robo-details--tooltip > .robo-details-content {
  background-color: var(--robo-details-tooltip-background);
  outline: 1px solid var(--robo-details-tooltip-border-color);
  color: var(--robo-details-tooltip-color);
}

.robo-details--popup > .robo-details-content {
  background-color: var(--robo-details-popup-background);
  outline: 1px solid var(--robo-details-popup-border-color);
  color: var(--robo-details-popup-color);
}

.robo-details-content-inside {
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
  position: sticky;
  right: 5px;
  top: 5px;
  float: right;
  z-index: 10;
}
/* - actions */

/* + INITIAL */

.robo-details--initial > summary {
  font-weight: bold;
  margin-bottom: 5px;
}

.robo-details--initial > .robo-details-content-inside {
  padding-left: 0;
  padding-right: 0;
}
/* - INITIAL */

/* Tooltip specific */
.robo-details--tooltip > .robo-details-content {
  font-size: initial;
  letter-spacing: 0;
  max-height: var(--robo-details-tooltip-maxheight);
  max-width: var(--robo-details-tooltip-maxwidth);
  min-height: var(--robo-details-tooltip-minheight);
  min-width: var(--robo-details-tooltip-minwidth);
  overflow-y: auto;
  position: absolute;
  text-transform: none;
  z-index: 900;
}

@media screen and (max-width: 900px) {
  .robo-details--tooltip > .robo-details-content {
    z-index: 1100;
  }
}
/* - tooltip */

/* + tooltip position */
/* Для .robo-details--tooltip оставляем переменную --tooltip-offset */
.robo-details--tooltip {
  --tooltip-offset: calc(100% + var(--robo-details-tooltip-content-offset));
}

.robo-details--tooltip--bottom-start > .robo-details-content {
  top: var(--tooltip-offset);
  left: 0;
}

.robo-details--tooltip--bottom-end > .robo-details-content {
  top: var(--tooltip-offset);
  right: 0;
}

.robo-details--tooltip--top-start > .robo-details-content {
  bottom: var(--tooltip-offset);
  left: 0;
}

.robo-details--tooltip--top-end > .robo-details-content {
  bottom: var(--tooltip-offset);
  right: 0;
}

.robo-details--tooltip--start-top > .robo-details-content {
  bottom: 0;
  right: var(--tooltip-offset);
}

.robo-details--tooltip--start-bottom > .robo-details-content {
  top: 0;
  right: var(--tooltip-offset);
}

.robo-details--tooltip--end-top > .robo-details-content {
  bottom: 0;
  left: var(--tooltip-offset);
}

.robo-details--tooltip--end-bottom > .robo-details-content {
  top: 0;
  left: var(--tooltip-offset);
}

.robo-details--tooltip--fix > .robo-details-content {
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
.robo-details--tooltip--bottom-start > .robo-details-content,
.robo-details--tooltip--bottom-end > .robo-details-content {
  margin-top: 5%;
  opacity: 0;
}

.robo-details--tooltip--bottom-start[open] > .robo-details-content,
.robo-details--tooltip--bottom-end[open] > .robo-details-content {
  animation: TooltipBottom 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

@keyframes TooltipBottom {
  to {
    opacity: 1;
    margin-top: 0;
  }
}

.robo-details--tooltip--top-start > .robo-details-content,
.robo-details--tooltip--top-end > .robo-details-content {
  margin-top: -5%;
  opacity: 0;
}

.robo-details--tooltip--top-start[open] > .robo-details-content,
.robo-details--tooltip--top-end[open] > .robo-details-content {
  animation: TooltipTop 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

@keyframes TooltipTop {
  to {
    opacity: 1;
    margin-top: 0;
  }
}

.robo-details--tooltip--start-top > .robo-details-content,
.robo-details--tooltip--start-bottom > .robo-details-content {
  margin-left: 5%;
  opacity: 0;
}

.robo-details--tooltip--start-top[open] > .robo-details-content,
.robo-details--tooltip--start-bottom[open] > .robo-details-content {
  animation: TooltipStartEnd 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

.robo-details--tooltip--end-top > .robo-details-content,
.robo-details--tooltip--end-bottom > .robo-details-content {
  margin-left: -5%;
  opacity: 0;
}

.robo-details--tooltip--end-top[open] > .robo-details-content,
.robo-details--tooltip--end-bottom[open] > .robo-details-content {
  animation: TooltipStartEnd 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

@keyframes TooltipStartEnd {
  to {
    opacity: 1;
    margin-left: 0;
  }
}
/* - tooltip position animation */

/* + popup */
.robo-details--popup > .robo-details-content {
  background-color: var(--robo-details-popup-background);
  color: var(--robo-details-popup-color);
  left: calc(50% - var(--robo-details-popup-maxwidth) / 2);
  max-height: var(--robo-details-popup-maxheight);
  opacity: 0;
  overflow: auto;
  padding: var(--robo-details-content-padding) calc(var(--robo-details-content-padding) / 2)
    var(--robo-details-content-padding);
  position: fixed;
  top: var(--robo-details-popup-content-offset);
  margin-top: -50%;
  width: 100%;
  max-width: var(--robo-details-popup-maxwidth);
  z-index: 1001;
}

@media screen and (max-width: 670px) {
  .robo-details--popup > .robo-details-content {
    left: var(--robo-space);
    right: var(--robo-space);
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
.robo-details--popup[open] > .robo-details-content {
  animation: popup 0.3s linear 0.1s forwards;
}

@keyframes popup {
  to {
    opacity: 1;
    margin-top: 0;
  }
}
/* - popup animation */

/* + summarystyle */
.robo-details--summarystyle-link > summary,
.robo-details--summarystyle-expandlink > summary {
  color: var(--robo-color-blue);
}

.robo-details--summarystyle-expandlink > summary {
  border-bottom: 1px dotted currentColor;
  padding-bottom: 4px;
}

.robo-details--summarystyle-select {
  --robo-details-summary-background: var(--robo-color-input);
  --robo-details-summary-color: var(--robo-color-inputcolor);
  --robo-details-summary-padding: var(--input-padding-v) var(--input-padding-g);
  --tooltip-offset: calc(100% - 1px);
  border: var(--robo-details-summary-borderw) solid var(--robo-color-inputborder);
  width: 100%;
}

.robo-details--summarystyle-select > summary > .robo-grid {
  width: 100%;
}

.robo-details--summarystyle-info {
  --robo-details-tooltip-content-offset: -1px;
  --robo-details-summary-background: var(--robo-color-input);
  --robo-details-summary-color: var(--robo-color-inputcolor);
  --robo-details-summary-padding: var(--input-padding-v)
    calc(var(--robo-details-tooltip-content-offset) + 15px) var(--robo-details-tooltip-content-offset)
    var(--input-padding-g);
}

.robo-details--summarystyle-info > summary {
  display: block;
  position: relative;
}

.robo-details--summarystyle-info[open] > summary {
  outline: 1px solid var(--robo-color-inputborder);
}

.robo-details--summarystyle-info > .robo-details-content {
  max-width: 100%;
  border-top: none;
}
/* - summarystyle */

/* + summarysize */
.robo-details--summarysize-tiny {
  --robo-details-summary-padding: calc(var(--robo-input-padding) * 0.4);
}
.robo-details--summarysize-tiny > summary {
  font-size: calc(var(--robo-input-fontsize) * 0.8);
}

.robo-details--summarysize-small {
  --robo-details-summary-padding: calc(var(--robo-input-padding) * 0.6);
}
.robo-details--summarysize-small > summary {
  font-size: var(--robo-input-fontsize);
}

.robo-details--summarysize-large {
  --robo-details-summary-padding: calc(var(--robo-input-padding) * 2);
}
.robo-details--summarysize-large > summary {
  font-size: calc(var(--robo-input-fontsize) * 2);
}
/* - summarysize */

.robo-details--block {
  display: block;
  --robo-details-popup-maxwidth: 100%;
  --robo-details-tooltip-maxwidth: 100%;
  width: 100%;
}

.robo-details--block > .robo-details-content {
  max-width: 100%;
  width: 100%;
}

/* + Fit Content for popup part */
.robo-details--fitContent:not(.robo-details--tooltip--fix) > .robo-details-content {
  box-sizing: border-box;
  height: fit-content;
  max-height: 100svh;
  max-width: 100vw;
  width: fit-content;
}
/* - Fit Content for popup part */
</style>

<style scoped>
details {
  display: inline-block;
  position: relative;
  line-height: 1.2;
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
  display: flex;
  fill: var(--robo-details-summary-color); /* для svg */
  padding: var(--robo-details-summary-padding);
  transition: 0.2s linear all;
  user-select: none;
  vertical-align: middle;
}
/* - summary */

/* + content */
.robo-details--tooltip > .robo-details-content {
  background-color: var(--robo-details-tooltip-background);
  outline: 1px solid var(--robo-details-tooltip-border-color);
  color: var(--robo-details-tooltip-color);
}

.robo-details--popup > .robo-details-content {
  background-color: var(--robo-details-popup-background);
  outline: 1px solid var(--robo-details-popup-border-color);
  color: var(--robo-details-popup-color);
}

.robo-details-content-inside {
  padding: var(--robo-details-content-padding);
  position: relative;
}

.robo-details--initial > .robo-details-content-inside {
  padding-left: 0;
  padding-right: 0;
}
/* - content */

/* + actions */
.robo-details--loading summary {
  pointer-events: none;
  cursor: not-allowed;
}

.robo-details-content-close {
  cursor: pointer;
  position: sticky;
  right: 5px;
  top: 5px;
  float: right;
  z-index: 10;
}
/* - actions */

/* + INITIAL */
.robo-details--initial > summary {
  font-weight: bold;
  margin-bottom: 5px;
}
/* - INITIAL */

/* Tooltip specific */
.robo-details--tooltip > .robo-details-content {
  font-size: initial;
  letter-spacing: 0;
  max-height: var(--robo-details-tooltip-maxheight);
  max-width: var(--robo-details-tooltip-maxwidth);
  min-height: var(--robo-details-tooltip-minheight);
  min-width: var(--robo-details-tooltip-minwidth);
  overflow-y: auto;
  position: absolute;
  text-transform: none;
  z-index: 900;
}

@media screen and (max-width: 900px) {
  .robo-details--tooltip > .robo-details-content {
    z-index: 1100;
  }
}
/* - tooltip */

/* + tooltip position */
/* Для .robo-details--tooltip оставляем переменную --tooltip-offset */
.robo-details--tooltip {
  --tooltip-offset: calc(100% + var(--robo-details-tooltip-content-offset));
}

.robo-details--tooltip--bottom-start > .robo-details-content {
  top: var(--tooltip-offset);
  left: 0;
}

.robo-details--tooltip--bottom-end > .robo-details-content {
  top: var(--tooltip-offset);
  right: 0;
}

.robo-details--tooltip--top-start > .robo-details-content {
  bottom: var(--tooltip-offset);
  left: 0;
}

.robo-details--tooltip--top-end > .robo-details-content {
  bottom: var(--tooltip-offset);
  right: 0;
}

.robo-details--tooltip--start-top > .robo-details-content {
  bottom: 0;
  right: var(--tooltip-offset);
}

.robo-details--tooltip--start-bottom > .robo-details-content {
  top: 0;
  right: var(--tooltip-offset);
}

.robo-details--tooltip--end-top > .robo-details-content {
  bottom: 0;
  left: var(--tooltip-offset);
}

.robo-details--tooltip--end-bottom > .robo-details-content {
  top: 0;
  left: var(--tooltip-offset);
}

.robo-details--tooltip--fix > .robo-details-content {
  font-size: initial;
  position: fixed;
  top: auto;
  bottom: 1px;
  left: 0;
  right: 0;
  max-width: 100%;
  max-height: 100svh;
  overflow-y: auto;
}
/* - tooltip position */

/* + tooltip position animation */
.robo-details--tooltip--bottom-start > .robo-details-content,
.robo-details--tooltip--bottom-end > .robo-details-content {
  margin-top: 5%;
  opacity: 0;
}

.robo-details--tooltip--bottom-start[open] > .robo-details-content,
.robo-details--tooltip--bottom-end[open] > .robo-details-content {
  animation: TooltipBottom 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

@keyframes TooltipBottom {
  to {
    opacity: 1;
    margin-top: 0;
  }
}

.robo-details--tooltip--top-start > .robo-details-content,
.robo-details--tooltip--top-end > .robo-details-content {
  margin-top: -5%;
  opacity: 0;
}

.robo-details--tooltip--top-start[open] > .robo-details-content,
.robo-details--tooltip--top-end[open] > .robo-details-content {
  animation: TooltipTop 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

@keyframes TooltipTop {
  to {
    opacity: 1;
    margin-top: 0;
  }
}

.robo-details--tooltip--start-top > .robo-details-content,
.robo-details--tooltip--start-bottom > .robo-details-content {
  margin-left: 5%;
  opacity: 0;
}

.robo-details--tooltip--start-top[open] > .robo-details-content,
.robo-details--tooltip--start-bottom[open] > .robo-details-content {
  animation: TooltipStartEnd 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

.robo-details--tooltip--end-top > .robo-details-content,
.robo-details--tooltip--end-bottom > .robo-details-content {
  margin-left: -5%;
  opacity: 0;
}

.robo-details--tooltip--end-top[open] > .robo-details-content,
.robo-details--tooltip--end-bottom[open] > .robo-details-content {
  animation: TooltipStartEnd 600ms cubic-bezier(0.23, 1, 0.32, 1) 0.1s forwards;
}

@keyframes TooltipStartEnd {
  to {
    opacity: 1;
    margin-left: 0;
  }
}
/* - tooltip position animation */

/* + popup */
.robo-details--popup > .robo-details-content {
  background-color: var(--robo-details-popup-background);
  color: var(--robo-details-popup-color);
  left: calc(50% - var(--robo-details-popup-maxwidth) / 2);
  max-height: var(--robo-details-popup-maxheight);
  opacity: 0;
  overflow: auto;
  padding: var(--robo-details-content-padding) calc(var(--robo-details-content-padding) / 2)
    var(--robo-details-content-padding);
  position: fixed;
  top: var(--robo-details-popup-content-offset);
  margin-top: -50%;
  width: 100%;
  max-width: var(--robo-details-popup-maxwidth);
  z-index: 1001;
}

@media screen and (max-width: 670px) {
  .robo-details--popup > .robo-details-content {
    left: var(--robo-space);
    right: var(--robo-space);
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
.robo-details--popup[open] > .robo-details-content {
  animation: popup 0.3s linear 0.1s forwards;
}

@keyframes popup {
  to {
    opacity: 1;
    margin-top: 0;
  }
}
/* - popup animation */

/* + summarystyle */
.robo-details--summarystyle-link > summary,
.robo-details--summarystyle-expandlink > summary {
  color: var(--robo-color-blue);
}

.robo-details--summarystyle-expandlink > summary {
  border-bottom: 1px dotted currentColor;
  padding-bottom: 4px;
}

.robo-details--summarystyle-select {
  --tooltip-offset: calc(100% - 1px);
}

.robo-details--summarystyle-select {
  --robo-details-summary-background: var(--robo-color-input);
  --robo-details-summary-color: var(--robo-color-inputcolor);
  --robo-details-summary-padding: var(--input-padding-v) var(--input-padding-g);
  border: var(--robo-details-summary-borderw) solid var(--robo-color-inputborder);
}

.robo-details--summarystyle-select > summary > .robo-grid {
  width: 100%;
}

.robo-details--summarystyle-info {
  --robo-details-tooltip-content-offset: -1px;
  --robo-details-summary-background: var(--robo-color-input);
  --robo-details-summary-color: var(--robo-color-inputcolor);
  --robo-details-summary-padding: var(--input-padding-v)
    calc(var(--robo-details-tooltip-content-offset) + 15px) var(--robo-details-tooltip-content-offset)
    var(--input-padding-g);
}

.robo-details--summarystyle-info > summary {
  display: block;
  position: relative;
}

.robo-details--summarystyle-info[open] > summary {
  outline: 1px solid var(--robo-color-inputborder);
}

.robo-details--summarystyle-info > .robo-details-content {
  max-width: 100%;
  border-top: none;
}
/* - summarystyle */

/* + summarysize */
.robo-details--summarysize-tiny {
  --robo-details-summary-padding: calc(var(--robo-input-padding) * 0.4);
}
.robo-details--summarysize-tiny > summary {
  font-size: calc(var(--robo-input-fontsize) * 0.8);
}

.robo-details--summarysize-small {
  --robo-details-summary-padding: calc(var(--robo-input-padding) * 0.6);
}
.robo-details--summarysize-small > summary {
  font-size: var(--robo-input-fontsize);
}

.robo-details--summarysize-large {
  --robo-details-summary-padding: calc(var(--robo-input-padding) * 2);
}
.robo-details--summarysize-large > summary {
  font-size: calc(var(--robo-input-fontsize) * 2);
}
/* - summarysize */

.robo-details--block {
  display: block;
  --robo-details-popup-maxwidth: 100%;
  --robo-details-tooltip-maxwidth: 100%;
  width: 100%;
}

.robo-details--block > .robo-details-content {
  max-width: 100%;
  width: 100%;
}

/* + Fit Content for popup part */
.robo-details--fitContent:not(.robo-details--tooltip--fix) > .robo-details-content {
  box-sizing: border-box;
  height: fit-content;
  max-height: 100svh;
  max-width: 100vw;
  width: fit-content;
}
/* - Fit Content for popup part */
</style>
