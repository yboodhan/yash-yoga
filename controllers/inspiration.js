let router = require('express').Router()
let db = require('../models')
let axios = require('axios')
let moment = require('moment')
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {

    axios.get('https://quote-garden.herokuapp.com/quotes/random')
    .then( response => {
        db.user.findAll()
        .then( users => {
            console.log('🧘🏽‍♀️ user is:', req.user)
            res.render('user/inspiration/index', { quote: response.data, users, currentUser: req.user })
        })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router