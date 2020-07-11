'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    caption: DataTypes.TEXT,
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Photo.associate = function (models) {
    // associations can be defined here
    Photo.belongsTo(models.Post, { foreignKey: 'postId' })
  };
  return Photo;
};
