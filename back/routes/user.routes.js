var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

router.post('/sign_up', function(req, res) {
    User.register(new User({
            name: req.body.name,
            username: req.body.username
        }),
        req.body.password,
        function(err, acount) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({
                    status: 'Registration successful.'
                });
            });
        });
});

router.post('/sign_in', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user.'
                });
            }
            res.status(200).json({
                status: 'login successful.'
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/status', function(req, res){
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

module.exports = router;