<template>
    <table :class="classes">
      <thead>
        <tr>
          <th 
            v-for="( column, prop ) in columns" 
            :key="prop"
            :style="column.align ? 'text-align:' + column.align : null"
          >
            {{ column.label }}

            <slot :name="'row(' + column.key + ')'" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="( row, index ) in rows" :key="index">
          <td 
            v-for="( prop, i ) in columns" 
            :key="i"
            :style="prop.align ? 'text-align:' + prop.align : null"
          >
            {{row[prop.key]}}
            <slot :name="'cell(' + prop.key + ')'" :row="row" :i="index"/>
          </td>
        </tr>
      </tbody>
  </table>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'RoboTable',

  props: {
    columns: {
      type: Object
    },
    rows: {
      type: Object
    },
    layout: {
      type: String,
      default: 'auto',
      validator(value) {
        return ['auto', 'fixed'].includes(value)
      }
    }
  },

  setup(props) {
    const classes = computed(() => {
      return {
        [`robo-table`]: true,
        [`robo-table--layout-${props.layout}`]: props.layout,
      }
    })

    return {
      classes
    }
  }

})
</script>

<style scoped>
.robo-table {
  width: 100%;
  border: 1px solid var(--color-gray-light)
}

.robo-table th {
  font-weight: 300;
  letter-spacing: 1px;
  text-align: left;
  text-transform: uppercase;
}

.robo-table th, .robo-table tr:not(:last-child) td {
  border-bottom: 1px solid var(--color-gray);
}

.robo-table th, .robo-table td {
  padding: var(--gap-text);
}

.robo-table--layout-fixed {
  table-layout: fixed;
}
</style>
