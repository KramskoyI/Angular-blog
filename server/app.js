const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const urlencodedParser = express.urlencoded({extended: true});
app.use(express.json())
const auth = require('./routes/auth')
const PORT = 3000
// DB
const sequelize = new Sequelize('blog', 'student', 'student', {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432'
});

//Server+Sequelize
sequelize.sync().then(()=>{
  app.listen(PORT, function(){
    console.log(`Сервер на порту ${PORT}`);
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


//Routers
app.use('/sign-up', auth);
app.use('/sign-in', auth);