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

router.get('/', (req, res) => {
    // Parse the cookies on the request
    const cookies = cookie.parse(req.headers.cookie || '');
 
    // Get the visitor name set in the cookie
    const sessionid = cookies['session-id'];

    res.setHeader('Content-Type', 'text/html');
    res.write(`<h1>Welcome</h1>
        <p>Cookies: ${JSON.stringify(cookies)}</p>
        <p>Session: ${(req.session.user||'visitor')}</p>
        <p>Cookies.session-id:  ${(sessionid || 'undefined') }</p>`);

    if (req.session.views) {
        req.session.views++;
        res.write(`<p>Session Views: ${req.session.views}</p>`);
    } else
        req.session.views = 1;

    if (req.session.user)
        res.write(`<a href="/session/Content">Content</a><br/>
                   <a href="/session/logout">Logout</a>`);
    else {
        req.session.views = 1;
        res.write(`
            <form method="GET" action="/session/login">
                <input placeholder="enter your username" name="username">
                <input placeholder="enter your password" name="password">
                <input type="submit" value="Set session">
            </form>`);
    }
    res.end();
});

router.get('/login', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if (!req.query.username || !req.query.password) {
        res.send(`
            <script>
                alert("No data");
                window.location.href = "/session";
            </script>`);
    }
    else if (req.query.username == 'jose' && req.query.password == '1234') {
        req.session.user = "jose";
        req.session.secret = "1234";
        req.session.admin = true;
        res.send(`
            <script>
                alert("Autenticado");
                window.location.href = "/session";
            </script>`);
    }
    else {
        res.send(`
            <script>
                alert("Username or password failed");
                window.location.href = "/session";
            </script>`);
    }
    res.end();
})

module.exports = router;
