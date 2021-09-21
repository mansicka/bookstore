import React from 'react';
import { useState, useEffect } from "react";
import { Paper, Grid, TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";

function Bookstore() {
    const url = 'http://localhost:5000';
    const [books, setBooks] = useState([]); // books fetched from api
    const [message, setMessage] = useState(''); // error placeholder
    const [book, setBook] = useState({ id: '', author: '', title: '', description: '' }); //single book properties

    const getBooks = async () => {
        setMessage('');
        let response = await fetch(url + '/books', { method: 'GET' });
        if (!response.ok) {
            message('Error while getting books: ' + response.statusText)
            throw new Error(response.statusText);
        }
        let books = await response.json();
        setBooks(books);
    }

    //grab book, set in state
    const handleChange = async (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }

    //display error message for 2 sec, then clear error message
    const showMessage = (error) => {
        setMessage(error)
        setTimeout(() => {
            setMessage('')
        }, 2000);
    }

    //Edit existing entry function
    const editBook = async (book) => {
        let response = await fetch(url + '/edit', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            showMessage('Error while saving book: ' + response.statusText)
            throw new Error(response.statusText);
        } else { showMessage('Book saved OK!') }
        getBooks();
    }

    //Save new book function
    const saveNewBook = async (book) => {
        let response = await fetch(url + '/add', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            showMessage('Error while saving book: ' + response.statusText)
            throw new Error(response.statusText);
        } else { showMessage('Book saved OK!') }
        getBooks();
    }

    //Save book
    //If id is not present, save as new book. 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!book.id) { saveNewBook(book) }
        else { editBook(book) };
        setBook({ id: '', author: '', title: '', description: '' });
    }


    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="Bookstore">
            <Grid container spacing={4} justifyContent='space-around'>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h2'>bookstore</Typography>
                </Grid>
                {message}
            </Grid>
            <form>
                <TextField
                    disabled
                    name='id'
                    value={book.id}
                    label='Id'
                    variant='outlined'
                    color='primary'
                    InputProps={{
                        readOnly: true,
                    }}
                /> <br /><br />
                <TextField
                    name='author'
                    value={book.author}
                    label='Author'
                    variant='outlined'
                    color='primary'
                    onChange={handleChange}
                /><br /><br />
                <TextField
                    name='title'
                    value={book.title}
                    label='Title'
                    variant='outlined'
                    color='primary'
                    onChange={handleChange}
                /><br /><br />
                <TextField
                    name='description'
                    value={book.description}
                    label='Description'
                    variant='outlined'
                    color='primary'
                    onChange={handleChange}
                    multiline
                    rows={5}
                    style={{ width: 500 }}
                /><br /><br />
                {book.id &&
                    < Button variant="contained" onClick={(e) => handleSubmit(e)}>
                        Save book
                    </Button>}
                {!book.id &&
                    < Button variant="contained" onClick={(e) => handleSubmit(e)}>
                        Save new book
                    </Button>}
            </form>
        </div >
    );
}

export default Bookstore;
