// Required node modules
let express = require('express')
let layouts = require('express-ejs-layouts')

// Declare express app variable
let app = express()

// Set up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))

// Add any controllers we have

// Add home or catch-all routes
app.get('/', (req,res) => {
    res.render('home')
})

// Always the bottom route, to deal with error
app.get('*', (req,res) => {
    res.render('error404')
})

app.listen(3000, () => {
    console.log('You are connected! ☕️🎧')
})