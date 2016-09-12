var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    User = require('./back/models/user'),
    Chat = require('./back/models/chatMessages'),
    routes = require('./back/routes/user.routes'),
    chatRoutes = require('./back/routes/chat.routes'),
    port = process.env.PORT || 8080;

process.env.PWD = process.cwd();

mongoose.connect('mongodb://lego:7770203@ds021166.mlab.com:21166/chat');
app.use(express.static(path.join(process.env.PWD, 'front')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST');
    res.header('Access-Control-Allow-Methods', 'X-Requested-With, content-type, Authorization');
    next();
});

io.on('connection', function(socket) {
    console.log('A User Has Connected');
    socket.on('message', function(data) {
        var newMsg = new Chat({
            username: data.username,
            avatar: data.avatar,
            message: data.message,
            created: new Date
        });
        newMsg.save(function(err) {
            if (err) throw err;
            io.emit('message', {
                username: data.username,
                avatar: data.avatar,
                message: data.message,
                created: new Date
            });
        });
    });
    socket.on('disconnect', function() {
        console.log('User has disconnected');
    });
});

app.use('/user', routes);

app.use('/chat', chatRoutes);

app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/front/views', 'index.html'));
});


app.use(function(req, res, next) {
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

http.listen(port);
console.log('Magic happens on port: ' + port);