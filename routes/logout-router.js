const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const session = require('express-session');

router.post("/", (request, response) => {
    try {
        request.session.destroy(() => {
            response.clearCookie('sessionId');
            response.status(200).json({ status: "ok", message: "Logged out" });
        });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;