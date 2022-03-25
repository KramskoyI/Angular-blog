require('dotenv').config()

const express = require('express');
const api = require('./routes');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express();

const port = process.env.PORT || 3000;
app.use(cors({
  credentials: true,
}))
let allowedOrigins = ['http://localhost:3000',
                      'http://localhost:4200'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.withCredentials = true;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api', api);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});