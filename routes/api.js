const express = require('express');
const Ninja = require('../modals/ninja');
const router = express.Router();

//get response from database
router.get('/ninjas', function(req, res, next) {
    //res.send({name: 'GET'});
    /*
    Ninja.find({}).then(function(ninjas) {
        res.send(ninjas);
    });*/
    Ninja.aggregate().near(
        {near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000, spherical: true, distanceField: "dist.calculated"}
    ).then(function(ninjas) {
        res.send(ninjas);
    });
});

// add new ninjas 
router.post('/ninjas', function(req, res, next) {
    console.log(req.body);
    // var ninja = new Ninja(req.body);
    // ninja.save();
    Ninja.create(req.body).then(function(ninja) {
        res.send(ninja);
    }).catch(next);  
});

//updated ninja in the database
router.put('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        Ninja.findOne({_id: req.params.id}).then(function(ninja) {  //updated mongodb record at bottom
            console.log(ninja);
            res.send(ninja);
        });
    });
    //res.send({name: 'PUT'});
});

// DELETE NINJA FROM DATABASE
router.delete('/ninjas/:id', function(req, res, next) {
    //console.log(req.params.id);
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja) {
        res.send(ninja);
    });
    
});

module.exports = router;