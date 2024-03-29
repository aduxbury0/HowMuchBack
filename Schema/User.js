const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({

	username: {
		type: String,
		required: true,
		trim: true
	},
    
	password: {
		type: String,
		required: true,
		trim: true
	},

	jwToken: {
		type: String,
		default: ''
        
	}
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);

module.exports = User;