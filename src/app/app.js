const morgan = require('morgan'),
      express = require('express'),
      app = express();

app.use( express.urlencoded({extended: true}) );
app.use( express.json() );
app.use( morgan('dev') );

app.set('PORT', 3003);

module.exports = app;
