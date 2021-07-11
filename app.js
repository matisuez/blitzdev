
require('dotenv').config();

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const {
    TEST
} = process.env;

const discography = [];

async function processLineByLine() {
    const filePath = path.join(__dirname, './utils/discography_2.txt');
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        const year = line.trim().split(' ')[0].trim();
        const album = line.substring(4, line.length).trim();
        discography.push({ year: parseInt(year), album });

    }

    console.log(discography);

}

processLineByLine();

console.log(TEST);