const errors = require('restify-errors');
const account = require('../../modules/account');

module.exports = server => {

    server.post('/api/v1/user/register', (req, res, next) => {
        
        const {username, password} = req.body;
        
        console.log(req.body);
        
        const result = await account.registerAccount(username, password);

        
        console.log(result);
        if(result) {

            res.send(201);
            next();
        }

        /*else if(result == 'Both username and password must be strings') {
           return next(new errors.BadRequestError);

        }*/
        else {
            return next(new errors.InternalServerError);
        }

    });

    server.post('/api/v1/user/login', (req, res, next) => {
        res.send(201);
        next();
    });
}