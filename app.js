const express = require('express');                // We can use express to create a server
const session = require('express-session');        // We can use sessions to store data about users
require('dotenv').config();                        // We can use environment variables from .env file
const path = require('path');                      // We can use path to files
const bodyParser = require("body-parser");         // We can use body-parser to parse data from forms
const cookieParser = require("cookie-parser");     // We can use cookie-parser to parse cookies

// Routers - we can use them to handle requests
const registerRouter = require('./routes/register-router');
const loginRouter = require('./routes/login-router');
const loggedInRouter = require('./routes/user-logged-in-router');
const logoutRouter = require('./routes/logout-router');
const userInfoRouter = require('./routes/user-info-router');
const addTaskRouter = require('./routes/add-task-router');
const checkTaskAsDoneRouter = require('./routes/check-task-as-done-router');
const deleteTaskRouter = require('./routes/delete-task-router');
const modifyTaskRouter = require('./routes/edit-task-router');
const deleteAllTasksRouter = require('./routes/delete-all-tasks-router');

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));               // We can use express.static to serve static files     
app.use("/js", express.static(__dirname + "/public/js"));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/routes', express.static(__dirname + '/routes'));
app.use('/controllers', express.static(__dirname + '/controllers'));

app.use(cookieParser());                    // We can use cookie-parser to parse cookies

app.use(session({
    secret: 'Kod#$Li234.?a293/12$', // secret key to hash the session cookie
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 // 1 hour in milliseconds
    }
}));


// Configuration body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());     // We can use body-parser to parse data from forms


// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');  // We can use res.sendFile to send a file
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


app.use("/create-user", registerRouter);

app.use("/login-user", loginRouter);

app.use('/user-logged-in', loggedInRouter);

app.use('/logout', logoutRouter);

app.use('/user-info', userInfoRouter);

app.use('/add-task', addTaskRouter);

app.use('/check-task-as-done', checkTaskAsDoneRouter);

app.use('/delete-task', deleteTaskRouter);

app.use('/modify-task', modifyTaskRouter);

app.use('/delete-all-tasks', deleteAllTasksRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
