var createError = require('http-errors');
var key = 'appit';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var protectRoute = function(req, res, next) {
    // if user exists the token was sent with the request
    if (req.user) {
        //if user exists then go to next middleware
        next();
    }
    // token was not sent with request send error to user
    else {
        res.status(500).json({ error: 'login is required' });
    }
}

app.use(function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, key , function (err, payload) {
            console.log(payload)
            if (payload) {
                req.user = payload.userID;
                next()
            } else {
                next()
            }
        })
    } catch (e) {
        next()
    }
})

mongoose.connect('mongodb://localhost:27017/appitweather', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB")
    }
})

app.get('/', function (req, res, next) {
    res.render('home', { title: 'Home' });
});
app.use('/weather', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
