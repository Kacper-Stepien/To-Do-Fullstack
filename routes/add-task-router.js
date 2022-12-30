const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.post("/", (request, response) => {
    let login = request.cookies.user;
    if (!login) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else {
        try {
            let user_id = db.query("SELECT iduser FROM users WHERE login = ?", [login]);
            user_id = user_id[0].iduser;
            let title = request.body.title;
            let description = request.body.description;
            let priority = request.body.priority;
            let finished = request.body.finished;
            let date_added = request.body.date_added;

            let sql = `INSERT INTO tasks(title, description, priority, finished, user_id, added_date) VALUES(?, ?, ?, ?, ?, ?)`;
            db.query(sql, [title, description, priority, finished, user_id, date_added]);

            response.status(200).json({ status: "ok", message: "Task added" });
        }
        catch (error) {
            response.status(500).json({ status: "error", message: error.message });
        }
    }

});

module.exports = router;