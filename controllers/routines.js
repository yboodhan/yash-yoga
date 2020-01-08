let router = require('express').Router()
let poses = require('../yoga_api.json')
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/routines/index')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/routines/new', { poses: poses })
})

router.post('/', isLoggedIn, (req, res) => {
    db.routine.findOrCreate({
        where: { email : req.body.email },
        defaults: req.body
    })
    .then(([user, wasCreated]) => {
        res.render('user/routines/index')
    })
    .catch( err => {
        console.log(err)
        req.flash('error', 'Something went wrong, try again.')
        res.render('error')
    })
})

module.exports = router