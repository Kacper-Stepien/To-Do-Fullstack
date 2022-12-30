const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.post("/", (request, response) => {
    let taskId = request.body.idtask;
    try {
        db.query("UPDATE tasks SET finished = 1 WHERE idtask = ?", [taskId]);
        response.status(200).json({ status: "ok", message: "Task updated" });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Database error" });
    }
});

module.exports = router;