'use strict';
module.exports = (sequelize, DataTypes) => {
  const routine = sequelize.define('routine', {
    name: DataTypes.TEXT,
    music: DataTypes.TEXT,
    private: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  routine.associate = function(models) {
    // associations can be defined here
  };
  return routine;
};