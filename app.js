const express = require('express');
require('dotenv').config();                        // We can use environment variables from .env file
const path = require('path');                      // We can use path to files
const bodyParser = require("body-parser");         // We can use body-parser to parse data from forms
const cookieParser = require("cookie-parser");     // We can use cookie-parser to parse cookies

// Routers - we can use them to handle requests
const registerRouter = require('./routes/register-router');
const loginRouter = require('./routes/login-router');
const appRouter = require('./routes/app-router');
const loggedInRouter = require('./routes/user-logged-in-router');
const logoutRouter = require('./routes/logout-router');
const userInfoRouter = require('./routes/user-info-router');
const addTaskRouter = require('./routes/add-task-router');
const checkTaskAsDoneRouter = require('./routes/check-task-as-done-router');
const deleteTaskRouter = require('./routes/delete-task-router');
const modifyTaskRouter = require('./routes/edit-task-router');

const app = express();
const port = process.env.PORT;
app.use(express.static('public'));  // Dzięki temu możemy używać plików statycznych z folderu public
app.use("/js", express.static(__dirname + "/public/js"));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
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

app.use('/check-task-as-done', checkTaskAsDoneRouter);

app.use('/delete-task', deleteTaskRouter);

app.use('/modify-task', modifyTaskRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
