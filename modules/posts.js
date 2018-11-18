const jwt = require('jsonwebtoken');
const Post = require('../Schema/Post');
const User = require('../Schema/User');

module.exports = {

	/* Takes a token to find correct account to attribute to, and the data 
    to fill the form with. will resolve the promise if all data is present
    and no error occurs, rejects on all other cases */
	addPost(passedToken, postData) {
		return new Promise((resolve, reject) => {

			const { title, description, quantity, condition, brand, model, madeIn } = postData;
			
			const token = passedToken.substring(7, passedToken.length);
			const decoded = jwt.decode(token);
			
			User.findOne({username: decoded.username})
				.then( async (user) => {

					if(user){
                        
						const newPost = new Post({
							username: user._id,
							title,
							description,
							quantity,
							condition,
							brand,
							model,
							madeIn
						});

						try{
                            
							const post = await newPost.save();
							console.log(post);
							resolve(post);

						}
						catch(err) {
							reject(err);
						}

					}
					else {

						reject('No assosiated user');

					}

				})
				.catch((err) => {
					reject(err);
				});
		});
	}, //!addPost()

	/* will resolve with all Posts from database and reject on 0 documents returned or on error */
	getAllPosts() {
		return new Promise((resolve, reject) => {

			Post.find()
				.populate({path: 'users', select: 'username'})
				.populate('replies')
				.then((posts) => {
					if(posts) {
						resolve(posts);
					}
					else {

						reject('No Posts Available');

					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}, //!getAllPosts()

	/* takes a mongoDB post _id and will return the entire content of the post matching that _id,
    will reject on failure to find that post and all errors */
	getPost(postId) {
		return new Promise((resolve, reject) => {
			
			if(typeof postId.id === 'string'){
				const id = postId.id;
				Post.findById(id)
					.populate({path: 'users', select: 'username'})
					.populate('replies')
					.then((post) => {

						if(post) {

							resolve(post);

						}  
						else {
							reject('Post not found');
						}

					})
					.catch((err) => {
						reject(err);
					});
			} 
			else {
				reject('Invalid post ID type');
			}
		});
	}, //!getAllPosts()

	/* Takes a category (an attribute of the Post Schema) and a searchData (the data 
    related to that attribute) and will resolve with a JSON document containing all results */
	searchPosts(searchCategory, searchData) {
		return new Promise((resolve, reject) => {
			
			//setting query key dynamically
			const key = searchCategory;
			const value = searchData;
			const query = {};
			query[key] = value;
			Post.find(query)
				.populate({path: 'users', select: 'username'})
				.populate('replies')
				.then((posts) => {
					if(posts){
						if(posts.length === 0) {
							reject('No matching posts');
						}

						resolve(posts);
					}
					else {
						reject('No matching posts');
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	} //!getAllPosts()
}