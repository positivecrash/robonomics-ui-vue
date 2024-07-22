// import { mnemonicGenerate, ed25519PairFromSeed, mnemonicToMiniSecret } from "@polkadot/util-crypto"
import { mnemonicGenerate } from "@polkadot/util-crypto"
// import { Keyring } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'

export function isValidAddress(address) {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true
  } catch (error) {
    return false
  }
}

export function isOwnerConnected(connected, owner) {
  if(isValidAddress(connected) && isValidAddress(owner)) {
    const chain = '32'
    const account = encodeAddress(connected, chain)
    const rwsowner = encodeAddress(owner, chain)
    return account === rwsowner
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

export function shortenAddress(address) {
    const addressArray = address.split('')
    const result = addressArray.slice(0, 4) + "..." + addressArray.slice(-4)
    return result.replace(/,/g, '')
}

// export function getpair(seed, type) {
//   if(type === 'ed25519') {
//     const seedconverted = mnemonicToMiniSecret(seed)
//     console.log('test 2', ed25519PairFromSeed(seedconverted))
//     return ed25519PairFromSeed(seedconverted)
//   }

//   if(type === 'sr25519') {
//     return keyring.createFromUri(seed)
//   }
// }