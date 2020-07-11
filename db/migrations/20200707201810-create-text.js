'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Texts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Posts' }
      },
      title: {
        type: Sequelize.STRING(100)
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      postTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'PostTypes' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Texts');
  }
};
