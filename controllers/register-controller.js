const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');
const checkInput = require('../controllers/functions/check-input');
const escapeHtml = require('../controllers/functions/escape-HTML');

const loginRegex = /[A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź0-9]{5,20}/;
const nameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const surnameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const passwordRegex = /.{8,}/;


const validateData = (data) => {
    let login = escapeHtml(data.login);
    let name = escapeHtml(data.name);
    let surname = escapeHtml(data.surname)
    let email = escapeHtml(data.email);
    let password = escapeHtml(data.password);

    // Check name
    if (!checkInput(name, nameRegex)) {
        return false;
    }

    // Check surname
    if (!checkInput(surname, surnameRegex)) {
        return false;
    }

    // Check login
    if (!checkInput(login, loginRegex)) {
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

module.exports = { validateData, createAccount }