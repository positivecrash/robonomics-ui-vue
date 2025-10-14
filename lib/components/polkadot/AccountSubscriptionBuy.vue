<template>
  <robo-grid class="flex-container" type="flex" offset="x1" gap="x025" galign="start">
    <robo-text :title="2" offset="x025" align="center">Create subscription for the new account</robo-text>

    <robo-section v-if="!loading">
      <robo-status v-if="error !== null" type="error">{{ error }}</robo-status>

      <robo-text v-if="data" size="small">
        <code>
          <pre>{{ data }}</pre>
        </code>
      </robo-text>
    </robo-section>
    
    <robo-section v-if="accountPr" offset="x05">
      <div class="container">
        <robo-text size="tiny">Current Account:</robo-text>
        <robo-text size="small" weight="bold">{{ accountPr }}</robo-text>
      </div>
      <div class="container">
        <robo-text size="tiny">Balance: </robo-text>
        <robo-text size="small" weight="bold">{{ balanceFormat }}</robo-text>
      </div>
      <div class="container">
        <robo-text size="tiny">Free Auctions:</robo-text>
        <robo-text size="small" weight="bold">{{ freeAuctions }}</robo-text>
      </div>
    </robo-section>
    
    <robo-status v-else type="info" size="small" offset="x05">
      No account selected
    </robo-status>

    <robo-button @click="buy" :disabled="!accountPr" size="small" block>Buy</robo-button>
  </robo-grid>
</template>

<script>
export default { name: 'RoboAccountPolkadotSubscriptionBuy' }
</script>

<script setup>
import { computed } from "vue";
import { fromWei } from './tools';

import { useAccount, useSend } from "robonomics-interface-vue/account";
import {
  useAction,
  useAvailableSubscriptions,
  useSubscription
} from "robonomics-interface-vue/subscription";

const props = defineProps({
  accountPr: {
    type: String,
    default: ""
  },
  balance: {
    type: [Number, String],
    default: 0
  },
  decimals: {
    type: Number,
    default: 9
  },
  currency: {
    type: String,
    default: "XRT"
  }
});

const { account } = useAccount();
const { loading, error, data } = useSubscription(account);
const { data: freeAuctions } = useAvailableSubscriptions();
const action = useAction();
const { tx } = useSend();


const buy = async () => {
  console.log(tx)
  await tx.send(async () => await action.bid(1000000001));
};

// Format balance for display
const balanceFormat = computed(() => {
  if (!props.balance || props.balance === 0) return `0 ${props.currency}`;
  
  const balanceInXRT = fromWei(props.balance, props.decimals);
  return `${balanceInXRT} ${props.currency}`;
});

</script>

<style scoped>
.flex-container {
  flex-direction: column;
}

.container {
  display: flex;
  gap: 0.5rem;
}
</style>