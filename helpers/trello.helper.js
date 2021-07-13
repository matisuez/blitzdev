
const axios = require('axios');

const {
    TRELLO_API_KEY,
    TRELLO_API_TOKEN
} = process.env;

async function deleteBoardById(id) {
    try {
        const res = await axios.delete(`https://api.trello.com/1/boards/${id}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
    } catch (error) {
        console.log('Error to delete the board.');
    }
}

async function getBoardIdByName(name) {
    try {
        const res = await axios.get(`https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
        const board = await res.data.find( board => board.name == name);
        
        let result;

        if(!board) {
            result = board;    
        } else {
            result = board.id;
        }

        return result;

    } catch (error) {
        console.log('Error to get the board.');        
    }        
}

async function createBoard(name) { 
    try {
        const res = await axios.post(`https://api.trello.com/1/boards/?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&name=${name}`);
    } catch (error) {
        console.log('Error to create the board.');
    }
}

async function createListForAlbums(idBoard, name) {
    try {
        const res = await axios.post(`https://api.trello.com/1/lists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&name=${name}&idBoard=${idBoard}`);
        console.log(res);
    } catch (error) {
        console.log('Error to create the list.');
    }
}

async function createCardForAlbums(idList, album) {
    try {
        const res = await axios.post(`https://api.trello.com/1/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&idList=${idList}&name=${album.name}&urlSource=${album.image}`);
        
    } catch (error) {
        console.log('Error to create the card.');
    }
}

async function getListIdByName(idBoard, listName) {

    try {
        const res = await axios.get(`https://api.trello.com/1/boards/${idBoard}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`);
        const list = await res.data.find( list => list.name == listName);
        
        let result;

        if(!list) {
            result = list;    
        } else {
            result = list.id;
        }

        return result;
    } catch (error) {
        console.log('Error to get the list.');
    }
        
    
}

module.exports = {
    deleteBoardById,
    getBoardIdByName,
    createBoard,
    createListForAlbums,
    createCardForAlbums,
    getListIdByName
}