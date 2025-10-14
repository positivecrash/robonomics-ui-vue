<template>
  <robo-grid class="flex-container" type="flex" offset="x1" gap="x025" galign="start">
    <robo-text :title="2" offset="x025" align="center">Generate New Account</robo-text>
    
    
    <robo-select 
      v-model="type"
      :options="['sr25519','ed25519']"
      :values="['sr25519','ed25519']"
      size="small"
      label="Choose type"
      block
      offset="x025"
    >
    </robo-select>
    
    
    <robo-button 
      block 
      size="small" 
      @click="handlerGenerate"
      :disabled="isGenerating"
    >
      {{ isGenerating ? 'Generating...' : 'Generate New Account' }}
    </robo-button>

    
    <robo-section v-if="generatedAccount" offset="x1">
      <robo-text title="3" size="small" offset="x025" weight="bold">Generated Account</robo-text>
      <robo-status type="warning" offset="x05" weight="bold">Don’t forget to save your data before continuing; this information is not saved automatically anywhere.</robo-status>
      
      <robo-text size="tiny" offset="x025">
        <strong>Address:</strong> {{ generatedAccount.address }}
      </robo-text>
      
      <robo-text size="tiny" offset="x025">
        <strong>Type:</strong> {{ generatedAccount.type }}
      </robo-text>
      
      <robo-text size="tiny" offset="x05">
        <strong>Mnemonic:</strong> {{ generatedAccount.mnemonic }}
        <robo-copy size="small" :text="generatedAccount.mnemonic"></robo-copy>
      </robo-text>

      
      <robo-section offset="x0">
        <robo-text size="medium" weight="bold" offset="x025">Code with mnemonic:</robo-text>
        
      
        <div class="qr-container">
          <div ref="qrCodeRef" class="qr-code"></div>
        </div>
       
          <robo-button 
            clean
            @click="downloadQRs" 
            size="tiny"
            :disabled="!qrCodeGenerated"
          >
            Download QR
          </robo-button>
      </robo-section>
    </robo-section>
    
    
    <robo-status v-if="message" :type="messageType" size="small" offset="x0">
      {{ message }}
    </robo-status>
  </robo-grid>
</template>

<script>
export default { name: 'RoboAccountPolkadotSubscription' }
</script>

<script setup>
import {ref, nextTick,  } from "vue";
import {generateAccountNoPassword} from './tools';
import {downloadZip} from '../../tools';

import QRCode from 'qrcode';
import { useStore } from 'vuex'

const emit = defineEmits(['accountAdded', 'error']);

const type = ref("sr25519");
const message = ref("");
const messageType = ref("");
const isGenerating = ref(false);
const generatedAccount = ref(null);
const qrCodeGenerated = ref(false);
const qrCodeRef = ref(null);

const store = useStore()

const handlerGenerate = async () => {
  isGenerating.value = true;
  message.value = "";
  messageType.value = "";

  try {
    const {mnemonic, json} =  generateAccountNoPassword() 

    generatedAccount.value = {
      address: json.address,
      type: type.value,
      mnemonic: mnemonic,
      timestamp: json.meta.whenCreated,
      data: {
        address: json.address,
        type: type.value,
        mnemonic: mnemonic,
        timestamp: json.meta.whenCreated,
      }
    };

    message.value = "Account generated successfully!";
    messageType.value = "ok";

    store.commit('polkadot/setGeneratedAccount', json.address)

    await nextTick();
    await generateQRCode();

  } catch (error) {
    console.error("Error in handlerGenerate:", error);
    message.value = `Error generating account: ${error.message}`;
    messageType.value = "error";
    emit('error', error.message);
  } finally {
    isGenerating.value = false;
  }
};

// Generate QR code
const generateQRCode = async () => {
  if (!generatedAccount.value || !qrCodeRef.value) return;
  
  try {
    const qrData = {
      address: generatedAccount.value.address,
      mnemonic: generatedAccount.value.mnemonic,
      type: generatedAccount.value.type,
      timestamp: new Date().toISOString()
    };
    
    const qrString = JSON.stringify(qrData, null, 2);
    
    
    qrCodeRef.value.innerHTML = '';
    
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, qrString, {
      width: 100,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    qrCodeRef.value.appendChild(canvas);
    qrCodeGenerated.value = true;
    
    
  } catch (error) {
    console.error('Error generating QR code:', error);
    message.value = `Error generating QR code: ${error.message}`;
    messageType.value = "error";
  }
};

// Download QRs
const downloadQRs = async () => {
  if (!generatedAccount.value) return;

  const qrData = generatedAccount.value.mnemonic;
  const qrString = JSON.stringify(qrData, null, 2);

  try {
    // Generate SVG
    const svgString = await QRCode.toString(qrString, { type: 'svg', width: 200 });

    // Generate PNG
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, qrString, { width: 200 });
    const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve));

    // Create ZIP with both files
    await downloadZip(
      [
        { name: `account-qr-${generatedAccount.value.address}-${generatedAccount.value.timestamp}.svg`, content: svgString },
        { name: `account-qr-${generatedAccount.value.address}-${generatedAccount.value.timestamp}.png`, content: pngBlob }
      ],
      `account-qr-${generatedAccount.value.address}-${generatedAccount.value.timestamp}`
    );
  } catch (error) {
    console.error("Error downloading QR archive:", error);
    message.value = `Error downloading QR archive: ${error.message}`;
    messageType.value = "error";
  }
};

</script>

<style>
.qr-code canvas {
  width: 100px !important;
  height: 100px !important;
  max-width: none;
  max-height: none;
  image-rendering: pixelated;
}
</style>

<style scoped>
.flex-container {
  flex-direction: column;
}

.flex-container .robo-input {
  width: 100%;
}

.qr-container {
  width: 100px;
  height: 100px;
  background: var(--robo-color-light);
  border-radius: 15px;
  border: 1px solid #eee;
}

.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
