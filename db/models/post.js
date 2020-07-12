'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.PostType, { foreignKey: 'postTypeId' })
    Post.belongsTo(models.User, { foreignKey: 'userId' })
    Post.hasMany(models.Comment, { foreignKey: 'postId' })
    Post.hasMany(models.Like, { foreignKey: 'postId' })
    Post.hasMany(models.Photo, { foreignKey: 'postId' })
    Post.hasMany(models.Quote, { foreignKey: 'postId' })
    Post.belongsToMany(models.Text, {
      through: 'PostTypes',
      foreignKey: 'postTypeId'
    });
    Post.hasMany(models.Text, { foreignKey: 'postId' })
  };
  return Post;
};
