/* Functions for working with IndexedDB */

/*  
    function IDBworkflow
    Basic for InxedDB:
    - opens and checks for uppropriate version;
    - creates objectStore for dbtable

    Usage example:
    idbworkflow('db', 1, 'dbtable', 'readonly', store => {
        let somearray = []
        store.openCursor().addEventListener('success', e => {
            const cursor = e.target.result
            if(cursor){
                somearray.push(cursor.value)
                cursor.continue()
            }
        })
    })
 */
export function IDBworkflow(dbname, dbver, dbtable, mode, onsuccess, keyIndex, createIndex) {
    const IDB = window.indexedDB || window.webkitIndexedDB
    if(!IDB) { return }

    let db = null
    const DBOpenReq = IDB.open(dbname, dbver)
    
    DBOpenReq.addEventListener('error', err => {
        console.warn(err)
    })

    DBOpenReq.addEventListener('success', e => {
        db = e.target.result;

        if(db.objectStoreNames.contains(dbtable)) {
            let tx = db.transaction(dbtable, mode);
            tx.addEventListener('error', err => {
                console.warn(err)
            })
            const store = tx.objectStore(dbtable)
            onsuccess(store)
        }
    })

    DBOpenReq.addEventListener('upgradeneeded', (e) => {
        console.log('upgradeneeded')
        db = e.target.result
           
        const oldVersion = e.oldVersion
        const newVersion = e.newVersion || db.version
        console.log('DB updated from version', oldVersion, 'to', newVersion)

        if (!db.objectStoreNames.contains(dbtable)) {

            let dbobj
            try {
                dbobj = db.createObjectStore(dbtable, {keyPath: keyIndex.index, autoIncrement: keyIndex.autoIncrement})
            } catch (e) {
                console.log(e)
                return
            }

            if(createIndex) {
                try{
                    createIndex.forEach(i => {
                        dbobj.createIndex(i.index, i.index, { unique: i.unique })
                    })
                } catch (e) {
                    console.log(e)
                }
                
            }
        }
    })
}

/* gets all data from the table */
export function IDBgettable(dbname, dbver, dbtable, keyIndex, createIndex) {
    return new Promise((resolve) => {
        let datafromtable = []
        IDBworkflow(dbname, dbver, dbtable, 'readonly', store => {
            store.openCursor().addEventListener('success', e => {
                const cursor = e.target.result
                if(cursor){
                    datafromtable.push(cursor.value)
                    cursor.continue()
                } else {
                    resolve(datafromtable)
                }
            })
        }, keyIndex, createIndex)
    })
}

function getuint(data) {
    let bufer = [];

    Object.values(data).forEach(e => {
        bufer.push(e);
    });

    return Uint8Array.from(bufer);
}

export async function decrypt(iv, key, todecrypt) {
    const webcrypto = window.crypto.subtle || window.crypto.webkitSubtle

    if (!webcrypto) {
        console.error('Web Crypto API not supported')
        return
    }

    const decrypted = await webcrypto.decrypt(
        {
            name: 'AES-GCM',
            iv
        },
        key,
        todecrypt
    )
    .then(decrypted => {
        const decoder = new TextDecoder();
        let data = decoder.decode(decrypted);
        data = JSON.parse(data);
        data.publicKey = getuint(data.publicKey);
        data.secretKey = getuint(data.secretKey);
        return data;
    })
    .catch(function(err){
        console.error(err)
    })

    return decrypted
}