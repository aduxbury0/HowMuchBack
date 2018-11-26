const Post = require('../Schema/Post');
const Reply = require('../Schema/Reply');
const jwt = require('jsonwebtoken');

module.exports = {

	/* Takes a JSON web token, the data from req.body, and a post's ID. This function
    creates a new reply object and then appends its _id to the array of reply ids in the 
    post itself */
	addReply(passedToken, replyData, postId) {
		return new Promise((resolve, reject) => {
            console.log(postId)
			const token = passedToken.substring(7, passedToken.length);
			const decoded = jwt.decode(token);
			const { content, url } = replyData;

			const newReply = new Reply({
				username: decoded.username,
				content,
				url
			});

			newReply.save()
				.then((reply) => {

					Post.findOneAndUpdate(
						{_id: postId},
						{$push: {replies: reply._id}},
					)
						.then((post) => {
							console.log(post);
							resolve(post);

						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}, //!addReply

	getReplies(postId) {
		return new Promise((resolve, reject) => {

			Post.findById(postId)
				.then((post) => {
					if(post === null) {
						reject('Post doesnt exist');
					}
					else {
						resolve(post.replies);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}, //!getReplies

	vote(voteType, replyId) {
		return new Promise((resolve, reject) => {

			let vote = 0;

			if(voteType === 'up') {
				vote = 1;
			}
			else if(voteType === 'down') {
				vote = -1;
			}
			else {
				reject('invalid vote action');
			}

			Reply.findByIdAndUpdate(replyId, {$inc: {votes: vote}})
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	}, //!vote

	confirmAnswer(passedToken, postId, replyId){
		return new Promise(async (resolve, reject) => {
			const token = passedToken.substring(7, passedToken.length);
			const decoded = jwt.decode(token);
			
			try {
				const parentPost = Post.findById(postId);
				if(parentPost === null) reject('Post not found'); 

				if(parentPost.username === decoded.username) {
					Reply.findByIdAndUpdate(replyId, {confirmed: true})
						.then(() => {
							resolve();
						})
						.catch((err) => {
							reject(err);
						});
				}
				else {
					reject('Action requires user to be post owner');
				}
			}
			catch(err){
				reject(err);
			}
		});
	}

}
