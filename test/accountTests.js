const assert = require('assert');
const User = require('../Schema/User');
const account = require('../modules/account');


describe('Account function Tests', () => {

    it('registers an account', (done) => {

        account.registerAccount('dux', 'password')
            .then((newUser) => {
                assert(newUser.username === 'dux');
                done();
            })
            .catch(err => console.log(err));
    });

    it('logs in and returns a token', (done) => {

        account.login('dux', 'password')
            .then((token) => {
                assert(typeof token === 'string');
                User.findOneAndDelete({username: "dux"})
                    .then(() => done())
                    .catch(err => console.log(err));
                
            })
            .catch(err => console.log(err));

    });
});