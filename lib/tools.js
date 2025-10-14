import FileSaver from "file-saver";
import JSZip from "jszip";

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

export async function downloadZip(files, filename) {
  try {
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.name, file.content);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    FileSaver.saveAs(zipBlob, `${filename || "archive"}.zip`);
  } catch (e) {
    console.error("Error creating ZIP archive:", e);
  }
}


/* + WORK WITH DATES */
export function dateToDays(date) {
    return Math.floor(date / (24 * 1000 * 60 * 60))
}

export function dateGetString(date) {
    return new Date(date).toLocaleDateString('ru-RU')
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
const words_adjectives = [
    "Adventurous", "Bouncy", "Brilliant", "Cheerful", "Chirpy", "Colorful", "Cuddly", "Dazzling", "Delightful", "Energetic",
    "Excited", "Friendly", "Fun", "Giggly", "Glowing", "Happy", "Jolly", "Jovial", "Lively", "Lovely",
    "Merry", "Optimistic", "Peppy", "Perky", "Playful", "Quirky", "Radiant", "Silly", "Smiley", "Sparkly",
    "Spirited", "Sunny", "Sweet", "Vibrant", "Whimsical", "Witty", "Zany", "Zesty", "Breezy", "Charming",
    "Dapper", "Eager", "Fantastic", "Fluffy", "Gleeful", "Goofy", "Hilarious", "Jumpy", "Kind", "Lush",
    "Marvelous", "Mischievous", "Neat", "Nice", "Peachy", "Perceptive", "Quick", "Rosy", "Snappy", "Snazzy",
    "Snuggly", "Sociable", "Sprightly", "Squeaky", "Tidy", "Upbeat", "Wacky", "Warm", "Welcoming", "Yummy"
];

const words_nouns = [
    "Alligator", "Anaconda", "Antelope", "Armadillo", "Axolotl", "Baboon", "Badger", "Barracuda", "Bat", "Beaver",
    "Beluga", "Bison", "Butterfly", "Camel", "Capybara", "Caribou", "Caterpillar", "Cheetah", "Chinchilla", "Chipmunk",
    "Cobra", "Cockatoo", "Corgi", "Crab", "Crocodile", "Dolphin", "Donkey", "Duck", "Eagle", "Elephant",
    "Ferret", "Flamingo", "Fox", "Frog", "Giraffe", "Goat", "Goose", "Hedgehog", "Hippo", "Horse",
    "Jaguar", "Jellyfish", "Kangaroo", "Koala", "Lemur", "Leopard", "Llama", "Lobster", "Meerkat", "Moose",
    "Narwhal", "Ocelot", "Octopus", "Otter", "Owl", "Panda", "Parrot", "Peacock", "Penguin", "Platypus",
    "Puffin", "Quokka", "Rabbit", "Raccoon", "Reindeer", "Seahorse", "Sloth", "Squirrel", "Starfish",
    "Tiger", "Tortoise", "Toucan", "Turtle", "Walrus", "Whale", "Wolf", "Wombat", "Zebra"
];

export function generateName() {
    return words_adjectives[Math.floor(Math.random() * words_adjectives.length)] + ' ' +
           words_nouns[Math.floor(Math.random() * words_nouns.length)];
}

/* - For random generate name */

/* + some common tools for crypto */
export function shortenAddress(address) {
    const addressArray = address.split('')
    const result = addressArray.slice(0, 6) + "..." + addressArray.slice(-4)
    return result.replace(/,/g, '')
}
/* - some common tools for crypto */

export function getDate() {
    var today = new Date();
    // var m = String(today.getMinutes());
    // var h = String(today.getHours());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export function formatFileName(name) {
    return window.location.host + '-' + name.replace(/ /g, '_') + '-' + getDate();
}