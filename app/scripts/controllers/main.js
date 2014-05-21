'use strict';

angular.module('newsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.sites = [
      'http://news.sky.com/feeds/rss/home.xml',
      'http://feeds.bbci.co.uk/news/rss.xml'
    ];

    $scope.sites.forEach(function (item) {
      $http({
        method: 'GET',
        url: '/get.json',
        params: {
          site: item
        }
      }).success(function (data, status) {
        console.log(data);
        console.log(status);
      });
    });
  });
