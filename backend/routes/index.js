const { Router } = require('express');
const router = Router();

const DbService = require('../db/dbService')

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
router.get('/books/', (request, response) => {
    const db = DbService.getDbServiceInstance();

    const results = db.getAll();
    results
        .then(data => response.json(data))
        .catch(err => response.json(err));
})

module.exports = router;