module.exports = {

    env: process.env.NODE_ENV || 'development',
    URL: process.env.BASE_URL || 'http://localhost:5000',
    port: process.env.PORT || 5000,
    mongoDBURI: process.env.MONGODB_URI || 'mongodb://alex:duxbury1@ds259463.mlab.com:59463/apidevelopmentbackend'


}