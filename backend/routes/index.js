const { Router } = require('express');
const router = Router();

const dbService = require('../db/dbService')

//add book
router.post('/add', (request, response) => {

})

//edit book
router.post('/edit?:id', (request, response) => {

})
//delete book
router.get('/delete?:id', (request, response) => {

})

//get all books
router.get('/books', (request, response) => {

})

module.exports = router;