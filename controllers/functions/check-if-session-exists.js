const session = require('express-session');

const sessionExists = (request, response) => {
    let sessionId = request.cookies.sessionId;
    if (!sessionId || sessionId != request.session.id || !request.session.user) {
        return false;
    }
    return true;
}

module.exports = sessionExists;