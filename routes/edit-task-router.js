const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.post("/", (request, response) => {
    try {
        let taskId = request.body.idtask;
        let title = request.body.title;
        let description = request.body.description;
        let priority = request.body.priority;

        db.query("UPDATE tasks SET title = ?, description = ?, priority = ? WHERE idtask = ?", [title, description, priority, taskId]);
        response.status(200).json({ status: "ok", message: "Task modified" });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Internal error" });
    }
});

module.exports = router;