const session = require('express-session');
const db = require('../../routes/db-config');


function taskBelongsToUser(request, response) {
    try {
        let id = db.query("SELECT iduser FROM users WHERE login = ?", [request.session.user.login]);
        let idForTask = db.query("SELECT user_id FROM tasks WHERE idtask = ?", [request.body.idtask]);
        if (id[0].iduser !== idForTask[0].user_id) {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    return true;
}

module.exports = taskBelongsToUser;