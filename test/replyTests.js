const assert = require('assert');
const Reply = require('../Schema/Reply');
const Post = require('../Schema/Post');
const accountFunctions = require('../modules/account');
const replyFunctions = require('../modules/reply');

describe('Testing Reply Functionality', () => {

    let replyID = '';

    it('adds a reply', (done) => {

        Post.findOne({title: 'testTitle'})
            .then(post => {
                accountFunctions.login('dux', 'password')
                    .then(token => {
                        const replyData = {
                            content: 'testContent',
                            url: 'testUrl'
                        }
                        replyFunctions.addReply('Bearer ' + token, replyData, post._id)
                            .then((reply) => {
                                assert(reply.title === 'testTitle');
                                done();
                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));


    });
    it('gets all replies', (done) => {

        Post.findOne({title: 'testTitle'})
            .then((foundPost) => {
                replyFunctions.getReplies(foundPost._id)
                    .then((replies) => {
                        replyID = replies[0];
                        assert(replies.length === 1);
                        done();
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err));

    });
    it('votes on a reply', (done) => {

        replyFunctions.vote('up', replyID)
            .then(() => {

                Reply.findById(replyID)
                    .then((reply) => {
                        assert(reply.votes === 1);
                        done();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    });
});
