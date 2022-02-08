const express = require('express');
const Sequelize = require("sequelize");
const app = express();
const urlencodedParser = express.urlencoded({extended: false});

const auth = require('./routes/auth')

// DB
const sequelize = new Sequelize('blog', 'student', 'student', {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432'
});

//Server+Sequelize
sequelize.sync().then(()=>{
  app.listen(3000, function(){
    console.log('Сервер ожидает подключения...');
  });
}).catch(err=>console.log(err));

//Model Posts
const Posts = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Model Users
const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
Users.hasMany(Posts);

// Tables created
sequelize.sync({force:true}).then(()=>{
  console.log("Tables have been created");
}).catch(err=>console.log(err));



//Routers
app.use('/sign-up', urlencodedParser, auth);
app.use('/sign-in', urlencodedParser, auth);