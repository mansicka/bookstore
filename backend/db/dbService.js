const mysql = require('mysql2');
const dotenv = require('dotenv');
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
        console.log('mysql connection error: ' + err.message + '\n exiting...');
        process.exit()
    }
    else {
        let query = "CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT, title varchar(250) NOT NULL, author varchar(250) NOT NULL, description varchar(400) NOT NULL, PRIMARY KEY(id)) ENGINE = InnoDB AUTO_INCREMENT = 0";
        connection.query(query, (err) => {
            if (err) {
                console.log('Error when initializing table: ' + err + '\n exiting...');
                process.exit();
            }
        })
        console.log('mysql: connected to database: ' + connection.config.database)
    }
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }


    async getAll() {
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


    async insertNew(book) {

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

    async deleteById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM books WHERE id = ?;"
                connection.query(query, [id], (err, result) => {
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

    async updateOne(book) {
        try {
            id = parseInt(book.id);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE books SET title = ?, author = ?, description = ?  WHERE id = ?";

                connection.query(query, [book.title, book.author.book.description, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;