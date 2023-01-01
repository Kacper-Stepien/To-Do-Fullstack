const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const session = require('express-session');

router.get("/", (request, response) => {
    let sessionId = request.cookies.sessionId;
    // let login = request.cookies.user;
    if (!sessionId) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }

    try {
        let login = request.session.user.login;
        user = db.query("SELECT * FROM users WHERE login = ?", [login]);
        tasksFinished = db.query("SELECT * FROM tasks WHERE user_id = ? AND finished = 1", [user[0].iduser]);
        tasksUnfinished = db.query("SELECT * FROM tasks WHERE user_id = ? AND finished = 0", [user[0].iduser]);
        response.status(200).json({ status: "success", user: user, tasksFinished: tasksFinished, tasksUnfinished: tasksUnfinished });
        // response.status(200).json({ status: "success", user: user });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Internal server error 💥💥💥" });
    }
});

module.exports = router;