var express = require('express');
var app = express.Router();
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var config = require('../helper/config');
app.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        res.json({ success: false, message: "Authentication failed" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
      res.json({ success: false, message: "No token provided" }); 
  }
})
app.get('/', function(req, res) {
	res.json("works");
});

app.get('/adduser', function(req, res) {

  var ram = new User({ 
    name: 'Ram', 
    password: 'password',
    admin: true 
	});
  
  ram.save(function(err, data) {
    if (err) {
      res.json({ success: false });
    } else {
      console.log('User saved successfully');
      res.json({ success: true });
    }    
  });

});

app.get('/listuser', function(req, res) {
  User.find({}, function(err, data) {
    if(err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, users: data });
    }
  });
});

app.post('/aunthenticate', function(req, res) {
  User.findOne({name : req.body.name}, function(err, data) {
    if(err) {
      res.json({ success: false });
    } else {
      if(!data) {
        res.json({ success: true, message: "No user found, Aunthentication failed" });
      } else {
        if(data.password == req.body.password) {
          var token = jwt.sign({data: data}, config.secret, {
             expiresIn: 604800
          });
          res.json({ success: true, token: token, message: "Enjoy your token" });
        } else {
          res.json({ success: false , message : "Password doesnt match"});
        }
      }
    }
  });
});
module.exports = app;