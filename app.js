var path = require('path');
var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var compress = require('compression');
var env = require('dotenv').config();
var sessions = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server); // Use socket io in seperate files
var port = process.env.PORT || 3006;

//routes
var upload = require('./routes/upload');
var uploadComplete = require('./routes/upload_complete');
var reviewOverview = require('./routes/review_overview');
var reviewEditDetail = require('./routes/review_detail');
var login = require('./routes/login');
var persona = require('./routes/persona');
var seriesGame = require('./routes/series-game');
var fbLogin = require('./routes/facebook-login')(passport, io);
var personaResults = require('./routes/persona_results');
var reviewDetail = require('./routes/detail')(io);
var home = require('./routes/home');
var allReviews = require('./routes/all_reviews');
var search = require('./routes/search');

require('./config/passport')(passport);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);
app.set('io', io);
// Uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.png')));
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessions({
    secret: process.env.EXPRESS_SESSION_SECRET,
    // Name: cookie_name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, expires: false }

}));

app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.USERDB);

app.use('/', home);
app.use('/upload', upload);
app.use('/upload_complete', uploadComplete);
app.use('/review_edit', reviewEditDetail);
app.use('/review_overview', reviewOverview);
app.use('/login', login);
app.use('/persona', persona);
app.use('/auth/facebook', fbLogin);
app.use('/recensies', allReviews);
app.use('/seriespel', seriesGame);
app.use('/review', reviewDetail);
app.use('/persona_results', personaResults);
app.use('/search', search);

mongoose.connect(process.env.USERDB);
// Console.log(mongoose.connection.readyState); //test database connection

app.use(express.static(path.join(__dirname, './')));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
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

io.on('connection', function(socket) {

    socket.broadcast.on('comment', function(comm) {
        io.emit('comment', comm);
    });

});

server.listen(app.get('port'), function() {
    console.log(`app started on http://localhost:${port}`);

});
