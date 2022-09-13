<template>

<!-- <robo-grid flex>
    <robo-card-title size="3">Your Telemetry</robo-card-title>
    <robo-button outlined size="small">Save json</robo-button>
</robo-grid> -->

<robo-grid columnsRepeat="3" mediaMobile="transfer" offset="x0">
    <robo-card v-for="( item, i ) in dataObject" :key="i">

        <robo-card-title size="3">{{item.name}}</robo-card-title>

        <robo-section offset="x1" v-for="(entity, key, entity_i) in item.entities" :key="entity_i">

                <robo-grid flex offset="x0" gap="x05" valign="center">
                    <robo-icon :icon="getIcon(key)" />
                    <robo-grid flex offset="x0" gap="x05" class="telemetry-state">
                        <robo-text weight="bold" uppercase>{{entity.state == 'None' ? '–' : entity.state}}</robo-text>
                        <robo-text v-if="entity.units != 'None'" weight="bold" uppercase>{{entity.units}}</robo-text>  
                    </robo-grid>
                </robo-grid>

                <robo-text offset="x05" size="small">
                    {{ cleanEntityName(key, item.name) }}
                </robo-text>

                <robo-details 
                    v-if="entity.history && entity.history.length > 0"
                    summaryText="View history" 
                    :contentCloseOutOfFocus="false"
                >
                    <template v-for="(entity_prop, key, entity_prop_i) in entity.history" :key="entity_prop_i">
                        <robo-text offset="x1" size="small">
                            <robo-text offset="x0" v-for="(item, key) in entity_prop" :key="key">
                                {{key}} - {{item}}
                            </robo-text>
                        </robo-text>
                    </template>
                </robo-details>
                
                <template v-for="(entity_prop, key, entity_prop_i) in entity" :key="entity_prop_i">
                    <robo-text v-if="key != 'state' && key != 'units' && key != 'history'" offset="x05">
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

        const cleanEntityName = (entity, toRemove) => {
            let entityParts = entity.split(/[-_.]+/)
            console.log('entityParts', entityParts)
            // let stringParts = string.split("_")
            // stringParts.replace(toRemove, '')
            // console.log('stringParts removed', stringParts)
            // stringParts.shift()
            // return stringParts.join(' ')

            let result = entityParts.filter(function(el){ 
                return el !== toRemove
            })

            return result.join(' ')
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
    .robo-card {
        max-height: 400px;
        overflow-y: auto;
    }

    .telemetry-state {
        text-transform: uppercase;
    }
</style>