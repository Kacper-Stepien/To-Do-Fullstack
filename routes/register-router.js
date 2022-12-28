const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');

const loginRegex = /[A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź0-9]{5,20}/;
const nameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const surnameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const passwordRegex = /.{8,}/;

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function checkInput(inputObject, regex) {
    if (!regex.test(inputObject)) {
        return false;
    }
    else {
        return true;
    }
}

function createAccount(data) {
    let login = data.login;
    let name = data.name;
    let surname = data.surname
    let email = data.email;
    let password = bcrypt.hashSync(data.password, 8);

    try {
        db.query("INSERT INTO users (login, name, surname, email, password) VALUES (?, ?, ?, ?, ?)", [login, name, surname, email, password]);
    }
    catch (error) {
        return 'databaseError';
    }
    return true;
}

const validateData = (data) => {
    let login = escapeHtml(data.login);
    let name = escapeHtml(data.name);
    let surname = escapeHtml(data.surname)
    let email = escapeHtml(data.email);
    let password = escapeHtml(data.password);

    // Check login
    if (!checkInput(login, loginRegex)) {
        console.log(dataValid);
        return false;
    }
    try {
        const results = db.query("SELECT * FROM users WHERE login = ?", [login]);
        if (results.length > 0) {
            return 'wrongLogin';
        }
    }
    catch (error) {
        return 'databaseError';
    }

    // Check name
    if (!checkInput(name, nameRegex)) {
        return false;
    }

    // Check surname
    if (!checkInput(surname, surnameRegex)) {
        return false;
    }

    // Check email
    if (!checkInput(email, emailRegex)) {
        return false;
    }

    try {
        const results = db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (results.length > 0) {
            return 'wrongEmail';
        }
    }
    catch (error) {
        return 'databaseError';
    }

    // Check password
    if (!checkInput(password, passwordRegex)) {
        return false;
    }

    return true;
}


router.post("/", (request, response) => {
    let dataOk = validateData(request.body);

    if (dataOk == 'databaseError') {
        console.log("database error");
        response.status(500).json({ status: "error", message: "Internal server error" });
    }
    else if (dataOk == 'wrongLogin') {
        response.status(401).json({ status: "error", message: "Login is not available" });
    }
    else if (dataOk == 'wrongEmail') {
        response.status(401).json({ status: "error", message: "Email is already taken" });
    }
    else if (dataOk == false) {
        response.status(401).json({ status: "error", message: "Wrong data" });
    }
    else {
        const result = createAccount(request.body);
        if (result === 'databaseError') {
            response.status(500).send({ status: "error", message: "Internal server error" });
        }
        response.status(200).json({ status: "ok", message: "Added to database" });
    }
});

module.exports = router;