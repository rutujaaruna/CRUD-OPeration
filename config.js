const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection to the database
const conn = mysql.createConnection({
    connectionLimit:10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
conn.connect((err) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Connected to MySQL successfully");
    }
});

module.exports = conn;