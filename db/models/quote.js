'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: DataTypes.STRING
  }, {});
  Quote.associate = function (models) {
    // associations can be defined here
    Quote.belongsTo(models.Post, { foreignKey: 'postId' })
  };
  return Quote;
};
