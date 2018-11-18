const errors = require('restify-errors');

module.exports = server => {

    server.post('/api/v1/comment/post', (req, res, next) => {
        res.send(201);
        next();
    });

    server.get('/api/v1/comment/all', (req, res, next) => {
        res.send(200);
        next();
    });

    server.patch('/api/v1/comment/upvote', (req, res, next) => {
        res.send(200);
        next();
    });

    server.patch('/api/v1/comment/downvote', (req, res, next) => {
        res.send(200);
        next();
    });
}