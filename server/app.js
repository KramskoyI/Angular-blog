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

app.withCredentials = true;
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api', api);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});