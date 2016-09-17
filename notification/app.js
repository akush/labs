var compression = require('compression');
var express = require('express');
var path = require('path');

var app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 86400000,
  setHeaders: function(res, path) {
    res.setHeader("Expires", new Date(Date.now() + 86400000).toUTCString());
  }
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;