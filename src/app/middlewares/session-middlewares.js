const middleware = {
    auth: (req, res, next) => {
        if (req.session
        && req.session.user == "jose"
        && req.session.secret == "1234"
        && req.session.admin)
            return next()
        else {
            res.send(`
            <script>
                alert("You aren't autheticated!!");
                window.location.href = "/session";
            </script>`).redirect('/session')
        }
    }
}

module.exports = middleware;
