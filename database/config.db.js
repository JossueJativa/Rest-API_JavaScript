const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite'); // Database file location
let db;

const dbConnection = async () => {
    try {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error connecting to SQLite:', err.message);
                throw new Error('Failed to connect to SQLite');
            }
            console.log('Connected to the SQLite database.');
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT UNIQUE,
                password TEXT
            );

            CREATE TABLE IF NOT EXISTS role (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                role TEXT UNIQUE
            );
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Users table is ready.');
            }
        });

    } catch (error) {
        console.error(error);
        throw new Error('Error initializing the database');
    }
};

module.exports = {
    dbConnection
};
