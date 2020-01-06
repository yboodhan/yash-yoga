let router = require('express').Router()
let poses = require('../yoga_api.json')
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/routines/index')
})

module.exports = router