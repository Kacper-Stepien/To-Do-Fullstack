const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.post("/", (request, response) => {
    try {
        response.clearCookie("user");   // Wyczyszczenie ciasteczka
        response.status(200).json({ status: "ok", message: "Logged out" });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Internal server error" });
    }
});

module.exports = router;