let router = require('express').Router()
let poses = require('../yoga_api.json')
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/routines/index')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/routines/new', { poses: poses })
})

router.post('/test', isLoggedIn, (req, res) => {
    res.send(req.body)
})

module.exports = router