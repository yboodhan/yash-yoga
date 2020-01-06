'use strict';

let bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   return queryInterface.bulkInsert('users', [{
    firstname: 'John',
    lastname: 'Doe',
    email: 'demo@demo.com',
    username: 'JohnDoe',
    password: bcrypt.hashSync('JohnDoe12', 12),
    photoUrl: 'http://placekitten.com/250/250',
    bio: 'My name is John Doe and I am really good at yoga. I want to digitalize and share all my routines.',
    admin: false,
    facebookId: null,
    facebookToken: null,
    githubId: null,
    githubToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'demo1@demo.com',
    username: 'JaneDoe',
    password: bcrypt.hashSync('JaneDoe12', 12),
    photoUrl: 'http://placekitten.com/200/200',
    bio: 'My name is Jane Doe and I am new to yoga. I want to learn from all the yogis out there!',
    admin: false,
    facebookId: null,
    facebookToken: null,
    githubId: null,
    githubToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    firstname: 'Joseph',
    lastname: 'Doe',
    email: 'demo2@demo.com',
    username: 'JosephDoe',
    password: bcrypt.hashSync('JosephDoe12', 12),
    photoUrl: 'http://placekitten.com/300/300',
    bio: 'My name is Joseph Doe and I am a programmer. I want to improve my health and posture by practicing yoga!',
    admin: false,
    facebookId: null,
    facebookToken: null,
    githubId: null,
    githubToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstname: 'Jotaro',
    lastname: 'Doe',
    email: 'demo3@demo.com',
    username: 'JotaroDoe',
    password: bcrypt.hashSync('JotaroDoe12', 12),
    photoUrl: 'http://placekitten.com/400/400',
    bio: 'My name is Jotaro Doe and I am yoga instructor. I want to use this as a tool to help my students learn at their own pace.',
    admin: false,
    facebookId: null,
    facebookToken: null,
    githubId: null,
    githubToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstname: 'Josuke',
    lastname: 'Doe',
    email: 'demo4@demo.com',
    username: 'JosokeDoe',
    password: bcrypt.hashSync('JosukeDoe12', 12),
    photoUrl: 'http://placekitten.com/500/500',
    bio: 'My name is Josuke Doe and I want to create yoga routines for me and my pets.',
    admin: false,
    facebookId: null,
    facebookToken: null,
    githubId: null,
    githubToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
