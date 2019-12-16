// Create an express router object
let router = require('express').Router()

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
        req.flash('error', 'Passwords do not match!')
        res.render('auth/signup', { data:req.body, alerts: req.flash() })
    } else {
        res.send(req.body)
    }
})

router.get('/logout', (req,res) => {
    res.send('GET /auth/logout')
})

// Export the router object so we can include it in the other files
module.exports = router