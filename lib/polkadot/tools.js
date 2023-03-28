import { mnemonicGenerate } from "@polkadot/util-crypto"
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