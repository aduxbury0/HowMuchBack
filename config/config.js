module.exports = {

    env: process.env.NODE_ENV || 'development',
    URL: process.env.BASE_URL || 'http://localhost:5000',
    port: process.env.PORT || 5000,
    mongoDBURI: process.env.MONGODB_URI || 'mongodb://alex:duxbury1@ds259463.mlab.com:59463/apidevelopmentbackend',
    JWT_SECRET: process.env.JWT_SECRET || '4]V*6%!RMzTL;yikezj)(7H27j_P8F;wv!Jbd"p&Cn(/p[hE"2kc7+xh`@!r,M/Ww@b1`j3UrAR^RL7Hv-Wpz:@D@ro[ro9quV/Yq$UYzUJ:Et}3x)<#IX(~g>S`ev'
    
}