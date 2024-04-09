import FileSaver from "file-saver"
import CryptoJS from 'crypto-js'

export function downloadJson (content, filename) {
    if(!content) {
        return
    }

    if(!filename) {
        filename = 'backup_' + Date.now()
    }

    let json = null

    if(typeof content == 'object') {
        json = JSON.stringify(content)
    }

    if(typeof content == 'string') {
        json = content
    }

    if(json) {
        FileSaver.saveAs(
            new Blob([json], {
                type: "application/json; charset=utf-8"
            }),
            `${filename}.json`
        )
    }
}

export function fileupload (e, onloadfunc) {
    const files = e.target.files
    const file = files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    if(onloadfunc) {
        reader.onload = function() {
            onloadfunc(reader.result)
        }
    }
}

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

// export function rwsIsExpired(date) {
//     if(date) {
//         if(dateGetRange(date) > 0) {
//             return false
//         } else {
//             return true
//         }
//     }
// }

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