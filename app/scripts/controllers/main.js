'use strict';

/**
 * @ngdoc function
 * @name testAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testAppApp
 */




angular.module('testAppApp')
  .controller('MainCtrl',['gitService','$q','$http','NgTableParams', function (gitService,$q,$http,NgTableParams) {
    var main = this;
    main.dispName = "repos/vmg/redcarpet";
    main.openIssues = {};
    /*main.gridOptions1 = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      columnDefs: [
        {name: 'title'},
        { name: 'created_at' },
        { name: 'comments' },
        { name: 'updated_at' },
        { name: 'labels' }
      ]
    };*/
    main.init = function () {
      main.repoName = "https://api.github.com/" + main.dispName;
      if(main.dispName){
        $q.all([gitService.latestOpenIssueCreated(main.repoName),gitService.openIssuesCount(main.repoName),
          gitService.oldestOpenIssueCreated(main.repoName),gitService.avgAge(main.repoName)])
          .then(function(results){
            main.showTable = true;
            main.openIssues.latestOpenIssueCreated = new Date(results[0]).toDateString();
            main.openIssues.openIssuesCount = results[1];
            main.openIssues.oldestOpenIssueCreated = new Date(results[2]).toDateString();
            main.openIssues.avgAgeOfIssues = results[3].avgAge;
            main.openIssues.openIssue = results[3].openIssues;
            var data = results[3].openIssues;
            main.tableParams = new NgTableParams({
              page: 1,
              count: 10
            }, { dataset: data});
          },function(error){
            main.showTable = false;
            main.openIssues.latestOpenIssueCreated = "NA";
            main.openIssues.openIssuesCount = "NA";
            main.openIssues.oldestOpenIssueCreated = "NA";
            main.openIssues.avgAgeOfIssues = "NA";
            main.openIssues.openIssue = [];
            main.tableParams = new NgTableParams({},{});
            alert("Please enter public repo e.g. repos/twbs/bootstrap , repos/vmg/redcarpet etc");
            console.log(error);
          });
      }else{
        alert("Please enter repo name");
      }
    };
  }]);
