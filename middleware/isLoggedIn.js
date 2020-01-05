//Checks whether someone is logged in
module.exports = (req, res, next) => {
    if (req.user) {
        //someone is logged in; let em in
        next()
    } else {
        //no one is logged in; redirect away from protected page
        req.flash('error', 'You must be logged in to view this page.')
        res.redirect('/auth/login')
    }
}