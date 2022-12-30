const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.get("/", (request, response) => {
    response.sendFile(__dirname + '/views/login.html');
    let login = request.cookies.user;
    if (!login) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
});


module.exports = router;