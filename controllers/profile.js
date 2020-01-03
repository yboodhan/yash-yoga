// Create an express router object
let router = require('express').Router()
let isAdminLoggedIn = require('../middleware/isAdminLoggedIn')
let isLoggedIn = require('../middleware/isLoggedIn')
let axios = require('axios');

// Define routes
router.get('/', isLoggedIn, (req, res) => {
    res.render('profile/main')
})

router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})

//GET profile/repos
router.get('/repos', isLoggedIn, (req, res) => {

    // Grab page number if it exists
    let page = parseInt(req.query.page) || 1

  // Make sure user has GH info
  if (req.user.githubToken) {
    axios.get('https://api.github.com/user/repos?per_page=10&page=' + page, {
      headers: {
        Authorization: `token ${req.user.githubToken}`,
        'User-Agent': 'Yashoma-GH-App'
      }
    })
    .then(response => {
      res.render('profile/repos', { repos: response.data, page })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
  }
  else {
    // No Github Info
    res.render('profile/repos', { repos: null, page })
  }
})

// Export the router object so we can include it in the other files
module.exports = router