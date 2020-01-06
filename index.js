// Required node modules
require('dotenv').config() //provides access to variables inside .env file
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
let rowdy = require('rowdy-logger')
let moment = require('moment')

// Declare express app variable
let app = express()

// Include passport configuration
let passport = require('./config/passportConfig')

// Set up and middleware
let rowdyResults = rowdy.begin(app)
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
app.use(passport.initialize()) //must come after session
app.use(passport.session()) //must come after session

//custom middleware: add variables to locals for each page
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.user = req.user
    res.locals.moment = moment
    next()
})

// Add any controllers we have
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/inspiration', require('./controllers/inspiration'))

// Add home or catch-all routes
app.get('/', (req,res) => {
    res.render('home')
})

// Always the bottom route, to deal with error
app.get('*', (req,res) => {
    res.render('error')
})

app.listen(process.env.PORT || 3000, () => { //for deployment purposes
    console.log('You are connected! ☕️🎧')
    rowdyResults.print()
})