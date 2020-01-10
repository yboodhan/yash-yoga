'use strict';
module.exports = (sequelize, DataTypes) => {
  const entry = sequelize.define('entry', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  entry.associate = function(models) {
    // associations can be defined here
    models.routine.belongsTo(models.user)
  };
  return entry;
};