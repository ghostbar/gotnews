'use strict';

var request = require('request');
var FeedParser = require('feedparser');
var parser = new FeedParser();

function rss (url, max, callback) {
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
  }).pipe(parser);

  req.on('error', function (err) {
    return callback(err);
  });

  parser.on('error', function (err) {
    return callback(err);
  });

  parser.on('readable', function () {
    var stream = this;
    res.meta = this.meta;
    var item;

    while (item = stream.read()) {
      c++;
      res.articles.push(item);
    }

    if (c === max)
      return callback(null, res);
  });

  parser.on('end', function () {
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
