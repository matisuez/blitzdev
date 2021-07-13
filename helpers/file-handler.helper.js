
const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processDiscographyFromTXT(name) {
    
    let discography = { name, decades: [] };
    const albums = [];
    const filePath = path.join(__dirname, '../utils/discography_2.txt');
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const year = line.trim().split(' ')[0].trim();
        const album = line.substring(4, line.length).trim();
        albums.push({ year: year, album });
    }

    albums.sort( (a, b) => {
        return a.year - b.year;
    });

    
    discography = createDecadesByAlbumsFromDiscography(discography, albums);

    return discography;

}

function createDecadesByAlbumsFromDiscography(discography, albums) {
    let decades = [];
    
    for (const a of albums) {
        let decade = `${a.year.substring(0, 3)}0`;
        if(!decades.includes(parseInt(decade))) {
            decades.push(parseInt(decade));
        }
    }
    for (const d of decades) {
        
        discography.decades.push({
            decade: d,
            albums: albums.filter( a => a.year >= d && a.year < (d+10))
        });
    }
    
    return discography;
    
}

module.exports = {
    processDiscographyFromTXT
}