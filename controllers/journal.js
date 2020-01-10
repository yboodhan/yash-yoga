let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

router.get('/', isLoggedIn, (req, res) => {
    db.entry.findAll({
        where: {userId: req.user.id}
    })
    .then( entries => {
        res.render('user/journal/index', { entries })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/journal/new')
})

router.post('/', isLoggedIn, (req, res) => {
    db.entry.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
    })
    .then( (entry) => {
        res.redirect('/journal')
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

router.get('/:id', isLoggedIn, (req, res) => {
    db.entry.findOne({
        where: { id: req.params.id }
    })
    .then( entry => {
        res.render('user/journal/show', { entry })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

module.exports = router