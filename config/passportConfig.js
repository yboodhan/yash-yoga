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
    let name = profile.displayName ? profile.displayName.split(' ') : profile.username
    let githubEmail = profile.emails ? profile.emails[0].value : null
    db.user.findOrCreate({
        where: {
            email: githubEmail,
            githubId: profile.id
        },
        defaults: {
            githubToken: accessToken,
            githubId: profile.id,
            firstname: name[0] || profile.username,
            lastname: name[name.length-1] || '',
            email: githubEmail,
            username: profile.username,
            photoUrl: profile._json.avatar_url,
            bio: profile._json.bio || 'This is a new account, created through Github. No bio yet.'
        }
    })
    .then(([user, wasCreated]) => {
        //find out if user was already github user and if so, need new token
        if (!wasCreated && user.githubId) {
            user.update({
                githubToken: accessToken
            })
            .then( updatedUser => {
                cb(null, updatedUser)
            })
            .catch(cb)
        } else {
            return cb(null, user)
        }
    })
    .catch(cb)
}))

//Implement Facebook strategy
passport.use(new FacebookStategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, cb) => {
    console.log('Facebook Login', profile)
    //Grab the facebook primary email
    let facebookEmail = profile.emails ? profile.emails[0].value : null
    let displayName = profile.displayName.split(' ')
    let photo = profile.photos.length ? profile.photos[0].value : 'https://res.cloudinary.com/briezh/image/upload/v1555956782/tg57atqguantflp2q2e5.jpg'

    //Look for the email in the local database -- DO NOT DUPLICATE
    db.user.findOrCreate({
        where: { 
            email: facebookEmail,
            facebookId: profile.id
        },
        defaults: {
            facebookToken: accessToken,
            facebookId: profile.id,
            firstname: displayName[0],
            lastname: displayName[displayName.length-1],
            email: facebookEmail,
            username: profile.username || profile.displayName,
            photoUrl: photo,
            bio: 'This is a new account, created through facebook. No bio yet.'
        }
    })
    .then(([user, wasCreated]) => {
        //Did we create a new user?
        if (wasCreated || user.facebookId) {
            //New user, not found in local database
            cb(null, user)
        } else {
            //We found an existing user
            user.update({
                facebookId: profile.id,
                facebookToken: accessToken
            })
            .then(updatedUser => {
                cb(null, updatedUser)
            })
            .catch(cb)
        }
    })
    .catch(cb)
}))

//Make sure you can include this file in other files
module.exports = passport