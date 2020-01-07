'use strict';
module.exports = (sequelize, DataTypes) => {
  const routines_poses = sequelize.define('routines_poses', {
    routineId: DataTypes.INTEGER,
    poseId: DataTypes.INTEGER
  }, {});
  routines_poses.associate = function(models) {
    // associations can be defined here
  };
  return routines_poses;
};