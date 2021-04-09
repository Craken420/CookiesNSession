const meaddleware = require('../middlewares/session-middlewares');

const session = require('express-session'),
      FileStore = require('session-file-store')(session), // Crea el archivo de sesion
      cookie = require('cookie'), // Analizador de cookies
      router = require('express').Router();
    
var cookiedata = { 
    domain         : 'localhost',
    originalMaxAge : null,
    httpOnly       : true,
    path           : '/session'
};

var fileStoreOptions = {};
const sessOpc = {
    name: 'session-id',
    secret:'123456xxx',
    saveUninitialized: false,
    resave: false,
    cookie: cookiedata,
    // key: 'express.session-id',
    // store: new FileStore(fileStoreOptions)
}

if (router.get('env') === 'production') {
    router.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies 'cause it won't be set by client
}

router.use( session(sessOpc) );

module.exports = router;
