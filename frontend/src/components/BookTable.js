import React from "react";
import { Table, TableHead, TableCell, TableBody, TableRow, Button, Typography } from "@mui/material";

function BookTable(props) {
    return (
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
                {props.books.map(b => (

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
    )
}