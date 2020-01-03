// Create an express router object
let router = require('express').Router()

//Include a reference for models folder
let db = require('../models')

//Reference to the passport module
let passport = require('../config/passportConfig')

// Define routes
router.get('/login', (req,res) => {
    res.render('auth/login')
})

//authenticate user
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    successFlash: 'Yay, we logged in!',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid Credentials 😭'
}))

router.get('/signup', (req,res) => {
    res.render('auth/signup', { data: {} })
})

router.post('/signup', (req,res, next) => {
    //check whether password was correct
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
                //this is the intended user action
                //now automatically log in the user to their new account
                //TODO: login the user
                passport.authenticate('local', {
                    successRedirect: '/profile',
                    successFlash: 'Yay, successful account creation!',
                    failureRedirect: '/auth/login',
                    failureFlash: 'This should never happen ?? 😭'
                })(req, res, next)
            } else {
                //the user already has an account (probably forgot)
                req.flash('error', 'Account already exists for this email. Log in!')
                //redirect to login page
                res.redirect('/auth/login')
            }
        })
        .catch( err => {
            //print out a general error to the terminal
            console.log('Error when creating a user', err)

            //check for validation errors ( okay for user to see )
            if (err.errors) {
                err.errors.forEach( e => {
                    if (e.type === 'Validation error') {
                        req.flash('error', e.message)
                    }
                })
            } else {
                //general error for another issue
                req.flash('error', 'Something went wrong, try again.')
            }

            res.redirect('/auth/signup')
        })
    }
})

router.get('/logout', (req,res) => {
    req.logout() //throws away the session data of the loggin in user
    req.flash('success', 'Goodbye -- see you next time! ✌🏽')
    res.redirect('/')
})

//GITHUB LOGIN ROUTES
//This the route that our app uses
router.get('/github', passport.authenticate('github'))

//This is the route that github uses
router.get('/callback/github', passport.authenticate('github', {
    successRedirect: '/profile',
    successFlash: 'Github login success',
    failureRedirect: '/auth/login',
    failureFlash: 'Github does not like it'
}))

//FACEBOOK LOGIN ROUTES
//The route our app calls
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'user_birthday']
}))

//The route facebook calls back to
router.get('/callback/facebook', passport.authenticate('facebook', {
    successRedirect: '/profile',
    successFlash: 'Facebook login success',
    failureRedirect: '/auth/login',
    failureFlash: 'Facebook does not like it'
}))

// Export the router object so we can include it in the other files
module.exports = router