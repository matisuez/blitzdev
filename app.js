
require('dotenv').config();

const {
    processDiscographyFromTXT
} = require('./helpers/file-handler.helper');

const {
    deleteBoardById,
    getBoardIdByName,
    createBoard,
    createListForAlbums,
    createCardForAlbums,
    getListIdByName
} = require('./helpers/trello.helper');

/*

function initProgram() {
    getBoardIdByName(boardName).then( idBoard => {
        
        deleteBoardById(idBoard);

        return idBoard;

    }).then( idBoard => {
        createBoard(boardName);
    });
}

*/

/*

function scriptOne() {

    getBoardIdByName(boardName).then( idBoard => {
        
        processDiscographyFromTXT('Sui generis').then( discography => {

            for (const d of discography.decades) {
                createListForAlbums(idBoard, d.decade);
            }
            
            return idBoard;

        }).then( idBoard => {
            scriptTwo(idBoard);
        });

        

    });
    
}

*/

/*

function scriptTwo(idBoard) {
    processDiscographyFromTXT('Sui generis').then( discography => {
        for (const d of discography.decades) {
            getListIdByName(idBoard, d.decade).then( idList => {
                    
                    for(const album of discography.decades.find( d => d.decade == d.decade).albums) {
                        createCardForAlbums(idList, { name: `${album.year} - ${album.album}`, image: 'Image' });
                    }           

            });
        }



    });
}

*/

const boardName = "Blitdev - challenge";

async function main() {
    
    const discography = await processDiscographyFromTXT('Sui generis');

    const oldBoardId = await getBoardIdByName(boardName);
    await deleteBoardById(oldBoardId);
    await createBoard(boardName);
    
    const idBoard = await getBoardIdByName(boardName);
    
    for (const d of discography.decades) {
        await createListForAlbums(idBoard, d.decade);
    }

}

async function main2() {
    
    const discography = await processDiscographyFromTXT('Sui generis');

    getBoardIdByName(boardName).then( async idBoard => {
        
        for (const d of discography.decades) {
        
            for (const a of d.albums) {
                
                await getListIdByName( idBoard, d.decade).then( async idList => {
    
                    await createCardForAlbums(idList, { name: `${a.year} - ${a.album}`, image: 'Image' });    
    
                });
                  
            }        
        
        }

    });

    

}

main().then( () => {
    main2();
});

