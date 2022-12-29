const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.get("/", (request, response) => {
    let login = request.cookies.user;
    if (!login) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else {
        console.log(login);
        response.status(200).json({ status: "ok", message: "Logged in", login: login });
    }
});

module.exports = router;