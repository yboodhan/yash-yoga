let router = require('express').Router()
let db = require('../models')

// Reference to the passport module
let passport = require('../config/passportConfig')

// Log in page
router.get('/login', (req,res) => {
    res.render('auth/login')
})

// Authenticate user
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    successFlash: 'Namaste devotee!',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid Credentials.'
}))

// Show the sign-up form
router.get('/signup', (req,res) => {
    res.render('auth/signup', { data: {} })
})

// Sign-up the user
router.post('/signup', (req,res, next) => {
    // check whether password was correct
    if (req.body.password != req.body.password_verify) {
        // user's password verification doesn't match
        req.flash('error', 'Passwords do not match!')
        res.render('auth/signup', { data:req.body, alerts: req.flash() })
    } else {
        // attempt to find a user by their email. if not found, then create them
        db.user.findOrCreate({
            where: { email : req.body.email },
            defaults: req.body
        })
        .then(([user, wasCreated]) => {
            if (wasCreated) {
                // this is the intended user action
                // now automatically log in the user to their new account
                passport.authenticate('local', {
                    successRedirect: '/profile',
                    successFlash: 'Your account was successfully created.',
                    failureRedirect: '/auth/login',
                    failureFlash: 'There is an error in authentication. Try again.'
                })(req, res, next)
            } else {
                // the user already has an account (probably forgot)
                req.flash('error', 'Account already exists for this email. Log in!')
                // redirect to login page
                res.redirect('/auth/login')
            }
        })
        .catch( err => {
            // print out a general error to the terminal
            console.log('Error when creating a user', err)

            // check for validation errors ( okay for user to see )
            if (err.errors) {
                err.errors.forEach( e => {
                    if (e.type === 'Validation error') {
                        req.flash('error', e.message)
                    }
                })
            } else {
                // general error for another issue
                req.flash('error', 'Something went wrong, try again.')
            }

            res.redirect('/auth/signup')
        })
    }
})

// Logout the user
router.get('/logout', (req,res) => {
    req.logout() // throws away the session data of the loggin in user
    req.flash('success', 'You have successfully logged out.')
    res.redirect('/')
})

// GITHUB LOGIN ROUTES
// This the route that our app uses
router.get('/github', passport.authenticate('github'))

// This is the route that github uses
router.get('/callback/github', passport.authenticate('github', {
    successRedirect: '/profile',
    successFlash: 'You have successfully logged in using Github.',
    failureRedirect: '/auth/login',
    failureFlash: 'Github login has failed.'
}))

// FACEBOOK LOGIN ROUTES
// The route our app calls
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}))

// The route facebook calls back to
router.get('/callback/facebook', passport.authenticate('facebook', {
    successRedirect: '/profile',
    successFlash: 'You have successfully logged in using Facebook.',
    failureRedirect: '/auth/login',
    failureFlash: 'Facebook login has failed.'
}))

module.exports = router