import FileSaver from "file-saver"
import CryptoJS from 'crypto-js'
import { generateAccount } from './polkadot/tools'

export function downloadJson (content, filename) {

    try {
        var file = filename || 'backup_' + Date.now();
        
        if(typeof content == 'object') {
            var json = JSON.stringify(content)
        }
    
        if(typeof content == 'string') {
            var json = content
        }

        FileSaver.saveAs(
            new Blob([json], {
                type: "application/json; charset=utf-8"
            }),
            `${file}.json`
        )
    } catch (e) {
        console.log(e);
    }

}

// export async function shareJson (content, filename, title, text) {

//     try {
//         if(typeof content == 'object') {
//             var json = JSON.stringify(content)
//         }
    
//         if(typeof content == 'string') {
//             var json = content
//         }

//         var blob = new Blob([json], {
//             type: "text/plain"
//         });

//         // var data = {
//         //     files: [
//         //       new File([blob], `${filename}.json`, {
//         //         type: blob.type,
//         //       }),
//         //     ],
//         //     title,
//         //     text,
//         // };

//         var data = new File([blob], `${filename}.txt`, {
//             type: blob.type,
//           });

//           if (navigator.canShare && navigator.canShare({data})) {
//             console.log('Sharing files is supported');
//           }

//         console.log('test', json);

//         try {
//             await navigator.share(data);
//         } catch (e) {
//             console.log(e);
//         }
        
//     } catch (e) {
//         console.log(e);
//     }
// }

// export function fileupload (e, onloadfunc) {
//     const files = e.target.files
//     const file = files[0]
//     const reader = new FileReader()
//     reader.readAsText(file)
//     if(onloadfunc) {
//         reader.onload = function() {
//             onloadfunc(reader.result)
//         }
//     }
// }

export function isencrypted (data, key) {
    const endata = CryptoJS.AES.decrypt(data, key)
    try {
        const decrypted = endata.toString(CryptoJS.enc.Utf8)
        return !!decrypted
    }
    catch (error) {
        return false
    }
}

/* + WORK WITH DATES */
export function dateToDays(date) {
    return Math.floor(date / (24 * 1000 * 60 * 60))
}

export function dateGetString(date) {
    return new Date(date).toLocaleDateString()
}

export function dateGetRange(date) {
    return dateToDays(Date.now() - date)
}
/* - WORK WITH DATES */

/* + WORK WITH RWS */
export function setStatusView(statusDays) {

    if( statusDays <= -5 ) {
        return 'ok'
    }

    if(statusDays <= -1 && statusDays > -5) {
        return 'warning'
    }

    if(statusDays >= 0) {
        return 'error'
    }
}
/* - WORK WITH RWS */

/* + For random generate name */
const words_adjectives = ["able", "absolute", "absorbed", "abstracted", "academic", "accessible", "accurate", "acid", "acrobatic", "active", "actual", "adaptable", "addicted", "admirable", "advanced", "adventurous", "agile", "alive", "altruistic", "amazing", "amiable", "amusing", "ancient", "angry", "animated", "antique", "apathetic", "appetizing", "arctic", "artistic", "aspiring", "athletic", "attentive", "automatic", "awake", "awesome", "awkward",
"babyish", "baggy", "barbarous", "bare", "basic", "bawdy", "beautiful", "beneficial", "better", "big", "bizarre", "blissful", "blushing", "bored", "bossy", "brainy", "brave", "bright", "brilliant", "bubbly", "bumpy", "busy"]

const words_nouns = ["alligator", "anaconda", "angelfish", "ant", "anteosaurus", "antelope", "armadillo", "ape", "albatross", "axolotl", "alpaca", "angelshark",
"badger", "beetle", "bear", "bug", "beluga", "baboon", "bat", "bea", "bee", "bluefish", "boggle", "buffalo", "butterfly", "barracuda", "beaver", "bird", "bison", "brontosaurus", "bulldog", 
"capybara", "catfish", "chicken", "cicada", "cow", "crab", "crocodile", "crow", "cuckoo", "camel", "carp", "cat", "cheetah", "cobra", "caterpillar", "chameleon", "chinchilla"]

export function generateName() {
    return words_adjectives[Math.floor(Math.random()*words_adjectives.length)] + ' ' + words_nouns[Math.floor(Math.random()*words_nouns.length)]
}
/* - For random generate name */

/* + some common tools for crypto */
export function shortenAddress(address) {
    const addressArray = address.split('')
    const result = addressArray.slice(0, 6) + "..." + addressArray.slice(-4)
    return result.replace(/,/g, '')
}
/* - some common tools for crypto */

export function generateConfig(owner, password) {

    try {
        const { mnemonic, json } = generateAccount(password);
        const controller = json.address;
        const controllerkey = json;

        const backup = {
            name: generateName(),
            owner: owner,
            controller: controller,
            controllerkey: controllerkey,
            datalogtimeout: 10
        }

        return backup;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export function getDate() {
    var today = new Date();
    // var m = String(today.getMinutes());
    // var h = String(today.getHours());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export function getConfigFileName(name) {
    return window.location.host + '-' + name.replace(/ /g, '_') + '-' + getDate();
}