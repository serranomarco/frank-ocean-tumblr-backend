'use strict';
module.exports = (sequelize, DataTypes) => {
  const Text = sequelize.define('Text', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: DataTypes.STRING,
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Text.associate = function (models) {
    // associations can be defined here
    Text.belongsTo(models.Post, { foreignKey: 'postId' })
  };
  return Text;
};
