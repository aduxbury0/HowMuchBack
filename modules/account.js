const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
const config = require('../config/config');


module.exports = {

	/* Account registration function, takes in a username and password, encrypts the password, 
       adds a new user to the database, then returns true if successful or false otherwise */
    
	registerAccount(username, password) {
		return new Promise((resolve, reject) => {

			if(typeof username === 'string' && typeof password === 'string') {

				User.findOne({username})
					.then((foundUser) => {
						if(foundUser) {

							console.log(`found: ${foundUser}`);
							reject('Username already in use');

						}

						else {
                            
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
										console.log('new user created');
										resolve(newUser);
									}
									catch(err) {
										console.log(err);
										reject(err);
									}
								})
							});    
						}
					})
					.catch((err) => {
						reject(err);
					});
			}
            
			else {
				//return [false, 'Both username and password must be strings'];
				reject('Both username and password must be strings');
			}

		});   
	}, // !registerAccount()

	/* Authenticates a given username and password with one stored in the DB, will return a JSON web
    token if the one stored in the db is older than 24 hours or doesnt exist*/

	login(username, password) {
        
		return new Promise((resolve, reject) => {
            
			//Check to see that the user actually exists
			User.findOne({username})
				.then((user) => {
                    
					if(user){
                        
						//checking password matches stored password
						bcrypt.compare(password, user.password, (err, isMatch) => {
                            
							if(err) throw err;
                            
							if(isMatch) {

								// We store the JWT in the dB and so have to check to see if it has expired or not
								const currentDate = new Date();
								const twentyFourHours = 86400000;
								//Check to see if token exists or is over 24 hours old
								if(user.jwToken === '' || (currentDate - user.updatedAt) > twentyFourHours) {

									//we dont put the token into the token as that would be pointless and create an exponentially larger and larger token
									const jsonUser = user.toJSON();
									delete jsonUser['jwToken'];

									const token = jwt.sign(jsonUser, config.JWT_SECRET, {
										expiresIn: '24h'
									});

									User.findOneAndUpdate({username}, {jwToken: token})
										.then(() => {
											resolve(token);
                                
										})
										.catch((err) => {
											reject(err);
										});
								}
								//Token is under 24 hours so we dont generate a new one and just continue
								else {
									
									resolve(user.jwToken);

								}
							}
							else {
								reject('Authentication failed');
							}
						});
					}
					else {
						reject('Authentication failed');
					}
				})
				.catch(() => {
					reject('Authentication failed');
				});
		});
	} //!login

}