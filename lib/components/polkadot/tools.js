import { mnemonicGenerate, ed25519PairFromSeed, mnemonicToMiniSecret, sr25519PairFromSeed, cryptoWaitReady } from "@polkadot/util-crypto"
// import { Keyring } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'

export function isValidAddress(address) {
  if (
    !address ||
    typeof address !== 'string' ||
    address.trim() === ''
  ) {
    // console.warn('[robonomics-ui-vue] Address is empty or not a string:', address);
    return false;
  }

  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );
    return true;
  } catch (error) {
    console.error('[robonomics-ui-vue] Address is not valid:', error);
    return false;
  }
}

export function isAccountsIdentical(accountfirst, accountsecond) {
  if(isValidAddress(accountfirst) && isValidAddress(accountsecond)) {
    const chain = '32'
    const f = encodeAddress(accountfirst, chain)
    const s = encodeAddress(accountsecond, chain)
    return f === s
  } else {
    return false
  }   
}

export function generateAccount(password) {

    if(!password) {
        console.error('For account generation you need to provide password')
        return
    }

    const mnemonic = mnemonicGenerate()
    const { json } = keyring.addUri(mnemonic, password)

    return { mnemonic, json }
}


export async function getpair(seed, type) {
  if(type === 'ed25519') {
    const seedconverted = mnemonicToMiniSecret(seed)
    return ed25519PairFromSeed(seedconverted)
  }

  // Это пока не удалять, может быть добавится поддержка sr25519
  // if(type === 'sr25519') {
  //   await cryptoWaitReady();
  //   const seedconverted = mnemonicToMiniSecret(seed)
  //   return sr25519PairFromSeed(seedconverted)
  // }
}

// export function checkUser(user, userlist) {
//   let status = '';
//   let msg = '';

//   /* Проверяем не пустой ли */
//   if(!user || user === '') {
//     status = 'error';
//     msg = 'Empty account';
//     return {status, msg}
//   }

//   /* Проверяем валидность самого адреса */
//   if(!isValidAddress(user)) {
//     status = 'error';
//     msg = 'Invalid account';
//     return {status, msg}
//   }

//   /* Проверяем добавлен ли в список юзеров */
//   if(!isInUserList(user, userlist)) {
//     status = 'error';
//     msg = "The controller not added in the subscription's user list";
//     return {status, msg}
//   }

//   status = 'ok';
//   msg = '';
//   return {status, msg}
// }