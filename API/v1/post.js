const errors = require('restify-errors');

module.exports = server => {

    server.post('/api/v1/posts/post', (req, res, next) => {
        res.send(201);
        next();
    });

    server.get('/api/v1/posts/fa', (req, res, next) => {
        res.send(200);
        next();
    });

    server.get('/api/v1/posts/fbt', (req, res, next) => {
        res.send(200);
        next();
    });

    server.get('/api/v1/posts/fbc', (req, res, next) => {
        res.send(200);
        next();
    });

    server.get('/api/v1/posts/fbuid', (req, res, next) => {
        res.send(200);
        next();
    });

    server.get('/api/v1/posts/fbpid', (req, res, next) => {
        res.send(200);
        next();
    });
}