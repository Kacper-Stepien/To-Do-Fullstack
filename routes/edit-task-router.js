const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

router.post("/", (request, response) => {
    try {
        let taskId = escapeHtml(request.body.idtask);
        let title = escapeHtml(request.body.title);
        let description = escapeHtml(request.body.description);
        let priority = escapeHtml(request.body.priority);
        let modifyDate = request.body.modifyDate;

        db.query("UPDATE tasks SET title = ?, description = ?, priority = ?, last_modify_date = ? WHERE idtask = ?", [title, description, priority, modifyDate, taskId]);
        response.status(200).json({ status: "ok", message: "Task modified" });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Internal error" });
    }
});

module.exports = router;