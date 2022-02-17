'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User'})
    }
  }
  Token.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    refreshToken : {
      type: DataTypes.STRING,
      allowNull: false 
    }
    
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};