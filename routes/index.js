var express = require('express');
var app = express.Router();
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var config = require('../helper/config');

//Adding user
app.get('/adduser', function(req, res) {
    let ram = new User({
        name: 'Ram',
        password: 'password',
        admin: true
    });
    ram.save(function(err, data) {
        if (err) {
            res.json({
                success: false
            });
        } else {
            console.log('User saved successfully');
            res.json({
                success: true
            });
        }
    });
});

// Authenticate and sending jwt 
app.post('/aunthenticate', function(req, res) {
    let loginUser = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pictureUrl: req.body.pictureUrl,
        publicProfileUrls: req.body.publicProfileUrl,
        emailAddress: req.body.emailAddress,
        loginDate: new Date(),
        isLoggedIn: true
    });
    loginUser.save(function(err, data) {
        if (err) {
            res.json({
                success: false,
                message: "Error Inserting data"
            });
        } else {
            let token = jwt.sign({
                data: loginUser
            }, config.secret, {
                expiresIn: 604800 // expires in 24hours
            });
            var userInfo = {};
            userInfo.token = token
            userInfo.id = data.id,
            userInfo.firstName = data.firstName,
            userInfo.lastName = data.lastName,
            userInfo.pictureUrl = data.pictureUrl,
            userInfo.publicProfileUrls = data.publicProfileUrl,
            userInfo.emailAddress = data.emailAddress,
            userInfo.loginDate = data.loginDate,
            userInfo.isLoggedIn = data.isLoggedIn
            res.json({
                success: true,
                userInfo: userInfo,
                message: "Aunthentication success"
            });
        }
    });
});

module.exports = app;