require('dotenv').config()

const express = require('express');
const api = require('./routes');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(
  {credentials: true}
));
// let allowedOrigins = ['http://localhost:4200',
//                       'http://localhost:3000',
//                     '*'];
app.use( bodyParser({limit: '50mb'}) );
app.use(function(req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', api, function (request, response) {
  response.send('Hello Test');
});

app.listen(port, () => {
  console.log(`Server is running`);
});

module.exports.app = app;