'use strict';

var request = require('request');
var FeedParser = require('feedparser');

function rss (url, max, callback) {
  var parser = new FeedParser();
  var c = 0;
  if (max == null)
    max = 10;

  var res = {
    meta: {},
    articles: []
  };

  var req = request({
    method: 'GET',
    uri: url
  });

  req.on('response', function (response) {
    var stream = this;

    if (response.statusCode != 200) 
      return this.emit('error', new Error('Bad status code'));

    stream.pipe(parser);
  });

  req.on('error', function (err) {
    console.log(err);
  });

  parser.on('error', function (err) {
    console.log(err);
  });

  parser.on('readable', function () {
    var stream = this;
    res.meta = this.meta;
    var item;

    while (item = stream.read()) {
      c++;
      if (c <= max)
        res.articles.push(item);
    }

    if (c === max)
      return callback(null, res);

  });

}

/**
 * How to use it:
 *
 * ```javascript
 * var rss = require('/the/path/to/this/file');
 *
 * rss('http://news.sky.com/feeds/rss/home.xml', null, function (err, res) {
 *   console.log('we were called');
 *   console.log(err);
 *   console.log(res);
 * });
 * ```
 */

module.exports = rss;
