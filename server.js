'use strict';

var express = require('express');
var modRw = require('connect-modrewrite');
var rss = require('./feed-parser.js');
var async = require('async');
var app = express();

console.log(app.settings.env);

app.use(modRw([
  '!png|jpg|jpeg|gif|css|js|html|ttf|pdf|svg|webp$ /index.html [L]'
]));

app.use('/styles', express['static'](__dirname + '/.tmp/styles'));
app.use('/scripts', express['static'](__dirname + '/.tmp/scripts'));
app.use(express['static'](__dirname + '/app'));

if (app.settings.env === 'staging') {
  app.use(express['static'](__dirname + '/dist'));
}

app.route('/get.json').get(function (req, res) {
  rss(req.query.site, 10, function (err, response) {
    // `res.articles` is an array of Objects returned by rss
    res.json(response);
  });
});

module.exports = app;

/*
exports.startServer = function(port, path, callback) {
  var p = process.env.PORT || port;

  console.log('Starting server on port: ' + p + ', path /' + path);

  app.listen(p);

  // If there's a callback then give them a return!
  if (callback != null) {
    return callback(app);
  }
};

// If `PORT` is sent, then it will auto-start the server.
if (process.env.PORT) {
  this.startServer(process.env.PORT, 'dist');
}
*/
