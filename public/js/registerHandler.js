const createForm = document.getElementById("create-account-form");
const namee = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
const surname = document.querySelector('#surname');
const surnameError = document.querySelector('.surname-error');
const login1 = document.querySelector('#login-1');
const login1Error = document.querySelector('.login-1-error');
const email = document.querySelector('#email');
const emailError = document.querySelector('.email-error');
const password1 = document.querySelector('#password-1');
const password1Error = document.querySelector('.password-1-error');
const password2 = document.querySelector('#password-2');
const password2Error = document.querySelector('.password-2-error');
const modal = document.getElementById("register-modal");
const modalTitle = document.getElementById("register-modal-title");
const modalText = document.getElementById("register-modal-text");
const closeModalBtn = document.querySelector('.close-modal');
const overflow = document.querySelector('.overflow');

const loginRegex = /[A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź0-9]{5,20}/;
const nameRegex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
const surnameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,20}(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,20})?$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const passwordRegex = /.{8,}/;


const openModal = (modal, title, text, overflow) => {
    modalTitle.innerHTML = title;
    modalText.innerHTML = text;
    modal.classList.remove('hidden');
    overflow.classList.remove('hidden');
    document.body.style.overflow = "hidden";

    closeModalBtn.addEventListener('click', () => {
        modalTitle.innerHTML = "";
        modalText.innerHTML = "";
        modal.classList.add('hidden');
        overflow.classList.add('hidden');
        document.body.style.overflow = "auto";

        if (title == "Sukces") {
            clearErrors();
            createForm.reset();
            window.location.href = "http://localhost:8000/login";
        }
    });

    overflow.addEventListener('click', () => {
        modalTitle.innerHTML = "";
        modalText.innerHTML = "";
        modal.classList.add('hidden');
        overflow.classList.add('hidden');
        document.body.style.overflow = "auto";

        if (title == "Sukces") {
            clearErrors();
            createForm.reset();
            window.location.href = "http://localhost:8000/login";
        }
    });
}

// Functions for validation 
function checkInput(inputObject, regex) {
    if (!regex.test(inputObject.value)) {
        return false;
    }
    else {
        return true;
    }
}


function clearErrors() {
    const errors = document.querySelectorAll('.error');
    [].slice.call(errors).forEach(function (error) {
        error.innerHTML = "";
    });
}

function validateRegisterForm() {
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
        surnameError.innerHTML = "Wpisz poprawne nazwisko, jeśli nazwisko jest dwuczłonowe odziel je myślnikiem";
    }
    else surnameError.innerHTML = "";

    // Check login
    if (!checkInput(login1, loginRegex)) {
        sendForm = false;
        login1Error.innerHTML = "Wpisz poprawny login, zawiera litery i cyfry, 5-20 znaków";
    }
    else {
        login1Error.innerHTML = "";
    }

    // Check email
    if (!checkInput(email, emailRegex)) {
        sendForm = false;
        emailError.innerHTML = "Wpisz poprawny email";
    }
    else {
        emailError.innerHTML = "";
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

    return sendForm;
}


createForm.addEventListener('submit', async (e) => {

    e.preventDefault();
    let sendForm = validateRegisterForm();

    if (sendForm) {
        let user = {
            login: login1.value,
            password: password1.value,
            email: email.value,
            name: namee.value,
            surname: surname.value,
        };

        const response = await fetch("http://localhost:8000/create-user", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response);
        const data = await response.json();
        console.log(data);
        if (data.message == "Login is not available") {
            login1Error.innerHTML = "Login zajęty";
        }
        else if (data.message == "Email is already taken") {
            emailError.innerHTML = "Istnieje już konto z takim emailem";
        }
        else if (data.message == "Internal server error") {
            openModal(modal, "Błąd", "Wystąpił wewnętrzny błąd po stronie serwera, spróbuj ponownie", overflow);
        }
        else if (data.message == "Wrong data") {
            openModal(modal, "Błąd", "Dane przesłane na serwer są niepoprawne", overflow);
        }
        if (data.status == "ok") {
            openModal(modal, "Sukces", "Konto zostało utworzone, możesz się zalogować", overflow);
        }

    }
});

