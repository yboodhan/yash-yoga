let router = require('express').Router()
let poses = require('../yoga_api.json')
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')
let async = require('async')

router.get('/', isLoggedIn, (req, res) => {
    res.render('user/routines/index')
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/routines/new', { poses: poses })
})

router.post('/', isLoggedIn, (req, res) => {
    let poses = req.body.pose
    let duration = req.body.duration

    db.routine.create({
        name: req.body.name,
        music: req.body.music,
        private: req.body.private,
        userId: req.body.creatorId
    })
    .then( (routine) => {
        async.forEachOf(poses, (pose, index, done) => {
            db.pose.findOne({ 
                where: {sanskrit_name: pose}
            })
            .then( (pose) => {
                routine.addPose(pose, { through: { duration: duration[index] }})
                .then(() => {
                    done()
                })
                .catch( (error) => {
                    console.log(error)
                    res.render('error')
                    done()
                })
            })
            .catch( (error) => {
                console.log(error)
                res.render('error')
                done()
            })
        }, () => {
            res.redirect('/routines')
        })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})
//remember to add isLoggedin here!!!!!!!!
router.get('/:id', isLoggedIn, (req, res) => {
    let id = req.params.id
    db.routine.findOne( {
        where: { id: id },
        include: [db.pose, db.user]
    })
    .then( (routine) => {
        console.log(routine)
        res.render('user/routines/show', { routine: routine } )
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
    
})

module.exports = router