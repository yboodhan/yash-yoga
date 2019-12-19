// Create an express router object
let router = require('express').Router()
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')
let isLoggedIn = require('../middleware/isLoggedIn')

// Define routes
router.get('/', isLoggedIn, (req, res) => {
    res.render('profile/main')
})

router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})

// Export the router object so we can include it in the other files
module.exports = router