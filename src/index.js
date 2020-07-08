const express = require('express')
const engine = require('ejs-mate')
const path = require('path')

// inicializations
const app = express();

// setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname+ '/views'));

// routes
app.use(require('./routes/'));

// static files
app.use( express.static(path.join(__dirname+ '/public')) );

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server on port " + PORT);
});
// https://www.youtube.com/watch?v=Zy89Nj7tNNM
// COMANDS:
//npm init --yes
//npm i express ejs-mate socket.io
//node src/index.js
// npm i nodemon -D
// npm run dev