let router = require('express').Router()
let isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')
let async = require('async')
//Get JSON file of all yoga pose info
let poses = require('../yoga_api.json')

//Routines home route, lists all routines
router.get('/', isLoggedIn, (req, res) => {
    db.routine.findAll({
        where: {userId: req.user.id}
    })
    .then( routines => {
        res.render('user/routines/index', { routines: routines })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

//Form to create a new routine
router.get('/new', isLoggedIn, (req, res) => {
    res.render('user/routines/new', { poses: poses })
})

//Form to edit an existing routine
router.get('/edit/:id', isLoggedIn, (req, res) => {
    db.routine.findOne({
        where: { id: req.params.id },
        include: [db.pose]
    })
    .then ( routine => {
        db.routines_poses.findAll({
            where: { routineId: req.params.id }
        })
        .then(connections => {
            let tempPoses = {}
            routine.poses.forEach(p => tempPoses[p.id] = p)
            let poses = connections.map(c => tempPoses[c.poseId])
                db.pose.findAll()
                .then( allPoses => {
                    res.render('user/routines/edit', { routine, allPoses, poses })
                })
                .catch( (error) => {
                    console.log(error)
                    res.render('error')
                })
        })
        .catch( (error) => {
            console.log(error)
            res.render('error')
        })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

//Update an existing routine
router.put('/', (req, res) => {
    let poses = req.body.pose
    let duration = req.body.duration
    if (typeof poses === "string") { 
        poses = poses.split()
        duration = duration.split()
    }

    db.routine.update({
        name: req.body.name,
        music: req.body.music,
        private: req.body.private,
        userId: req.body.creatorId
    }, {
        where: { id: req.body.routineId }
    })
    .then( () => {
        console.log('UPDATED')
        async.forEachOf(poses, (p, index, done) => {
            console.log(p)
            db.pose.findOne({ 
                where: {sanskrit_name: p}
            })
            .then( (pose) => {
                console.log('ADDING POSES')
                console.log(pose)
                console.log('duration at index ', index, ' is ', duration[index])
                db.routines_poses.create({
                    poseId: pose.id,
                    routineId: req.body.routineId,
                    duration: duration[index] 
                })
                .then(() => {
                    console.log('DONE ADDING POSES!')
                    done()
                })
                .catch( (error) => {
                    console.log(error)
                    done(error)
                })
            })
            .catch( (error) => {
                console.log(error)
                done(error)
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

//Delete an existing routine
router.delete('/:id', (req, res) => {
    db.routine.destroy({
      where: { id: req.params.id }
    })
    .then( () => {
        console.log('🧘🏽‍♀️ Deleted routine', req.params.id)
        db.routines_poses.destroy({
            where: { routineId: req.params.id }
        })
        .then ( () => {
            console.log('🧘🏽‍♀️ Destroyed in link table')
            res.redirect('/routines')
        })
        .catch( (error) => {
            console.log(error)
            res.render('error')
        })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

//Create a new routine and add it's corresponding poses and duration for each pose
router.post('/', isLoggedIn, (req, res) => {
    let poses = req.body.pose
    let duration = req.body.duration
    if (typeof poses === "string") { 
        poses = poses.split()
        duration = duration.split()
    }

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
                    done(error)
                })
            })
            .catch( (error) => {
                console.log(error)
                done(error)
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

//View the specific routine and it's poses, play slideshow
router.get('/:id', isLoggedIn, (req, res) => {
    let id = req.params.id
    db.routine.findOne( {
        where: { id: id },
        include: [db.pose, db.user]
    })
    .then( (routine) => {
        db.routines_poses.findAll({
            where: { routineId: id }
        })
        .then(connections => {
            let tempPoses = {}
            routine.poses.forEach(p => tempPoses[p.id] = p)
            let poses = connections.map(c => tempPoses[c.poseId])
            res.render('user/routines/show', { routine, poses } )
        })
        .catch( (error) => {
            console.log(error)
            res.render('error')
        })
    })
    .catch( (error) => {
        console.log(error)
        res.render('error')
    })
})

module.exports = router