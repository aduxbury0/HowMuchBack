const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(function(done) {
	this.timeout(10000); //so that a remote db connection doesnt cause the test to timeout
    
	//use if no local mongodb installed
	//mongoose.connect('mongodb://alex:Password1@ds141783.mlab.com:41783/student-cvs-testing')
	mongoose.connect('mongodb://localhost:27017/how-much-test')
		.then(() => {
			done();
		})
		.catch(err => {
			console.log(err)
			done();
		});
});

after((done) => {
	mongoose.disconnect(done());
})