import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./users.db', (err) => {
    if(err) {
        console.log("Error connecting to SQLite database", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
`);

export default db;