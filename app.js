var path = require('path');
var http = require('http');
var express = require('express');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var env = require('dotenv').config();
var sessions = require('express-session');
var mongoose = require('mongoose');

var passport = require('passport');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server); // Use socket io in seperate files

var index = require('./routes/index');
var upload = require('./routes/upload');
var uploadComplete = require('./routes/upload_complete');
var login = require('./routes/login');
var persona = require('./routes/persona');
var freetime = require('./routes/freetime');
var mood = require('./routes/mood');
var seriesGame = require('./routes/series-game');
var detail = require('./routes/detail');
var fbLogin = require('./routes/facebook-login')(passport, io);
var profile = require('./routes/profile');
var personal = require('./routes/personal');

require('./config/passport')(passport);

// mongoose.Promise = global.Promise;

var port = process.env.PORT || 3006;


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);
// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(sessions({
    secret: process.env.EXPRESS_SESSION_SECRET,
    // Name: cookie_name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.USERDB);

// Console.log(mongoose.connection.readyState); //test database connection

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/upload', upload);
app.use('/upload_complete', uploadComplete);
app.use('/login', login);
app.use('/persona', persona);
app.use('/freetime', freetime);
app.use('/mood', mood);
app.use('/auth/facebook', fbLogin);
app.use('/detail', detail);
app.use('/profile', profile);
app.use('/personal', personal);
app.use('/seriespel', seriesGame);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});


server.listen(app.get('port'), function() {
    console.log(`app started on http://localhost:${port}`);

});
