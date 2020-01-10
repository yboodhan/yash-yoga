let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

// Show all journal entries for the logged in user
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

// Form to allow user to add a new entry
router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/journal/new')
})

// Delete an existing journal entry and redirect to all journals
router.delete('/:id', isLoggedIn, (req, res) => {
    db.entry.destroy({
        where: { id: req.params.id }
    })
    .then( () => {
        res.redirect('/journal')
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

// Create a new journal entry and redirect to all journals
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

// Form to edit an existing journal entry
router.get('/edit/:id', isLoggedIn, (req, res) => {
    db.entry.findOne({
        where: { id: req.params.id }
    })
    .then( entry => {
        res.render('user/journal/edit', { entry })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

// Update an existing journal entry
router.put('/', isLoggedIn, (req, res) => {
    db.entry.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: { id: req.body.id }
    })
    .then( () => {
        res.redirect('/journal')
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

// Display a specific journal entry
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