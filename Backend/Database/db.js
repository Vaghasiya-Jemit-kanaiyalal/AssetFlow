const mysql = require('mysql2');
const path = require('path');

// Ensure dotenv reads from the root backend folder
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ,
    port: parseInt(process.env.DB_PORT, 10),
    waitForConnections: true,
    connectionLimit: 10, // Keeps 10 optimized lanes open for high concurrency spikes
    queueLimit: 0
});

// Convert the pool to use clean async/await Promises
const db = pool.promise();

module.exports = db;