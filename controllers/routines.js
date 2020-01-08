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

    console.log(poses, 'all poses for routine')
    let duration = req.body.duration
    console.log(duration, 'length of pose')

    db.routine.create({
        name: req.body.name,
        music: req.body.music,
        private: req.body.private,
        userId: req.body.creatorId
    })
    .then( (routine) => {
        console.log(routine, 'created routine')
        async.forEachOf(poses, (pose, index, done) => {
            console.log(pose, index)
            db.pose.findOne({ 
                where: {sanskrit_name: pose}
            })
            .then( (pose) => {
                console.log(pose, 'found pose')
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
            res.redirect('user/routines/index')
        })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

module.exports = router