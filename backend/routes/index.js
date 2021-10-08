const { Router } = require('express');
const router = Router();

const DbService = require('../db/dbService')

//routes for api

//add book
router.put('/books', (request, response) => {
    const book = request.body;

    const db = DbService.getDbServiceInstance();

    const result = db.insertNew(book);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

//edit book
router.patch('/books', (request, response) => {

    const book = request.body;
    const db = DbService.getDbServiceInstance();
    const result = db.updateOne(book);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
})

//delete book
router.delete('/books', (request, response) => {
    const id = parseInt(request.body.id)
    console.log(request.body)
    const db = DbService.getDbServiceInstance();

    const result = db.deleteById(id);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
})

//get all books
router.get('/books/', (request, response) => {
    const db = DbService.getDbServiceInstance();

    const results = db.getAll();
    results
        .then(data => response.json(data))
        .catch(err => response.json(err));
})

//get single book
router.get('/books/:id', (request, response) => {
    const id = parseInt(request.body);
    const db = DbService.getDbServiceInstance();

    const results = db.getOneById(id);
    results
        .then(data => response.json(data))
        .catch(err => response.json(err));
})


module.exports = router;