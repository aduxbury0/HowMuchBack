const errors = require('restify-errors');
const postFunctions = require('../../modules/posts');

module.exports = server => {

	server.post('/api/v1/posts/post', (req, res, next) => {

		postFunctions.addPost(req.headers.authorization, req.body)
			.then((post) => {
				res.send(201)
				console.log(post);
				next();
			})
			.catch((err) => {
				console.log(err);
				next(new errors.InternalServerError(err));
			});
	});

	server.get('/api/v1/posts/all', (req, res, next) => {
		
		postFunctions.getAllPosts()
			.then((posts) => {
				res.send(200, posts);
				next();
			})
			.catch((err) => {
				if(err === 'No Posts Available') {
					next(new errors.NotFoundError(err));
				}
				else {
					next(new errors.InternalServerError(err));
				}
			});
	});

	server.get('/api/v1/posts/one', (req, res, next) => {
		
		postFunctions.getPost(req.query)
			.then((posts) => {
				res.send(200, posts);
				next();
			})
			.catch((err) => {
				if(err === 'No matching posts') {
					next(new errors.NotFoundError(err));
				}
				else {
					next(new errors.InternalServerError(err));
				}
			});
	});

	server.get('/api/v1/posts/search', (req, res, next) => {

		const {category, data} = req.query;
		postFunctions.searchPosts(category, data)
			.then((posts) => {
				res.send(200, posts);
				next();

			})
			.catch((err) => {

				console.log(err);
                
				if(err === 'No matching posts'){
					next(new errors.NotFoundError(err));
				}
				else {
					next(new errors.InternalServerError(err));
				}
			});
	});
}