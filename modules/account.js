const mongoose = require('mongoose');
const User = require('../Schema/User');
const bcrypt = require('bcryptjs');

module.exports = account = {

    /* Account registration function, takes in a username and password, encrypts the password, 
       adds a new user to the database, then returns true if successfull or false otherwise */
    async registerAccount(username, password) {
        if(typeof username == 'string' && typeof password == 'string') {
            console.log('inside creation branch');
            const user = new User({
                username,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    //set encrypted password
                    user.password = hash;

                    //save user
                    try {
                        const newUser = await user.save();
                        //return [true, ''];
                        console.log('user created, returning true');
                        return true;
                    }
                    catch(err) {
                        //return [false, err];
                        console.log(err);
                        return false;
                    }

                })
            });
        }
        else {
            //return [false, 'Both username and password must be strings'];
            return false;
        }
    }



}