const cookie = require('cookie'), // Analizador de cookies
    escapeHTML = require('escape-html'), // Escapar para hacer binding
    url = require('url');

const controllers = {
    setCookie: (req, res) => {
        res.cookie('cookie_name', 'cookie_value',
            {expire : new Date() + 9999}) // definir una nueva cookie
            .redirect('/cookie');
    },
    setSignCookie: (req, res) => {
        let cookieVal = 'sing-cookie_value';
        res.cookie('sign-cookie_name', cookieVal, // definir una nueva cookie
            { signed: true, expire : new Date() + 9999 }) // firmar y agregar expiracion
            .redirect('/cookie');
    },
    signCookieWithParam: (req, res) => {
        let {name, val} =
            url.parse(req.url, true, true).query; // Extraer parametros
        res.cookie(String(name), String(val), { signed: true } ) // Crear y firmar cookie
        .redirect('/cookie');
    },
    clearCookieByName: (req, res) => {
        let query = url.parse(req.url, true, true).query;
        res.clearCookie( String(query.name) ) // Eliminar
            .redirect('/cookie');
    },
    clearAllCookies: (req, res) => {
        Object.getOwnPropertyNames(req.cookies)
            .concat(Object.getOwnPropertyNames(req.signedCookies))
            .forEach(cookieName => {
                res.clearCookie(cookieName); // Eliminar
            });
        res.redirect('/cookie');
    },
    getAllCookies: (req, res) => {
        res.send({'Cookies':req.cookies, 'Signed Cookies': req.signedCookies})
    },
    onRequest: (req, res) => {
        // Convertir a objeto la cadena url
        let query = url.parse(req.url, true, true).query;
        console.log('req.url: ', req.url, '\nurl.parse: ', url.parse(req.url, true, true) );

        if (query && query.name) {
            /* Enviar la nueva cookie
            *  String(query.name): Angelo; cokie.seriaze: name=Angelo */
            res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name)), {
                httpOnly: true,
                maxAge: 3 //60 * 60 * 60 * 24 * 7 // 1 semana en segundos
            })

            // Redireccionar despues de enviar la cookie
            res.statusCode = 302;
            res.setHeader('Location', req.headers.refer || '/cookie/request');
            res.end();
            return;
        }

        /*
        * Obtener la cookie del request form y convertirla en objeto.
        * Ejemplo: req.headers.cookie: name=Angelo; PARSE cookies:  { name: 'Angelo' }
        */
        const cookies = cookie.parse(req.headers.cookie || '')

        // Obtener el nombre del visitante enviado al cookie
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

module.exports = controllers;
