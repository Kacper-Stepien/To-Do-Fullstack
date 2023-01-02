const sql = require('sync-mysql');
const dotenv = require('dotenv').config();   // Load environment variables from a .env file into process.env

const db = new sql({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

module.exports = db;