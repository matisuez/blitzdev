
require('dotenv').config();

const {
    createBoardAndList,
    createCards
} = require('./helpers/trello.helper');

createBoardAndList().then( () => {
    createCards();
});

