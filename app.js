const express = require('express');
require('dotenv').config(); // Dzięki temu możemy używać zmiennych środowiskowych z pliku .env
const path = require('path');   // Dzięki temu możemy używać ścieżek do plików

const app = express();
const port = process.env.PORT;
app.use(express.static('public'));  // Dzięki temu możemy używać plików statycznych z folderu public
app.use("/js", express.static(__dirname + "/public/js"));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/views', express.static(__dirname + '/views'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});