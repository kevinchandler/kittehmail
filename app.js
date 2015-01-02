var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// var mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI);

// db.findUser('test@test.com', function(err, user) {
//     console.log(err, user);
// })

// db.subscribeUser({
//     // email: 'im.kevin@me.com',
//     webhook: 'localhost:3000/kittens',
//     ip: '127.0.0.1'
// }, function(err, succ) {
//     console.log(err, succ);
// })

// var Q = require('q');
// var db = require('./lib/db.js');


// db.findEntry( { email: 'im.kevin@me.com'}, function(err, user) {
//     console.log(err, user);
// });

module.exports = app;