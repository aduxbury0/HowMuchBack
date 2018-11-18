const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PostSchema = new mongoose.Schema({

	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	title: {
		type: String,
		required: true,
		trim: true
	},

	description: {
		type: String,
		required: true,
		trim: true
	},

	quantity: {
		type: Number,
		required: true
	},

	condition: {
		type: String,
		trim: true
	},

	brand: {
		type: String,
		trim: true
	},

	model: {
		type: String,
		trim: true
	},

	madeIn: {
		type: String,
		trim: true
	},

	replies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reply'
		
	}]

});

PostSchema.plugin(timestamp);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;