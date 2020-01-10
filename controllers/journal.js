let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/journal/index')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/journal/new')
})

module.exports = router