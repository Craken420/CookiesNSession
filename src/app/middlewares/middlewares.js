const cookie = require('cookie'), // Analizador de cookies
    escapeHTML = require('escape-html'), // Escapar para hacer binding
    url = require('url');

const middleware = {
      onRequest: function (req, res) {

        // Parse the query string
        let query = url.parse(req.url, true, true).query;
    
        console.log('req.url: ', req.url, '\nurl.parse: ', url.parse(req.url, true, true) );

        if (query && query.name) {

            /* Set a new cookie with the name
            *  String(query.name): Angelo; cokie.seriaze: name=Angelo */
            res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name)), {
                httpOnly: true,
                maxAge: 3 //60 * 60 * 60 * 24 * 7 // 1 week in seconds
            })

            // Redirect back after setting cookie
            res.statusCode = 302;

            res.setHeader('Location', req.headers.refer || '/');
            res.end();
            return;
        }

        /*
        * Obtener la cookie del request y convertirla en objeto.
        * Ejemplo: req.headers.cookie: name=Angelo; PARSE cookies:  { name: 'Angelo' }
        */
        const cookies = cookie.parse(req.headers.cookie || '')

        // Get the visitor name set in the cookie
        const name = cookies.name

        res.setHeader('Content-Type', 'text/html; charset=UTF-8')

        if (name)
            res.write('<p>Welcome back, <b>' + escapeHTML(name) + '</b>!</p>')
        else
            res.write('<p>Hello new visitor</p>')

        res.write('<form method="GET">');
        res.write('<input placeholder="enter your name" name="name">' +
            '<input type="submit" value="Set Name">')
        res.end('</form>')
    }
}

module.exports = middleware;
