'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'autorId', as: 'Users' });
      Post.hasMany(models.Tag, { foreignKey: 'postId', as:'Tag'});
      Post.hasMany(models.Like, { foreignKey: 'postNum', as:'Like'});
    }
  }
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    image: {
      type: DataTypes.STRING
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};