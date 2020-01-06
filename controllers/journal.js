let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/journal/index')
})

module.exports = router