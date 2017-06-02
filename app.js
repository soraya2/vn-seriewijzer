var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var env = require('dotenv').config();
var sessions = require('express-session');
var mongoose = require('mongoose');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server); // Use socket io in seperate files
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessions({
    secret: process.env.EXPRESS_SESSION_SECRET,
    // Name: cookie_name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// app.use(passport.initialize());
// app.use(passport.session());
mongoose.connect(process.env.USERDB);

// console.log(mongoose.connection.readyState); //test database connection

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


server.listen(app.get('port'), function() {
    console.log('app started on localhost:3006');
});
