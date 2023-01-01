const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const session = require('express-session');

router.get("/", (request, response) => {
    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else if (sessionId != request.session.id) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else if (!request.session.user) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else {
        request.session.reload(function (err) {
            if (err) {
                response.status(401).json({ status: "error", message: "Not logged in" });
            }
        });
        let login = request.session.user.login;
        response.status(200).json({ status: "ok", message: "Logged in", login: login });
    }
});

module.exports = router;