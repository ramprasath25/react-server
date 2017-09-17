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
app.set('view engine', 'jade');
app.use(express.static('public'));
/** CROS-Request ***/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//   });
// });

var port = process.env.port || 8000;
mongoose.Promise = global.Promise;
mongoose.connect(config.database,{
    useMongoClient: true
}, function(err) {
    if (err) {
        console.log("Database not connected", err);
    } else {
        console.log("Database connected");
    }
});

// Morgan Log File
app.use(morgan('dev'));
app.listen(port);
console.log("Server running at port..." + port);