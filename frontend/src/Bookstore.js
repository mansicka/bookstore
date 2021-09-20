import * as React from 'react';
import { Paper, Grid } from "@mui/material";
import { Typography } from "@mui/material";

function Bookstore() {
    return (
        <div className="Bookstore">
            <Grid container spacing={4} justifyContent='space-around'>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant='h2'>bookstore</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Bookstore;
