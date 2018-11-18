const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PostSchema = new mongoose.Schema({




});

PostSchema.plugin(timestamp);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;