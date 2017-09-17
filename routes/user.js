var express = require('express');
var app = express.Router();
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var config = require('../helper/config');

// Aunthenticate token
app.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: "Authentication failed"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            success: false,
            message: "Authentication failed, No token provided"
        });
    }
});
// List all user
app.get('/listuser', function(req, res) {
    User.find({}, function(err, data) {
        if (err) {
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true,
                users: data
            });
        }
    });
});

module.exports = app;