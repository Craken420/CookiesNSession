const morgan = require('morgan'),
      express = require('express'),
      cookieParser = require('cookie-parser')
      app = express();

const middleware = require('./middlewares/middlewares');

app.use( express.urlencoded({extended: true}) );
app.use( express.json() );
app.use( morgan('dev') );
app.use(cookieParser('secret'))

app.set('PORT', 3003);

app.use('/cookie', require('./routes/cookie-routes'))
app.use(middleware.onRequest);

module.exports = app;
