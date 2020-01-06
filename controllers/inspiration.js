let router = require('express').Router()
let db = require('../models')
let axios = require('axios');
let isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
    axios.get('https://quotes.rest/qod', { headers: 
        {
            "Accept": "application/json"
        }
    })
    .then( response => {
        db.user.findAll()
        .then( users => {
            res.render('user/inspiration/index', { quote: response.data.contents.quotes[0], users })
        })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router