const errors = require('restify-errors');
const replyFunctions = require('../../modules/reply');

module.exports = server => {

	server.post('/api/v1/comment/post', (req, res, next) => {
		console.log(req.query.postId)
		replyFunctions.addReply(req.headers.authorization, req.body ,req.query.postId)
			.then(() => {
				res.send(201, 'Reply successfully created');
				next();
			})
			.catch((err) => {
				next(new errors.InternalServerError(err));
			});
	});

	server.get('/api/v1/comment/all', (req, res, next) => {
		
		replyFunctions.getReplies(req.query.postId)
			.then((replies) => {
				res.send(200, replies)
				next();
			})
			.catch((err) => {
				next(new errors.InternalServerError(err));
			});
	});

	server.patch('/api/v1/comment/vote', (req, res, next) => {
		
		replyFunctions.vote(req.query.voteType, req.query.replyId)
			.then((reply) => {
				res.send(204);
				next();
			})
			.catch((err) => {
				if(err === 'invalid vote action'){
					next(new errors.BadRequestError(err));
				} 
				else {
					next(new errors.InternalServerError(err));
				}
			});
	});

	server.patch('/api/v1/comment/confirm', (req, res, next) => {
		
		replyFunctions.confirmAnswer(req.headers.authorization, req.query.postId, req.query.replyId)
			.then(() => {
				res.send(204);
				next();
			})
			.catch((err) => {
				if(err === 'Action requires user to be post owner') next(new errors.ForbiddenError(err));
				else next(new errors.InternalServerError(err));
			});
	});

}