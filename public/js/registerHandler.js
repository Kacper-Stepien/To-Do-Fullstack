const createForm = document.getElementById("create-account-form");
const namee = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
const surname = document.querySelector('#surname');
const surnameError = document.querySelector('.surname-error');
const login1 = document.querySelector('#login-1');
const login1Error = document.querySelector('.login-1-error');
const password1 = document.querySelector('#password-1');
const password1Error = document.querySelector('.password-1-error');
const password2 = document.querySelector('#password-2');
const password2Error = document.querySelector('.password-2-error');

const loginRegex = /[A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź0-9]{5,20}/;
const nameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const surnameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const passwordRegex = /.{8,}/;


// Functions for validation 
function checkInput(inputObject, regex) {
    if (!regex.test(inputObject.value)) {
        return false;
    }
    else {
        return true;
    }
}

function checkIfUsernameIsAvaliable(login) {
    if (localStorage.getItem(login) === null) {
        return true;
    }
    else {
        return false;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    [].slice.call(errors).forEach(function (error) {
        error.innerHTML = "";
    });
}

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let sendForm = true;

    // Check name:
    if (!checkInput(namee, nameRegex)) {
        sendForm = false;
        nameError.innerHTML = "Wpisz poprawne imię, jeśli masz dwa imiona odziel je spacją";
    }
    else nameError.innerHTML = "";

    // Check surname:
    if (!checkInput(surname, surnameRegex)) {
        sendForm = false;
        surnameError.innerHTML = "Wpisz poprawne nazwisko, jeśli jest dwuczłonowe odziel je myślnikiem";
    }
    else surnameError.innerHTML = "";

    // Check login
    if (!checkInput(login1, loginRegex)) {
        sendForm = false;
        login1Error.innerHTML = "Wpisz poprawny login, zawiera litery i cyfry, 5-20 znaków";
    }
    else if (localStorage.getItem(login1.value) !== null) {
        sendForm = false;
        login1Error.innerHTML = "Użytkownik o podanym loginie już istnieje";
    }
    else {
        login1Error.innerHTML = "";
    }

    // Check password 
    if (password1.value.length == 0) {
        sendForm = false;
        password1Error.innerHTML = "Wpisz hasło, minimum 8 znaków";
    }
    else if (!checkInput(password1, passwordRegex)) {
        sendForm = false;
        password1Error.innerHTML = "Wpisz poprawne hasło, minimum 8 znaków";
    }
    else {
        password1Error.innerHTML = "";
    }

    // Check confirmation of password 
    if (password2.value.length == 0) {
        sendForm = false;
        password2Error.innerHTML = "Wpisz ponownie hasło";
    }
    else if (password2.value !== password1.value) {
        sendForm = false;
        password2Error.innerHTML = "Hasła nie są zgodne";
    }
    else {
        password2Error.innerHTML = "";
    }

    if (!sendForm) {
        console.log("zle");
    }
    else {
        let user = {
            login: login1.value,
            password: password1.value,
            name: namee.value,
            surname: surname.value,
        };
        var data = new FormData(createForm);
        console.log("dobre");

        const response = await fetch("http://localhost:8000/create-user", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response);
    }
});