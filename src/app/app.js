const morgan = require('morgan'),
      express = require('express'),
      app = express();

const middleware = require('./middlewares/middlewares');

app.use( express.urlencoded({extended: true}) );
app.use( express.json() );
app.use( morgan('dev') );

app.set('PORT', 3003);

app.use(middleware.onRequest);

module.exports = app;
