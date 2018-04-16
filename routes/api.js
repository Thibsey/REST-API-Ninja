const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')

// Get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    Ninja.aggregate().near({
        near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] //parse the query strings into floating point numbers
        },
        distanceField: "dis", //note this is not dist.calculated
        maxDistance: 100000, //distance in meters
        spherical: true //model of earth to use
    }).then(function (ninjas) {
        res.send(ninjas); //return matching ninjas to client
    }).catch(next);
});

// Add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

// Update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});

// Delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});

module.exports = router;