<template>
    <div :class="classes">
      <slot/>
    </div>
</template>

<script>
  export default { name: 'RoboGrid' }
</script>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
    // 'left-center', 'left-center-right', 'center-right' or integer number
    columns: {
      type: [Number, String],
      default: null
    },

    flexfluid: {
      type: Boolean,
      default: false
    },

    minColumnWidth: {
      type: String,
      default: 'auto'
    },

    maxColumnWidth: {
      type: String,
      default: 'auto'
    },

    minRowHeight: {
      type: String,
      default: 'auto'
    },

    maxRowHeight: {
      type: String,
      default: 'auto'
    },

    gap: {
      type: String,
      default: 'x2',
      validator(value) {
        return ['x0', 'x025', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },

    galign: {
      type: String,
      default: 'stretch',
      validator(value) {
        return ['start', 'end', 'center', 'stretch'].includes(value)
      }
    },

    offset: {
      type: String,
      default: 'x2',
      validator(value) {
        return ['x0', 'x025', 'x05', 'x1', 'x2', 'x4'].includes(value)
      }
    },

    rows: {
      type: [Number, String],
      default: null
    },

    type: {
      type: String,
      default: 'grid',
      validator(value) {
        return ['grid', 'flex', 'masonry'].includes(value)
      }
    },

    valign: {
      type: String,
      default: 'stretch',
      validator(value) {
        return ['start', 'end', 'center', 'stretch'].includes(value)
      }
    }
})


/* + methods for styles v-bind */

let getColumns = () => {

  if(props.columns) {
    const columns = props.columns

    if( !isNaN(parseFloat(columns)) && isFinite(columns) && (props.type !== 'flex' ) ) {
      if(props.type === 'masonry') {
        return columns
      } else {
        return `repeat(${columns}, 1fr)`
      }
    } else {
      return columns
    }
    
  } else {
    if(props.minColumnWidth || props.maxColumnWidth) {
      let min = 'auto'
      let max = '1fr'

      if(props.minColumnWidth) {
        min = `min(100%, ${props.minColumnWidth})`
      }

      if(props.maxColumnWidth) {
        max = `${props.maxColumnWidth}`
        // max = `min(100%, ${props.maxColumnWidth})`
      }

      return `repeat(auto-fit, minmax(${min}, ${max} ))`
    }
  }

}

let getRows = () => {
  
  if(props.rows) {
    const columns = props.rows

    if( !isNaN(parseFloat(columns)) && isFinite(columns) && (props.type !== 'flex' ) ) {
      if(props.type === 'masonry') {
        return columns
      } else {
        return `repeat(${columns}, 1fr)`
      }
    }
    
  } else {
    if(props.minRowHeight || props.maxRowHeight) {
      let min = 'auto'
      let max = '1fr'

      if(props.minRowHeight) {
        min = `min(100%, ${props.minRowHeight})`
      }

      if(props.maxRowHeight) {
        max = `${props.maxRowHeight}`
        // max = `min(100%, ${props.maxRowHeight})`
      }

      return `repeat(auto-fit, minmax(${min}, ${max} ))`
    }
  }

}

let calcGap = gap => 
  ({
    'x0': 'none',
    'x025': 'calc(var(--gap-layout) * 0.25)',
    'x05': 'calc(var(--gap-layout) * 0.5)',
    'x1': 'var(--gap-layout)',
    'x2': 'calc(var(--gap-layout) * 2)',
    'x4': 'calc(var(--gap-layout) * 4)'
  }[gap] ?? 'none')


let getDisplay = type => 
({
  'masonry': 'block',
  'grid': 'grid',
  'flex': 'flex'
}[type] ?? 'none')


let getGalign = align => {

  if(props.type == 'flex') {
    return ({
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'stretch': 'space-between'
    }[align] ?? 'none')
  } else {
    return align
  }
}

let getValign = align => {

  if(props.type == 'flex') {
    return ({
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'stretch': 'stretch'
    }[align] ?? 'none')
  } else {
    return align
  }
}

let masonryCalc = max => {
  if(props.columns > max) {
    return max
  } else {
    return props.columns
  }
}

/* - methods for styles v-bind */

/* + for styles v-bind */
const columnsFromData = computed( () => {
  if(props.rows) {
    return 'auto'
  } else {
    return getColumns()
  }
})

const rowsFromData = computed( () => {
  if(props.columns) {
    return 'auto'
  } else {
    return getRows()
  }
})

const gapFromData = computed( () => {
  return calcGap(props.gap)
})

const offsetFromData = computed( () => {
  return calcGap(props.offset)
})

const displayFromData = computed( () => {
  return getDisplay(props.type)
})

const galignFromData = computed( () => {
  return getGalign(props.galign)
})

const valignFromData = computed( () => {
  return getValign(props.valign)
})
/* - for styles v-bind */



const classes = computed( () => {
    return {
      [`robo-grid`]: true,
      [`robo-grid-type--${props.type}`]: props.type,
      [`robo-grid-flexfluid`]: props.flexfluid,
    }
})

</script>




<style>
  /* + TYPE MASONRY (waiting for grid-template-rows: masonry; so this is temporary solution )*/
  .robo-grid-type--masonry > * {
    --grid-masonry-gap: v-bind(gapFromData);

    display: inline-block;
    width: 100%;
    margin-bottom: var(--grid-masonry-gap);
    box-sizing: border-box;
  }
  /* - TYPE MASONRY */

  .robo-grid-type--flex[class *= 'robo-grid-columns--'] > * {
    flex-grow: 1;
    flex-basis: calc( 100% / var(--grid-columns) - var(--gap)/2 * (var(--grid-columns) - 1));
  }
</style>

<style scoped>

    .robo-grid {
        --gap: v-bind(gapFromData);
        --offset: v-bind(offsetFromData);
        --grid-columns: v-bind(columnsFromData);
        --grid-rows: v-bind(rowsFromData);
        --grid-display: v-bind(displayFromData);
        --grid-galign: v-bind(galignFromData);
        --grid-valign: v-bind(valignFromData);

        display: var(--grid-display);
        padding-top: var(--offset);
        padding-bottom: var(--offset);
    }

    .robo-grid-type--grid, .robo-grid-type--flex {
      gap: var(--gap);
    }

    .robo-grid-type--grid {
      grid-template-columns: var(--grid-columns);
      grid-template-rows: var(--grid-rows);
    }

    .robo-grid-type--masonry {
        column-count: var(--grid-columns);
        column-gap: var(--gap);
    }

    .robo-grid:last-child { padding-bottom: 0; }

    .robo-grid-flexfluid {
      flex-wrap: wrap;
    }

    /* + GALIGN (for type = grid & flex) */
    .robo-grid-type--grid {
      justify-items: var(--grid-galign);
      align-items: var(--grid-valign);
    }

    .robo-grid-type--flex {
      align-items: var(--grid-valign);
      justify-content: var(--grid-galign);
    }
    /* - GALIGN (for type = grid & flex) */


    @media screen and (max-width: 1600px) {
       .robo-grid-type--masonry {
        --grid-columns: v-bind(masonryCalc(3))
       }
    }
    
    @media screen and (max-width: 1100px) {
       .robo-grid-type--masonry {
        --grid-columns: v-bind(masonryCalc(2))
       }
    }

    @media screen and (max-width: 700px) {
       .robo-grid-type--masonry {
        --grid-columns: v-bind(masonryCalc(1))
       }
    }

</style>