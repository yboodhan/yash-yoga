// Create an express router object
let router = require('express').Router()
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

// Define routes
router.get('/', isLoggedIn, (req, res) => {
  res.render('profile/main')
})

router.get('/admin', isAdminLoggedIn, (req, res) => {
  res.render('profile/admin')
})

router.get('/edit', isLoggedIn, (req, res) => {
  res.render('profile/edit')
})

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

router.get('/:id', isLoggedIn, (req, res) => {
  db.user.findOne({
    where: { id: req.params.id },
    include: [db.routine]
  })
  .then( user => {
    console.log(user, '🧘🏽‍♀️')
    res.render('profile/show', { user })
  })
  .catch( (error) => {
    console.log(error)
    res.render('error')
  })
})

// Export the router object so we can include it in the other files
module.exports = router