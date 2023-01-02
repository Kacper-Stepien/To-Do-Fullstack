const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const session = require('express-session');

router.post("/", (request, response) => {
    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else {
        try {
            let login = request.session.user.login;
            let user_id = db.query("SELECT iduser FROM users WHERE login = ?", [login]);
            user_id = user_id[0].iduser;
            db.query(`DELETE FROM tasks WHERE user_id = ? AND finished = 0`, [user_id]);
            response.status(200).json({ status: "ok", message: "All tasks deleted" });
        }
        catch (error) {
            response.status(500).json({ status: "error", message: "Internal error" });
        }
    }

});

module.exports = router;