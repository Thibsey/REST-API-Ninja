const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Setup express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// Initialize Routes
app.use('/api', require('./routes/api'));

// Error handeling Middleware
app.use(function(err, req, res, next){
    // console.log(err);
    res.status(422).send({ error: err._message});
});

// Listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests');
});
