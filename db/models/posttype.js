'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostType = sequelize.define('PostType', {
    postType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {});
  PostType.associate = function (models) {
    // associations can be defined here
    PostType.hasMany(models.Post, { foreignKey: 'postTypeId' })
    PostType.hasMany(models.Text, { foreignKey: 'postTypeId' })
  };
  return PostType;
};
