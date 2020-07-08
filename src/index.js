const express = require('express')
const engine = require('ejs-mate')
const path = require('path')
const cors = require('cors')

// inicializations
const app = express();
//app.use(cors()) // Simple Usage (Enable All CORS Requests)


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


var whitelist = ['http://localhost', 'http://leafletnodejs.herokuapp.com/', 'https://leafletnodejs.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 
app.get('/', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

app.listen(PORT, () => {
    console.log("Server on port " + PORT);
});
