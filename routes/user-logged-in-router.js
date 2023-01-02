const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require('express-session');
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
        response.status(200).json({ status: "ok", message: "Logged in", login: login });
    }
});

module.exports = router;