const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//add book
app.post('/add', (request, resposne) => {

})

//edit book
app.post('/edit', (request, resposne) => {

})
//delete book
app.post('/delete', (request, resposne) => {

})

//get all books
app.get('/books', (request, resposne) => {

})