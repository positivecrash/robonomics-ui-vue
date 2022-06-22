<template>
    <div :class="classes" ref="item">

        <robo-grid 
            :columns="columnsWidth" 
            valign="center" 
            :offset="itemOffset"
            gap="x1"
        >
            <robo-grid-item 
                v-if="type === 'device'" 
                mediaMobile="transfer"
            >
                <robo-button 
                    v-if="screenWidth > 1200"
                    block
                    :disabled="(statusBufer === 'new') ? 'disabled' : null"
                    fitLabeled
                    icon-left="power-off"
                    :type = "buttonSwitchType"
                    @click="switchToggle"
                >
                </robo-button>

                <robo-button 
                    v-if="screenWidth < 1200"
                    block
                    :disabled="(statusBufer === 'new') ? 'disabled' : null"
                    fitLabeled
                    icon-left="power-off"
                    :type = "buttonSwitchType"
                    @click="switchToggle"
                >
                    {{nameModel}}
                </robo-button>
            </robo-grid-item>

            <robo-grid-item mediaMobile="transfer">
                <robo-input 
                    label="Address"
                    placeholder = "Robonomics parachain address"
                    v-model="addressModel"
                    :disabled="(statusBufer !== 'new') ? true : false"
                />
            </robo-grid-item>
            <robo-grid-item>
                <robo-input 
                    label="Name"
                    v-model="nameModel"
                    tip="You may take custom name for the account by <a href='https://wiki.polkadot.network/docs/learn-identity' target='_blank'>setting an identity</a>"
                />
            </robo-grid-item>

            <robo-grid-item>

                <robo-button 
                    v-if="statusBufer === 'new'  && screenWidth > 1200"
                    icon-left="plus"
                    outlined
                    fitLabeled
                    block
                    @click="$emit('onAdd')"
                >
                </robo-button>

                <robo-button 
                    v-if="statusBufer === 'new'  && screenWidth < 1200"
                    icon-left="plus"
                    outlined
                    fitLabeled
                    block
                    @click="$emit('onAdd')"
                >
                    Add
                </robo-button>

                <robo-button 
                    v-if="statusBufer === 'loading' && screenWidth > 1200"
                    outlined
                    fitLabeled
                    block
                    disabled = "disabled"
                    loading
                >
                </robo-button>

                <robo-button 
                    v-if="statusBufer === 'loading' && screenWidth < 1200"
                    outlined
                    fitLabeled
                    block
                    disabled = "disabled"
                    loading
                >
                     Wait
                </robo-button>

                <robo-button 
                    v-if="statusBufer === 'added' && type === 'subsription' && screenWidth > 1200"
                    block
                    fitLabeled
                    icon-left="minus"
                    outlined
                    type = "alarm"
                    @click="deleteDelay"
                ></robo-button>

                <robo-button 
                    v-if="statusBufer === 'added' && type === 'subsription' && screenWidth < 1200"
                    block
                    fitLabeled
                    icon-left="minus"
                    outlined
                    type = "alarm"
                    @click="deleteDelay"
                >
                    Remove
                </robo-button>


                <robo-button 
                    v-if="statusBufer === 'deleted' && type === 'subsription' && screenWidth > 1200"
                    block
                    fitLabeled
                    icon-left="arrow-rotate-left"
                    outlined
                    type = "alarm"
                    @click="deleteCancel"
                />

                <robo-button 
                    v-if="statusBufer === 'deleted' && type === 'subsription' && screenWidth < 1200"
                    block
                    fitLabeled
                    icon-left="arrow-rotate-left"
                    outlined
                    type = "alarm"
                    @click="deleteCancel"
                >Restore</robo-button>


                <robo-button 
                    v-if="statusBufer === 'added' && type === 'device' &&  deviceInfoLink && screenWidth > 1200"
                    block
                    fitLabeled
                    :href="deviceInfoLink"
                    icon-left="pencil"
                    outlined
                ></robo-button>

                <robo-button 
                    v-if="statusBufer === 'added' && type === 'device' &&  deviceInfoLink && screenWidth < 1200"
                    block
                    fitLabeled
                    :href="deviceInfoLink"
                    icon-left="pencil"
                    outlined
                >
                    Edit
                </robo-button>

            </robo-grid-item>
        </robo-grid>

        <robo-text 
            v-if="statusBufer === 'deleted'"
            class="robo-template-subsribe-item-message"
            highlightLabel="error"
            weight="bold"
        >
            Will be deleted on {{deleteDelayTime}}s ...
        </robo-text>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboTemplateSubsriptionItem',

  props: {
      address: {
          type: String,
          default: ' '
      },
      name: {
          type: String,
          default: ' '
      },
      deleteDelayTime: {
          type: Number,
          default: 10
      },
      deviceInfoLink: {
          type: String,
          default: null
      },
      deviceIsOn: {
          type: Boolean,
          default: false
      },
      status: {
        type: String,
        default: 'new',
        validator(value) {
            return ['new', 'loading', 'added', 'deleted'].includes(value)
        }
      },
      type: {
        type: String,
        default: 'subsription',
        validator(value) {
            return ['subsription', 'device'].includes(value)
        }
      }
  },

    data () {
        return {
            statusBufer: this.status,
            itemOffset: 'x05',
            screenWidth: 0,
            deviceSwitch: this.deviceIsOn
        }
    },

    emits: ['update:address', 'update:name', 'onAdd', 'onDelete', 'onCancel', 'onSwitch'],

    computed: {
        classes() {
            return {
                [`robo-template-subsribe-item`]: true,
                [`robo-template-subsribe-item--${this.status}`]: this.status,
            }
        },

        addressModel: {
            get() {
                return this.address
            },
            set(value) {
                this.$emit('update:address', value)
            }
        },

        nameModel: {
            get() {
                return this.name
            },
            set(value) {
                this.$emit('update:name', value)
            }
        },

        columnsWidth() {
            if (this.type === 'subsription' ) {
                return 'auto auto 100px'
            } else {
                // device
                return '100px auto auto 100px'
            }
        },

        buttonSwitchType() {
            if ( this.statusBufer === 'new' ) {
                return 'na'
            } else if ( this.statusBufer !== 'new' ) {
                if(this.deviceSwitch) {
                    return 'ok'
                } else {
                    return 'alarm'
                }
            }
        },
    },

    methods: {
        deleteDelay() {

            if(this.statusBufer === 'added') {
                
                this.statusBufer = 'deleted'
                this.$refs.item.classList.add('removeDelay')

                if(this.statusBufer === 'added') {
                    return
                }

                setTimeout(() => {
                    
                    if (this.statusBufer === 'deleted' ) {
                        this.$emit('onDelete')
                        this.$refs.item.classList.remove('removeDelay')
                        this.$refs.item.classList.add('remove')

                        setTimeout(() => {
                            this.$refs.item.remove()
                        }, 1000)
                    }
                }, 1000 * this.deleteDelayTime)
            }
            
        },


        deleteCancel() {

            if(this.statusBufer === 'deleted') {
                
                this.statusBufer = 'added'
                this.$refs.item.classList.remove('removeDelay', 'remove')
                this.$emit('onCancel')
            }
        },

        itemOffsetCalc() {
            if( window.innerWidth > 1200 ) {
                return 'x05' 
            } else if (window.innerWidth > 700) {
                return 'x2'
            }
            else {
                return 'x4'
            }
        },

        switchToggle() {
            if(this.deviceSwitch) {
                this.deviceSwitch = false
            } else {
                this.deviceSwitch = true
            }

            this.$emit('onSwitch')
        }
    },

    mounted() {
        const self = this
        this.itemOffset = this.itemOffsetCalc()
        this.screenWidth = window.innerWidth

        window.addEventListener("resize", function(){
            self.screenWidth = window.innerWidth
            self.itemOffset = self.itemOffsetCalc()
        })
    }
})
</script>

<style scoped>
    .robo-template-subsribe-item--new .robo-input {
        --color: var(--color-blue);
        --border: var(--border-active);
        --label: var(--label-active);
    }

    .robo-template-subsribe-item--loading {
        pointer-events: none;
        opacity: 0.7;
    }

    .robo-template-subsribe-item--deleted .robo-input {
        pointer-events: none;
        opacity: 0.3;
    }


    .robo-template-subsribe-item {
        position: relative;
    }

    .robo-template-subsribe-item-message {
        position: absolute;
        top: var(--space);
        left: 0;
    }

    @keyframes hide {
        to {
            opacity: 0;
            visibility: hidden;
        }
    }

    @keyframes blink {
        35% {
            opacity: 0.4;
        }
    }

    .robo-template-subsribe-item.removeDelay {
        animation: blink 1s linear infinite;
    }

    .robo-template-subsribe-item.remove {
        animation: hide 0.4s linear 0.2s forwards;
    }

    @media screen and (max-width: 1200px) {
        .robo-grid--mobile-transfer {
          grid-template-columns: 1fr !important;
        }
    }
</style>