const loginForm = document.getElementById("login-form");
const login = document.querySelector('#login');
const loginError = document.querySelector('.login-error');
const password = document.querySelector('#password');
const passwordError = document.querySelector('.password-error');
const modal = document.getElementById("register-modal");
const modalTitle = document.getElementById("register-modal-title");
const modalText = document.getElementById("register-modal-text");
const closeModalBtn = document.querySelector('.close-modal');
const overflow = document.querySelector('.overflow');

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
    });

    overflow.addEventListener('click', () => {
        modalTitle.innerHTML = "";
        modalText.innerHTML = "";
        modal.classList.add('hidden');
        overflow.classList.add('hidden');
        document.body.style.overflow = "auto";
    });
};

function checkInput(inputObject, regex) {
    if (!regex.test(inputObject.value))
        return false;
    else
        return true;
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    [].slice.call(errors).forEach(function (error) {
        error.innerHTML = "";
    });
}

loginForm.addEventListener('submit', async (e) => {
    clearErrors();
    e.preventDefault();
    let user = {
        login: login.value,
        password: password.value
    }
    const response = await fetch("http://localhost:8000/login-user", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);

    const data = await response.json();
    console.log(data);

    if (data.message == "Database error") {
        openModal(modal, "Błąd", "Wystąpił wewnętrzny błąd po stronie serwera, spróbuj ponownie", overflow);
    }
    else if (data.message == "Wrong login") {
        loginError.innerHTML = "Użytkownik o podanym loginie nie istnieje";
    }
    else if (data.message == "Wrong password") {
        passwordError.innerHTML = "Hasło dla podanego loginu jest niepoprawne";
    }
    else if (data.message == "Logged in") {
        loginForm.reset();
        window.location.href = "http://localhost:8000/app";
    }
});


// Checikng if user is logged in - if yes, redirect to app
const checkIfUserIsLoggedIn = async () => {
    const response = await fetch("http://localhost:8000/user-logged-in", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.status === "ok")
        window.location.href = "http://localhost:8000/app";
}

checkIfUserIsLoggedIn();