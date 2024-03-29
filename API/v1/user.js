const errors = require('restify-errors');
const account = require('../../modules/account');


module.exports = server => {

	server.post('/api/v1/user/register', (req, res, next) => {
        
		const {username, password} = req.body;
        
		const result = account.registerAccount(username, password)
			.then(() => {
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "X-Requested-With");
				res.send(201);
				next();
			})
			.catch((err) => {
				if(result === 'Both username and password must be strings') {
					return next(new errors.BadRequestError(err));
				}
                
				else {
					return next(new errors.InternalServerError(err));
				}
			});
	});

	server.post('/api/v1/user/login', (req, res, next) => {
        
		const {username, password} = req.body;

		account.login(username, password)
			.then((token) => {
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "X-Requested-With");
				res.send(200, token);
				next();

			})
			.catch((err) => {

				next(new errors.NotAuthorizedError(err));

			});
	});
}