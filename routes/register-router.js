const express = require('express');
// const db = require('/routes/db-config.js');
const router = express.Router();

function createAccount() {
    let user = {
        login: login1.value,
        password: password1.value,
        name: namee.value,
        surname: surname.value,
    };

    let json = JSON.stringify(user);
    // add to database
    // clearErrors();
    // window.alert("Konto zostało utworzone. Możesz się już zalogować");
    // createForm.reset();
}


router.post("/", (request, response) => {
    // Pobranie danych z formularza
    var name = request.body.name;
    var email = request.body.email;
    console.log("Przyszło");
    console.log(request.body);

    response.status(200).send("Form submitted successfully");
});

module.exports = router;