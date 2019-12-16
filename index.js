// Required node modules
require('dotenv').config() //provides access to variables inside .env file
let express = require('express')
let layouts = require('express-ejs-layouts')

// Declare express app variable
let app = express()

// Set up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({ extended: false }))

// Add any controllers we have
app.use('/auth', require('./controllers/auth'))

// Add home or catch-all routes
app.get('/', (req,res) => {
    res.render('home')
})

// Always the bottom route, to deal with error
app.get('*', (req,res) => {
    res.render('error404')
})

app.listen(process.env.PORT || 3000, () => { //for deployment purposes
    console.log('You are connected! ☕️🎧')
})