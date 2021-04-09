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
    getAllCookies: (req, res) =>
        res.send({'Cookies':req.cookies, 'Signed Cookies': req.signedCookies})
}

module.exports = controllers;
