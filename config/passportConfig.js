//Require passport and any passport strategies you wish to use
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy //this is a class, not camelcase

//Reference the models folder to access the db
let db = require('../models')

//Serialization and deserialization functions
//These are for passport to use to store /lookup the user info

//Serialize: reduce the user to just uniqueID
passport.serializeUser((user, cb) => {
    //cb or callback function params: error message (null if no error) and user data (only the id)
    cb(null, user.id)
})

//Deserialize: takes a user id and looks up the best of the info
passport.deserializeUser((id, cb) => {
    db.user.findByPk(id)
    .then( user => {
        //callback(error message, user data)
        cb(null, user)
    })
    .catch(cb)
})

//Implement the local strategy (local database)
//Given email, find user, get me info or error
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    //Try looking up user by email
    db.user.findOne({
        where: { email: email }
    })
    .then( foundUser => {
        //Check if I found user; then check their password
        if (!foundUser || !foundUser.validPassword(password)) {
            //uh-oh, bad user or maybe bad password
            cb(null, null)
        } else {
            //valid user and a valid password
            cb(null, foundUser)
        }
    })
    .catch(cb)
}))

//Make sure you can include this file in other files
module.exports = passport