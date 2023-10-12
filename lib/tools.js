import FileSaver from "file-saver"

export function getImage(image) {
    return new URL(`/lib/images/${image}`, import.meta.url)
}

/* For checking is rws is active now or not (in hours) */
export function checkStatus(date) {
    if(date) {
        const now = Date.now()
        const end = date
        return Math.floor((end - now) / (1000 * 60 * 60))
    }
}

export function checkRole(user, rws) {
    if(user && rws) {
        if(user === rws) {
            return 'owner'
        } else {
            return 'user'
        }
    } else {
        return null
    }
}

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

/* + WORK WITH DATES */
export function dateToDays(date) {
    return Math.floor(date / (24 * 1000 * 60 * 60))
}

export function dateGetString(date) {
    return new Date(date).toLocaleDateString()
}

export function dateGetRange(date) {
    return dateToDays(date - Date.now())
}
/* - WORK WITH DATES */

/* + WORK WITH RWS */
export function setStatusView(statusDays) {

    if(statusDays > (5) ) {
        return 'ok'
    }

    if(statusDays > 0 && statusDays < (5)) {
        return 'warning'
    }

    if(statusDays < 0) {
        return 'error'
    }
}
/* - WORK WITH RWS */

/* + WORKS WITH POLKADOT */
export function shortenAddress(address) {
    const addressArray = address.split('')
    const result = addressArray.slice(0, 4) + "..." + addressArray.slice(-4)
    return result.replace(/,/g, '')
  }
/* - WORKS WITH POLKADOT */