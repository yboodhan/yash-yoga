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
    models.routine.belongsTo(models.user)
    models.routine.hasMany(models.pose)
    models.routine.belongsToMany(models.pose, {
      through: 'routines_poses'
    })
  };
  return routine;
};