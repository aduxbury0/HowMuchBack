const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const ReplySchema = new mongoose.Schema({

	username: {
		type: String,
		required: true,
		trim: true
	},
    
	content: {
		type: String,
		required: true,
		trim: true
	},
    
	votes: {
		type: Number,
		default: 0
	},

	confirmed: {
		type: Boolean,
		default: false
	},

	url: {
		type: String,
		required: true
	}
});

ReplySchema.plugin(timestamp);

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;