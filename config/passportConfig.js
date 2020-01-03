//Read ENV variables
require('dotenv').config()

//Require passport and any passport strategies you wish to use
let passport = require('passport')
let FacebookStategy = require('passport-facebook').Strategy
let GithubStrategy = require('passport-github2').Strategy
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

//Implement Github strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/callback/github'
}, (accessToken, refreshToken, profile, cb) => {
    console.log('Github Login', profile)
    let name = profile.displayName.split(' ')
    db.user.findOrCreate({
        where: { githubId: profile.id },
        defaults: {
            githubToken: accessToken,
            firstname: name[0] || profile.username,
            lastname: name[name.length-1] || '',
            username: profile.username,
            photoUrl: profile._json.avatar_url,
            bio: profile._json.bio || `Github user ${profile.username} works at ${profile._json.company} in ${profile._json.location}`
        }
    })
    .then(([user, wasCreated]) => {
        return cb(null, user)
    })
    .catch(cb)
}))

//Implement Facebook strategy


//Make sure you can include this file in other files
module.exports = passport