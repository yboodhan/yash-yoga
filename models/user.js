'use strict';

let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: {
          args: [1, 255],
          msg: ' First Name'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: ' Email'
        }
      }
    },
    username: DataTypes.STRING,
    password: { 
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 25], //min and max args
          msg: ' Password (6 - 25 characters)'
        }
      }
    },
    photoUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: ' Photo'
        }
      }
    },
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN,
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING,
    githubId: DataTypes.STRING,
    githubToken: DataTypes.STRING
  }, { //create hooks
    hooks: {
      beforeCreate: pendingUser => {
        if (pendingUser && pendingUser.password) {
          //hash the password
          let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)

          //reassign the password field to the hashed value
          pendingUser.password = hashedPassword
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.routine)
  };

  //need function keyword here to use this, attached to user object
  user.prototype.validPassword = function(typedInPassword) {
    // determine if typed in password hashes to same thing as existing hash
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
    // return the result of that comparison
    return correctPassword
  }

  return user;
};