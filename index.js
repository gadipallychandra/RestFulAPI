const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import module exports api here
const routes = require('./routes/api');
//create express app
const app = express();

// connect to mongo db
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes
app.use('/api', routes);


//error handling middleware
app.use(function(err, req, res, next) {
    console.log(err);
    console.log(next);
    //res.send({error: err.message});
    res.status(422).send({error: err.message});
})



 app.listen(process.env.port || 4000, function() {
     console.log('Port running 4000');
 });