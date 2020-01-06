let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/articles/index')
})

module.exports = router