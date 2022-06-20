<template>
    <component 
      :is="balance.length > 1 ? 'details' : 'div'"
      :class="classList"
    >

        <component 
            :is="balance.length > 1 ? 'summary' : 'div'"
            class="robo-balance-summary"
        >
            <robo-text weight="bold" inline>
                <span class="robo-balance-quantity">{{ formatBalance(overall) }}</span>
                <span class="robo-balance-currency" v-if="currency">{{ currency }}</span>
            </robo-text>

            <font-awesome-icon icon="ellipsis-vertical" class="icon" v-if="balance.length > 1"/>
        </component>

        <div
            v-if="balance.length > 1"
            class="robo-balance-details"
        >
            <robo-text
                v-for="(option,index) in balance" 
                :key="index" 
                gap
            >
                <robo-text size="tiny" v-if="option.account" class="robo-balance-account">{{option.account}}:</robo-text>
                <robo-text size="small" weight="bold">
                    <span class="robo-balance-quantity">{{ formatBalance(option.quantity) }}</span>
                    <span class="robo-balance-currency" v-if="currency">{{ currency }}</span>
                </robo-text>
            </robo-text>
        </div>

    </component>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboBalance',

  props: {
    balance: {
        type: Object,
        default: null,
        required: true
    },
    currency: {
        type: String,
        default: null
    },
    decimals: {
        type: Number,
        default: 3
    }
  },

  computed: {
    classList() {
      return {
        [`robo-balance`]: true,
      };
    },
    overall() {
        return this.balance.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)
    }
  },

  methods: {
      formatBalance(qty) {
        if(Number.isInteger(qty)) {
            return qty
        } else {
            return parseFloat(qty.toFixed(this.decimals))
        }
      }
  }

})
</script>

<style scoped>

    .robo-balance-currency {
        margin-left: calc(var(--space) * 0.5);
        text-transform: uppercase;
    }

    .robo-balance-account {
        text-transform: capitalize;
    }


    summary::-webkit-details-marker {
        display: none;
    }

    summary {
        cursor: pointer;
        display:block;
        user-select: none;
        transition: margin 600ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    summary .icon {
        color: var(--color-link);
        margin-left: var(--space)
    }

    summary .icon:hover {
        color: var(--color-link-hover)
    }


    details[open] summary{
        margin-bottom: var(--gap-text);
    }

    details[open] summary .icon {
        transform: rotate(90deg);
    }

</style>