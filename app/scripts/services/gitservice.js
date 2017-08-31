'use strict';

/**
 * @ngdoc service
 * @name testAppApp.gitService
 * @description
 * # gitService
 * Service in the testAppApp.
 */
angular.module('testAppApp')
  .service('gitService',['$http', function ($http) {

    var service = this;
    service.openIssuesCount = function (repoName) {
      return $http.get(repoName)
        .then(function(response){
          return response.data.open_issues_count;
      });
    };

    service.latestOpenIssueCreated = function (repoName) {
      return $http.get(repoName+'/issues?state=open&sort')
        .then(function(response){
          console.log(response.data[0].created_at);
          return response.data[0].created_at;
        });
    };

    service.oldestOpenIssueCreated = function (repoName) {
      return $http.get(repoName+'/issues?state=open&sort&direction=asc')
        .then(function(response){
          console.log(response.data[0].created_at);
          return response.data[0].created_at;
        });
    };

    service.avgAge = function (repoName) {
      return $http.get(repoName+'/issues?state=open&page=1&per_page=100')
        .then(function(response){
          var oneDay = 24*60*60*1000;
          var currentDate = new Date();
          var createdDate;
          var diffDays = 0;
          for(var index in response.data){
            createdDate = new Date(response.data[index].created_at);
            diffDays+= Math.round(Math.abs((createdDate.getTime() - currentDate.getTime())/oneDay));
          }
          var avgAge = Math.round(diffDays/response.data.length);
          return {'openIssues':response.data,'avgAge':avgAge};
        });
    };
  }]);
