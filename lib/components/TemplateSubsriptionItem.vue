<template>
    <div :class="classes" ref="item" :key="itemKey">

        <robo-grid 
            v-if="statusBufer !== 'deleted'"
            :columns="columnsWidth" 
            valign="center" 
            :offset="itemOffset"
            gap="x1"
        >

            <robo-grid-item mediaMobile="transfer">
                <robo-input 
                    label="Address"
                    placeholder = "Robonomics parachain address"
                    v-model="addressModel"
                    :disabled="(statusBufer !== 'new') ? true : false"
                    :tip="tipAddress ?? null"
                />
            </robo-grid-item>
            <robo-grid-item>
                <robo-input 
                    label="Name"
                    v-model="nameModel"
                    @input="statusBufer = 'edit' "
                    :disabled="(statusBufer === 'loading') ? true : false"
                    :tip="tipName ?? null"
                />
            </robo-grid-item>

            <robo-grid-item>

                <robo-button 
                    v-if="statusBufer === 'new'  && screenWidth > 1200"
                    icon-left="plus"
                    outlined
                    fitLabeled
                    block
                    @click="addItem"
                >
                </robo-button>

                <robo-button 
                    v-if="statusBufer === 'new'  && screenWidth < 1200"
                    icon-left="plus"
                    outlined
                    fitLabeled
                    block
                    @click="addItem"
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
                    v-if="statusBufer === 'added' && screenWidth > 1200"
                    @mouseover="hoverAdded = true" @mouseleave="hoverAdded = false"
                    @click="deleteItem"

                    block
                    fitLabeled
                    :icon-left="hoverAdded ? 'minus' : 'check'"
                    outlined
                    title="remove item"
                    :type="hoverAdded ? 'alarm' : 'ok'"
                ></robo-button>

                <robo-button 
                    v-if="statusBufer === 'added' && screenWidth < 1200"
                    @mouseover="hoverAdded = true" @mouseleave="hoverAdded = false"
                    @click="deleteItem"

                    block
                    fitLabeled
                    :icon-left="hoverAdded ? 'minus' : 'check'"
                    outlined
                    title="remove item"
                    :type="hoverAdded ? 'alarm' : 'ok'"
                    
                >
                    Remove
                </robo-button>


                <robo-button 
                    v-if="statusBufer === 'edit' && screenWidth > 1200"
                    @click="editItem"

                    block
                    fitLabeled
                    icon-left="floppy-disk"
                    title="save changes"
                ></robo-button>

                <robo-button 
                    v-if="statusBufer === 'edit' && screenWidth < 1200"
                    @click="editItem"

                    block
                    fitLabeled
                    icon-left="floppy-disk"
                    title="save changes"
                >
                    Remove
                </robo-button>

            </robo-grid-item>
        </robo-grid>


        <robo-text 
            v-if="statusBufer === 'deleted'"
            @on-close="removeItem"

            class="robo-template-subsribe-item-message-deleted"
            highlightLabel="error"
            highlightLabelClose
            weight="bold"
        >Item deleted</robo-text>

        <robo-text 
            v-if="messageBufer"
            :key="messageKey"

            class="robo-template-subsribe-item-message"
            highlightLabel="error"
            highlightLabelClose
            :highlightLabelCloseReopen="messageReopen"
            weight="bold"
        >
            {{messageBufer}}
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
      disabled: {
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
      tipAddress: {
        type: String,
        default: null
      },
      tipName: {
        type: String,
        default: null
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
            deviceSwitch: this.deviceIsOn,
            itemOffset: 'x05',
            screenWidth: 0,
            statusBufer: this.status,
            messageBufer: null,
            messageReopen: false,
            messageKey: 0,
            hoverAdded: false
        }
    },

    emits: ['update:address', 'update:name', 'onAdd', 'onDelete', 'onEdit'],

    watch: {
        status: function(value) {
            this.statusBufer = value
        },

        statusBufer: function(value) {

            if(value === 'new') {
                this.messageReopen = true
                this.messageKey += 1
            }

        }
    },

    computed: {
        classes() {
            return {
                [`robo-template-subsribe-item`]: true,
                [`robo-template-subsribe-item--${this.statusBufer}`]: this.statusBufer,
                [`robo-template-subsribe-item--disabled`]: this.disabled,
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
        addItem() {
            this.$emit('onAdd',
                () => this.addStarted(),
                (status, message) => this.addStatus(status, message)
            )
        },

        addStarted() {
            this.statusBufer = 'loading'
        },

        addStatus(status, message) {

           if(status) {
               this.statusBufer = 'added'
           } else {
               this.statusBufer = 'new'
           }

           if(message) {
               this.messageBufer = message
           }
        },

        deleteItem() {
            this.$emit('onDelete',
                () => this.deleteStarted(),
                (status, message) => this.deleteStatus(status, message)
            )
        },

        deleteStarted() {
            this.statusBufer = 'loading'
        },

        deleteStatus(status, message) {
         
           if(status) {
                this.statusBufer = 'deleted'
           } else {
               this.statusBufer = 'added'
           }

           if(message) {
               this.messageBufer = message
           }
        },

        removeItem() {
            this.$refs.item.remove()
        },

        editItem() {
            this.$emit('onEdit',
                () => this.editStarted(),
                (status, message) => this.editStatus(status, message)
            )
        },

        editStarted() {
            this.statusBufer = 'loading'
        },

        editStatus(status, message) {
         
           if(status) {
                this.statusBufer = 'added'
           } else {
               this.statusBufer = 'edit'
           }

           if(message) {
               this.messageBufer = message
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
        },
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
        filter: grayscale(1);
        pointer-events: none;
    }

    .robo-template-subsribe-item--deleted .robo-input {
        pointer-events: none;
        opacity: 0.3;
    }


    /* + SERVICE MESSAGE */
    .robo-template-subsribe-item {
        position: relative;
    }

    .robo-template-subsribe-item-message {
        position: absolute !important;
        top: var(--space);
        left: 0;
        z-index: 1;
    }

    .robo-template-subsribe-item > .robo-grid {
        padding-bottom: 0 !important;
    }
    /* - SERVICE MESSAGE */

    @media screen and (max-width: 1200px) {
        .robo-grid--mobile-transfer {
          grid-template-columns: 1fr !important;
        }
    }

    .robo-template-subsribe-item-message-deleted {
        margin-top: calc(var(--gap-layout) * .5);
    }

    .robo-template-subsribe-item--disabled {
        pointer-events: none;
        filter: grayscale(1)
    }
</style>

<style>
.robo-template-subsribe-item .robo-btn.robo-btn--alarm.robo-btn--outlined .robo-btn--part {
    --border: var(--color-red);
    --color: var(--color-red);
    --border-hover: var(--color-red);
    --color-hover: var(--color-red);
    --border-2: var(--color-red);
    --color-2: var(--color-red);
    --border-2-hover: var(--color-red);
    --color-2-hover: var(--color-red);
}
</style>
