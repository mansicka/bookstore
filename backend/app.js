const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes')
const dbService = require('./db/dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

const db = new dbService;
db.sync
app.listen(process.env.PORT, () => { console.log('express running on port ' + process.env.PORT) })
