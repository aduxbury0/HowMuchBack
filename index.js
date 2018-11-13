const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config/config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//Protect all routes except for register and login
server.use(rjwt({secret: config.JWT_SECRET}).unless({path: ['/api/v1/user/register', '/api/v1/user/login']}));

server.listen(config.port, () => {

    mongoose.connect(config.mongoDBURI, {useNewUrlParser: true});
    console.log('MongoDB connected...');
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => {

    require('./API/v1/user')(server);
    require('./API/v1/post')(server);
    require('./API/v1/comment')(server);
    console.log(`Server started on port: ${config.port}`);
    
});