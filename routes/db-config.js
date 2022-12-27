const sql = require('mysql');
const dotenv = require('dotenv').config();   // Load environment variables from a .env file into process.env
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

module.exports = db;