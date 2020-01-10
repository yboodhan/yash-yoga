let router = require('express').Router()
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

// Show the user's main profile page
router.get('/', isLoggedIn, (req, res) => {
  res.render('profile/main')
})

// Show the admin page
router.get('/admin', isAdminLoggedIn, (req, res) => {
  res.render('profile/admin')
})

// Form to edit the user information
router.get('/edit', isLoggedIn, (req, res) => {
  res.render('profile/edit')
})

// Update the user information
router.put('/', isLoggedIn, (req, res) => {
  db.user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    photoUrl: req.body.photoUrl,
    bio: req.body.bio
  },{
    where: { id: req.user.id }
  })
  .then( () => {
    res.redirect('/profile')
  })
  .catch( (error) => {
    console.log(error)
    res.render('error')
  })
})

// Display a specific user
router.get('/:id', isLoggedIn, (req, res) => {
  db.user.findOne({
    where: { id: req.params.id },
    include: [db.routine]
  })
  .then( user => {
    res.render('profile/show', { user })
  })
  .catch( (error) => {
    console.log(error)
    res.render('error')
  })
})

module.exports = router