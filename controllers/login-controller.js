const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const logInUser = (request, response, userObject, userLogin, userPassword) => {
    if (bcrypt.compareSync(userPassword, userObject.password)) {
        request.session.user = { login: userLogin };    // save user in session
        response.cookie('sessionId', request.session.id, { maxAge: 3600000 });  // max age in miliseconds - 1 hour
        response.status(200).json({ status: "ok", message: "Logged in" });
        console.log(`New session created: ${request.session.id} for user: ${userLogin}`);
    }
    else {
        response.status(401).json({ status: "error", message: "Wrong password" });
    }
};

module.exports = logInUser;