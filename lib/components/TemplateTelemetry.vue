<template>

<robo-grid columnsRepeat="3" mediaMobile="transfer" offset="x0">
    <robo-card v-for="( item, i ) in dataObject" :key="i">

        <robo-card-title size="3">{{item.name}}</robo-card-title>

        <robo-section offset="x1" v-for="(entity, key, entity_i) in item.entities" :key="entity_i">

                <robo-grid flex offset="x0" gap="x05" valign="center">
                    <robo-icon :icon="getIcon(key)" />
                    <robo-text offset="x0" size="small" weight="bold">{{ cleanEntityName(key) }}</robo-text>
                </robo-grid>

                <robo-grid flex offset="x0" gap="x05">
                    <robo-text>{{entity.state == 'None' ? '–' : entity.state}}</robo-text>
                    <robo-text v-if="entity.units != 'None'">{{entity.units}}</robo-text>
                </robo-grid>
                
                <template v-for="(entity_prop, key, entity_prop_i) in entity" :key="entity_prop_i">
                    <robo-text v-if="key != 'state' && key != 'units'" offset="x05">
                        {{entity_prop}}
                    </robo-text>
                </template>

        </robo-section>

    </robo-card>
</robo-grid>

</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'RoboTemplateTelemetry',

    props: {
        data: {
            type: [Object, String],
            required: true
        }
    },

    setup(props) {
        const dataObject = computed( () => {
            if( typeof props.data === 'string') {
                return JSON.parse(props.data)
            } else {
                return props.data
            }
        })

        const cleanEntityName = (entity) => {
            let string = entity.split('.')[1]
            let stringParts = string.split("_")
            stringParts.shift()
            return stringParts.join(' ')
        }

        const getIcon = (entity) => {
            if(entity.includes('weather')) {
                return 'cloud-sun'
            } 
            else if (entity.includes('battery')) {
                return 'battery-three-quarters'
            } 
            else if (entity.includes('temperature')) {
                return 'temperature-half'
            }
            else if (entity.includes('humidity')) {
                return 'droplet'
            }
            else if (entity.includes('water')) {
                return 'droplet'
            }
            else if (entity.includes('occupancy')) {
                return 'clock'
            } 
            else if (entity.includes('power')) {
                return 'power-off'
            }
            else if (entity.includes('action')) {
                return 'bell-concierge'
            }
            else if (entity.includes('light')) {
                return 'lightbulb'
            } else {
                return 'microchip'
            }
        }

        return {
            dataObject,
            cleanEntityName,
            getIcon
        }
    }
})
</script>

<style scoped>
</style>