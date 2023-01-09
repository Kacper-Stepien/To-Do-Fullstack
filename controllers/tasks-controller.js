const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const escapeHtml = require("./functions/escape-html");
const sessionExists = require('./functions/check-if-session-exists');
const taskBelongsToUser = require('./functions/check-if-task-belongs-to-user');

exports.addTask = (request, response) => {
    // let login = request.cookies.user;
    if (!sessionExists(request, response)) {
        response.status(401).json({ status: "error", message: "Unauthorized" });
    }
    else {
        try {
            let login = request.session.user.login;
            let user_id = db.query("SELECT iduser FROM users WHERE login = ?", [login]);
            user_id = user_id[0].iduser;
            let title = escapeHtml(request.body.title);
            let description = escapeHtml(request.body.description);
            let priority = escapeHtml(request.body.priority);
            let finished = escapeHtml(request.body.finished);
            let date_added = request.body.date_added;

            let sql = `INSERT INTO tasks(title, description, priority, finished, user_id, added_date) VALUES(?, ?, ?, ?, ?, ?)`;
            db.query(sql, [title, description, priority, finished, user_id, date_added]);

            console.log("Task added");
            response.status(200).json({ status: "ok", message: "Task added" });
        }
        catch (error) {
            response.status(500).json({ status: "error", message: error.message });
        }
    }
};

exports.editTask = (request, response) => {
    let ok = true;
    if (!sessionExists(request, response)) {
        response.status(401).json({ status: "error", message: "Unauthorized" });
        ok = false;
    }
    if (ok) {
        if (!taskBelongsToUser(request, response)) {
            response.status(401).json({ status: "error", message: "Unauthorized" });
            ok = false;
        }
    }
    if (ok) {
        try {
            let taskId = escapeHtml(request.body.idtask);
            console.log(`taskId: ${taskId}`);
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
    }
};

exports.checkTaskAsDone = (request, response) => {
    let ok = true;
    if (!sessionExists(request, response)) {
        response.status(401).json({ status: "error", message: "Unauthorized" });
        ok = false;
    }
    if (ok) {
        if (!taskBelongsToUser(request, response)) {
            response.status(401).json({ status: "error", message: "Unauthorized" });
            ok = false;
        }
    }
    if (ok) {
        try {
            let taskId = request.body.idtask;
            let modifyDate = request.body.modifyDate;
            db.query("UPDATE tasks SET finished = 1, last_modify_date = ? WHERE idtask = ?", [modifyDate, taskId]);
            response.status(200).json({ status: "ok", message: "Task updated" });
        }
        catch (error) {
            response.status(500).json({ status: "error", message: "Database error" });
        }
    }
};

exports.deleteTask = (request, response) => {
    let ok = true;
    if (!sessionExists(request, response)) {
        response.status(401).json({ status: "error", message: "Unauthorized" });
        ok = false;
    }
    //Check if task belongs to user
    if (ok) {
        if (!taskBelongsToUser(request, response)) {
            response.status(401).json({ status: "error", message: "Unauthorized" });
            ok = false;
        }
    }
    if (ok) {
        let taskId = request.body.idtask;
        try {
            db.query("DELETE FROM tasks WHERE idtask = ?", [taskId]);
            response.status(200).json({ status: "ok", message: "Task deleted" });
        }
        catch (error) {
            response.status(500).json({ status: "error", message: "Internal Error" });
        }
    }
};

exports.deleteAllTasks = (request, response) => {
    if (!sessionExists(request, response)) {
        response.status(401).json({ status: "error", message: "Unauthorized" });
    }
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
};