// Required node modules
let express = require('express')

// Declare express app variable
let app = express()

// Set up and middleware

// Add any controllers we have

// Add home or catch-all routes
app.get('/', (req,res) => {
    res.send('<h1>HELLO</h1>')
})

app.listen(3000, () => {
    console.log('You are connected! ☕️')
})