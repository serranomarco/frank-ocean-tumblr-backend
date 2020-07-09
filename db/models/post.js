'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    Post.hasMany(models.Comment, { foreignKey: 'postId' })
    Post.hasMany(models.Like, { foreignKey: 'postId' })
    Post.hasMany(models.Photo, { foreignKey: 'postId' })
    Post.hasMany(models.Quote, { foreignKey: 'postId' })
    Post.hasMany(models.Text, { foreignKey: 'postId' })
  };
  return Post;
};
