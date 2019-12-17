// Create an express router object
let router = require('express').Router()

//Include a reference for models folder
let db = require('../models')

// Define routes
router.get('/login', (req,res) => {
    res.render('auth/login')
})

router.post('/login', (req,res) => {
    res.send(req.body)
})

router.get('/signup', (req,res) => {
    res.render('auth/signup', { data: {} })
})

router.post('/signup', (req,res) => {
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
                res.send('sucess Create user - go look at db')
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
    res.send('GET /auth/logout')
})

// Export the router object so we can include it in the other files
module.exports = router