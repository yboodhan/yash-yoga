// Required node modules
require('dotenv').config() //provides access to variables inside .env file
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')

// Declare express app variable
let app = express()

// Set up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(flash()) //order matters, must come after using session!
//custom middleware: add variables to locals for each page
app.use((req, res, next) => {
    res.locals.alerts = req.flash
    next()
})

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