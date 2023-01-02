const userName = document.getElementById('user-name');
const userSurname = document.getElementById('user-surname');
const userNameError = document.querySelector('.name-error');
const userSurnameError = document.querySelector('.surname-error');
const checkboxesError = document.querySelector('.checkboxes-error');
const submitBtn = document.querySelector('.send-opinion');
const form = document.querySelector('.send-email');


submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let send = true;
    if (userName.value === '') {
        userNameError.innerHTML = 'Podaj imię';
        send = false;
    }
    else {
        userNameError.innerHTML = '';
    }
    if (userSurname.value === '') {
        userSurnameError.innerHTML = 'Podaj nazwisko';
        send = false;
    }
    else {
        userSurnameError.innerHTML = '';
    }
    // sprawdź czy przynajmniej jedno pole jest zaznaczone
    const checkboxes = document.querySelectorAll('.checkbox');
    console.log(checkboxes[0]);
    let checked = false;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked = true;
            break;
        }
    }
    if (!checked) {
        checkboxesError.innerHTML = 'Wybierz przynajmniej jedną opcję';
        send = false;
    }
    else {
        checkboxesError.innerHTML = '';
    }

    if (send) {
        form.submit();
    }
});