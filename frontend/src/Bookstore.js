import React from 'react';
import { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Bookstore() {
    const url = 'http://localhost:5000';
    const [books, setBooks] = useState([]); // books fetched from api
    const [message, setMessage] = useState(''); // error placeholder
    const [book, setBook] = useState({ id: '', author: '', title: '', description: '' }); //single book properties

    //display error message for 2 sec, then clear error message
    const showMessage = (error) => {
        setMessage(error)
        setTimeout(() => {
            setMessage('')
        }, 2000);
    }

    //Grab book, set in state
    const handleChange = async (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }


    //Save book
    //If id is not present, save as new book. 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!book.id) { saveNewBook(book) }
        else { editBook(book) };
        setBook({ id: '', author: '', title: '', description: '' });
    }

    const getBooks = async () => {
        setMessage('');
        let response = await fetch(url + '/books', { method: 'GET' });
        if (!response.ok) {
            message('Error while getting books: ' + response.statusText)
        }
        let books = await response.json();
        setBooks(books);
    }

    //delete book
    const deleteBook = async (id) => {
        let response = await fetch(url + '/delete', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (!response.ok) {
            showMessage('Error while deleting book: ' + response.statusText)

        } else { showMessage('Book deleted OK!') }
        getBooks();
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
        } else { showMessage('Book saved OK!') }
        getBooks();
    }




    useEffect(() => {
        getBooks();
    });

    return (
        <div className="Bookstore">
            <Grid container spacing={4} justifyContent='center'>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h2'>bookstore</Typography>
                </Grid>


                <Grid item xs={3} padding={20}>
                    <Table size='medium'>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography><b>ID</b></Typography></TableCell>
                                <TableCell><Typography><b>Author</b></Typography></TableCell>
                                <TableCell><Typography><b>Title</b></Typography></TableCell>
                                <TableCell><Typography><b>Description</b></Typography></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map(b => (

                                <TableRow key={b.id}>
                                    <TableCell align="right">{b.id}</TableCell>
                                    <TableCell align="right">{b.author}</TableCell>
                                    <TableCell align="right">{b.title}</TableCell>
                                    <TableCell align="right">{b.description}</TableCell>
                                    <TableCell align="right">< Button variant="contained" onClick={() => setBook(b)}>
                                        Edit
                                    </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        < Button variant="contained" onClick={() => deleteBook(b.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={4} padding={20}>{message}</Grid>
                <Grid item xs={4} padding={20}>
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

                </Grid>
                <Grid item xs={3} padding={20}>
                </Grid>
            </Grid>
        </div >
    );
}

export default Bookstore;
