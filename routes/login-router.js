const express = require('express');
const session = require('express-session');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const logInUser = require('../controllers/login-controller');

router.post("/", (request, response) => {
    let userLogin = request.body.login;
    let userPassword = request.body.password;

    try {
        const results = db.query("SELECT * FROM users WHERE login = ?", [userLogin]);
        if (results.length == 0)
            response.status(401).json({ status: "error", message: "Wrong login" });
        else {
            let user = results[0];
            logInUser(request, response, user, userLogin, userPassword);
        }
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Database error" });
    }
});


module.exports = router;