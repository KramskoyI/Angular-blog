'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.Post, { foreignKey: 'id', as: 'Post' });
      Like.belongsTo(models.User, { foreignKey: 'id', as: 'User' });
    }
  }
  Like.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};