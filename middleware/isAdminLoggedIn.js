//Checks whether someone is logged in
module.exports = (req, res, next) => {
    if (req.user && req.user.admin) {
        //someone is logged in and they are an admin; let em in
        next()
    } else {
        //no one is logged in or isn't an admin; redirect away from protected page
        req.flash('error', 'You must be an admin to view this page')
        res.redirect('/profile')
    }
}