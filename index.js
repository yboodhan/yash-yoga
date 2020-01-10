// Required node modules
require('dotenv').config()
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
let rowdy = require('rowdy-logger')
let moment = require('moment')
let methodOverride = require('method-override');

// Declare express app variable
let app = express()

// Include passport configuration
let passport = require('./config/passportConfig')

// Set up and middleware
let rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// Custom middleware
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.user = req.user
    res.locals.moment = moment
    next()
})

// Add controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/inspiration', require('./controllers/inspiration'))
app.use('/routines', require('./controllers/routines'))
app.use('/journal', require('./controllers/journal'))

// Add home and catch-all routes
app.get('/', (req,res) => {
    res.render('home')
})

app.get('*', (req,res) => {
    res.render('error')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('You are connected! ☕️🎧')
    rowdyResults.print()
})