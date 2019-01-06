/* eslint global-require: 0 */

//Cors is not enabled by default as it would pose a major security risk to a deployed website, run the below to open a dev session of chrome with no web security to simulate operational use
//chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security

const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config/config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//Protect all routes except for register and login
server.use(rjwt({secret: config.JWT_SECRET}).unless({path: ['/', '/api/v1/user/register', '/api/v1/user/login', '/api/v1/posts/all', '/api/v1/posts/one', '/api/v1/posts/search']}));
server.use(restify.plugins.queryParser());

server.listen(config.port, () => {

	mongoose.connect(config.mongoDBURI, {useNewUrlParser: true});
	console.log('MongoDB connected...');
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => {

	require('./API/v1/user')(server);
	require('./API/v1/post')(server);
	require('./API/v1/reply')(server);
	server.get('/', (req, res, next) => {
		
		res.send(200, 'How Much Web API');

	});
	
	console.log(`Server started on port: ${config.port}`);
    
});