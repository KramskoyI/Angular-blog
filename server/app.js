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
// app.use(cors({
  
//   origin: 
//   function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       res.header('Access-Control-Allow-Origin', '*');
//       const msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));




// app.withCredentials = true;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api', api);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});