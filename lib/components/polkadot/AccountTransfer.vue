<template>
  <robo-grid class="flex-container" type="flex" offset="x1" gap="x025" galign="start">
    <robo-text :title="2" offset="x025" align="center">Send XRT from your connected account to generated</robo-text>
    
    <robo-input 
      offset="x025" 
      v-model="recipient" 
      placeholder="Recipient address" 
      @input="clearMessage"
    />
    
    <robo-input 
      offset="x025" 
      v-model="amount" 
      placeholder="Amount (XRT)" 
      type="number"
      step="0.000000001"
      @input="clearMessage"
    />
    
    <robo-button 
      block 
      offset="x025" 
      size="small" 
      @click="validateTransfer"
      :disabled="isTransferring"
    >
      {{ isTransferring ? 'Transferring...' : 'Transfer' }}
    </robo-button>
    
    <robo-status v-if="message" :type="messageType" size="small" offset="x05">
      {{ message }}
    </robo-status>
  </robo-grid>
</template>

<script>
export default { name: 'RoboAccountPolkadotTransfer' }
</script>

<script setup>
import { ref} from "vue";
import { isValidAddress, toWei } from './tools';
import { usePolkadotApi } from "robonomics-interface-vue";
import { useSend } from "robonomics-interface-vue/account";

const props = defineProps({
  currentAccount: {
    type: String,
    default: ""
  },
  recipient: {
    type: String,
    default: ""
  },
  balance: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['transferSuccess', 'transferError']);

const { instance } = usePolkadotApi();
const { tx } = useSend();


const recipient = ref(props.recipient);
const amount = ref("");
const message = ref("");
const messageType = ref("");
const isTransferring = ref(false);

const clearMessage = () => {
  message.value = "";
  messageType.value = "";
};

const validateTransfer = async () => {
  message.value = "";
  messageType.value = "";


  if (!isValidAddress(recipient.value)) {
    message.value = "Please enter a valid recipient address";
    messageType.value = "error";
    emit('transferError', 'Invalid recipient address');
    return;
  }


  const transferAmount = parseFloat(amount.value);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    message.value = "Please enter a valid amount";
    messageType.value = "error";
    emit('transferError', 'Invalid amount');
    return;
  }

  if (recipient.value === props.currentAccount) {
    message.value = "Cannot transfer to yourself";
    messageType.value = "error";
    emit('transferError', 'Cannot transfer to yourself');
    return;
  }

  if (transferAmount > props.balance) {
    message.value = "Insufficient balance";
    messageType.value = "error";
    emit('transferError', 'Insufficient balance');
    return;
  }

  isTransferring.value = true;
  message.value = "Processing transfer...";
  messageType.value = "info";

  try {

    const amountInWei = toWei(transferAmount, 9);
    
    console.log(`Transferring ${transferAmount} XRT (${amountInWei} Wei) to ${recipient.value}`);
    
 
    await tx.send(() =>
      instance.api.tx.balances.transfer(recipient.value, amountInWei)
    );
    

    isTransferring.value = false;
    recipient.value = "";
    amount.value = "";
    message.value = "Transfer completed successfully!";
    messageType.value = "ok";
    
  
    emit('transferSuccess', {
      recipient: recipient.value,
      amount: transferAmount
    });
    
  } catch (error) {
    isTransferring.value = false;
    message.value = `Transfer failed: ${error.message || error}`;
    messageType.value = "error";
    
    emit('transferError', error.message || 'Transfer failed');
  }
};
</script>

<style scoped>
.flex-container {
  flex-direction: column;
}

.flex-container .robo-input {
  width: 100%;
}
</style>