const assert = require('assert');
const Post = require('../Schema/Post');
const postFunctions = require('../modules/posts');
const accountFunctions = require('../modules/account');

describe('Testing Post Functionality', () => {

    it('adds a post', (done) => {

        accountFunctions.registerAccount('dux', 'password')
            .then(() => {
                accountFunctions.login('dux', 'password')
                    .then(token => {
                        const bearer = 'Bearer ' + token;
                        postFunctions.addPost(bearer, {
                            title: 'testTitle', 
                            description: 'TestDesc', 
                            quantity: 5, 
                            condition: 'USED', 
                            brand: 'BrantTest', 
                            model: 'ModelTest', 
                            madeIn: 'TestMade'
                        })
                            .then((post) => {
                                assert(post.title === 'testTitle');
                                done();
                            })
                    })
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));


    });
    it('gets all posts', (done) => {

        postFunctions.getAllPosts()
            .then((posts) => {
                assert(posts.length === 1);
                done();
            })
            .catch(err => console.log(err));
    });
    it('gets a single post', (done) => {
        postFunctions.getAllPosts()
        .then((posts) => {
            const postId = posts[0]._id.toString();
            postFunctions.getPost({id: postId})
                .then((post) => {
                    assert(post.title === 'testTitle');
                    done();
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    });
    it('searches posts', (done) => {
        
        postFunctions.searchPosts('title', 'testTitle')
            .then(posts => {
                assert(posts[0].title === 'testTitle');
                done();
            })
            .catch(err => console.log(err));
    });
});