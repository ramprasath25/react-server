var express = require('express');
var app = express.Router();
var User = require('../models/user.js');

app.get('/', function(req, res) {
	res.json("works");
});

app.get('/setup', function(req, res) {
	 var ram = new User({ 
	    name: 'Ram', 
	    password: 'password',
	    admin: true 
 	 });

  // save the sample user
  ram.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});
module.exports = app;