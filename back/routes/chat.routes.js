var express = require('express'),
    router = express.Router(),
    Chat = require('../models/chatMessages');

router.get('/messages', function(req, res) {
    Chat.find(function(err, messages) {
        if (err) {
            res.send(err);
        }
        res.json(messages);
    });
});

module.exports = router;