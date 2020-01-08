'use strict';
module.exports = (sequelize, DataTypes) => {
  const pose = sequelize.define('pose', {
    sanskrit_name: DataTypes.TEXT,
    english_name: DataTypes.TEXT,
    img_url: DataTypes.STRING
  }, {});
  pose.associate = function(models) {
    // associations can be defined here
    models.pose.belongsToMany(models.routine, {
      through: 'routines_poses'
    })
  };
  return pose;
};