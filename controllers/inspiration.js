let router = require('express').Router()
let db = require('../models')
let axios = require('axios')
let isLoggedIn = require('../middleware/isLoggedIn')

// Show the user a daily quote, other users and puvlic routines
router.get('/', isLoggedIn, (req, res) => {
    axios.get('https://quote-garden.herokuapp.com/quotes/random')
    .then( response => {
        db.user.findAll()
        .then( users => {
            db.routine.findAll({
                where: { private: false },
            })
            .then ( publicRoutines => {
                res.render('user/inspiration/index', { quote: response.data, users, currentUser: req.user, publicRoutines })
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router