const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const db = require('../routes/db-config');
const sessionExists = require('../controllers/functions/check-if-session-exists');

router.get("/", (request, response) => {
    if (!sessionExists(request, response)) {
        response.status(401).json({ status: "error", message: "Not logged in" });
    }
    else {
        request.session.reload(function (err) {
            if (err) {
                response.status(401).json({ status: "error", message: "Not logged in" });
            }
        });
        let login = request.session.user.login;
        let ok = true;
        try {
            result = db.query("SELECT 1");
        } catch (err) {
            ok = false;
            response.status(500).json({ status: "error", message: "Database error" });
        }
        if (ok)
            response.status(200).json({ status: "ok", message: "Logged in", login: login });
    }
});

module.exports = router;