'use strict';
const
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  app = express(),
  mainRoutes = require('./routes'),
  cardRoutes = require('./routes/cards');

app
  .set('port', process.env.PORT || 3000)
  .set('view engine', 'pug')
  
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use('/static', express.static(__dirname+'/public'))
  
  .use('/', mainRoutes)
  .use('/cards', cardRoutes)
  
  // catch 404 error
  .use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  })
  // handle errors
  .use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
  }) 
  
  .listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'));
  });