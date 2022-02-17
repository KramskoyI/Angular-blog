'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
     this.hasMany(models.Post, { foreignKey: 'autorId', as:'post'});
     this.belongsTo(models.Token, { foreignKey: 'userId', as:'token'});
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};