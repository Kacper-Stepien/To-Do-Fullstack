const express = require('express');
const router = express.Router();
const { validateData, createAccount } = require('../controllers/register-controller');


router.post("/", (request, response) => {
    let status = validateData(request.body);

    if (status == 'databaseError') {
        console.log("database error");
        response.status(500).json({ status: "error", message: "Internal server error" });
    }
    else if (status == 'wrongLogin') {
        response.status(409).json({ status: "error", message: "Login is not available" });
    }
    else if (status == 'wrongEmail') {
        response.status(409).json({ status: "error", message: "Email is already taken" });
    }
    else if (status == false) {
        response.status(400).json({ status: "error", message: "Wrong data" });
    }
    else {
        const result = createAccount(request.body);
        if (result === 'databaseError') {
            response.status(500).send({ status: "error", message: "Internal server error" });
        }
        console.log("Account created");
        response.status(200).json({ status: "ok", message: "Added to database" });
    }
});

module.exports = router;