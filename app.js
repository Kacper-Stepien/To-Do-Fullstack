const express = require('express');
require('dotenv').config(); // Dzięki temu możemy używać zmiennych środowiskowych z pliku .env
const path = require('path');   // Dzięki temu możemy używać ścieżek do plików
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Routers
const registerRouter = require('./routes/register-router');
const loginRouter = require('./routes/login-router');
const appRouter = require('./routes/app-router');
const loggedInRouter = require('./routes/user-logged-in-router');
const logoutRouter = require('./routes/logout-router');
const userInfoRouter = require('./routes/user-info-router');
const addTaskRouter = require('./routes/add-task-router');

const app = express();
const port = process.env.PORT;
app.use(express.static('public'));  // Dzięki temu możemy używać plików statycznych z folderu public
app.use("/js", express.static(__dirname + "/public/js"));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/routes', express.static(__dirname + '/routes'));

app.use(cookieParser());

// Konfiguracja body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/app', (req, res) => {
    res.sendFile(__dirname + '/views/app.html');
});

app.get('/author', (req, res) => {
    res.sendFile(__dirname + '/public/author.html');
})

// app.use("/app", appRouter);

app.use("/create-user", registerRouter);

app.use("/login-user", loginRouter);

app.use('/user-logged-in', loggedInRouter);

app.use('/logout', logoutRouter);

app.use('/user-info', userInfoRouter);

app.use('/add-task', addTaskRouter);


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
