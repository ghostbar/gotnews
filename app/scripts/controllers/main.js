'use strict';

angular.module('newsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.news = {};
    $scope.sites = [
      'http://news.sky.com/feeds/rss/home.xml',
      'http://feeds.bbci.co.uk/news/rss.xml'
    ];

    $scope.getSites = function () {
      $scope.news = {};
      $scope.sites.forEach(function (item) {
        $http({
          method: 'GET',
          url: '/get.json',
          params: {
            site: item
          }
        }).success(function (data) {
          $scope.news[item] = data;
        });
      });
    };

    // getting sites just because we are loading
    $scope.getSites();

    $scope.removeSite = function (site) {
      $scope.sites.splice(
        $scope.sites.indexOf(site),
        1
      );

      $scope.getSites();
    };

    $scope.addSite = function () {
      $scope.sites.push($scope.newSite);
      $scope.newSite = '';
      $scope.getSites();
    };

  });
