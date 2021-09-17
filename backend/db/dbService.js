const mysql = require('mysql2');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    host: process.env.HOST
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
        process.exit()
    }
    else {
        connection.query("CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT, title varchar(250) DEFAULT NULL, author varchar(250) DEFAULT NULL, description varchar(400) DEFAULT NULL, PRIMARY KEY(id)) ENGINE = InnoDB AUTO_INCREMENT = 0")
        console.log('mysql: connected to database: ' + connection.config.database)
    }
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    //init command for making sure the db structure is ok


    async getAlldata() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM books;"
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;

        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async insertNewBook(book) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO books (title, author, description) VALUES (?,?,?);"
                connection.query(query, [book.author, book.title, book.description], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertedId);
                })
            });

            return response;

        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = DbService;