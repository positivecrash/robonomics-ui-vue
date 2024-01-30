// import { mnemonicGenerate } from '@polkadot/api'
import { mnemonicGenerate } from "@polkadot/util-crypto"
// import { Keyring } from '@polkadot/api'
import keyring from '@polkadot/ui-keyring'

export function generateAccount(password, name) {

    if(!password) {
        console.error('For account generation you need to provide password')
        return
    }
    
    if(!name) {
        name = 'generated_account_' + Date.now()
    }

    const mnemonic = mnemonicGenerate()
    const { json } = keyring.addUri(mnemonic, password, { name: name })
    return { mnemonic, json }
}

export function generateAddress() {

    const mnemonic = mnemonicGenerate()
    
    const { json } = keyring.addUri(mnemonic)
    return { mnemonic, json }
}

export function shortenAddress(address) {
    const addressArray = address.split('')
    const result = addressArray.slice(0, 4) + "..." + addressArray.slice(-4)
    return result.replace(/,/g, '')
}