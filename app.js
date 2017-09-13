var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./helper/config');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

var port = process.env.port || 3000;

mongoose.createConnection(config.database, function(err) {
    if (err) {
        console.log("Database not connected", err);
    } else {
        console.log("Database connected");
    }
});

app.set('secretKey', config.secret);
// Morgan Log File
app.use(morgan('dev'));
app.listen(port);
console.log("Server running at port" + port);