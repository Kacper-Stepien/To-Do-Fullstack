const logo = document.querySelector('.main-nav__logo');
console.log(logo);

logo.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/';
});