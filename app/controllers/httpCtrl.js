'use strict';


myApp.controller('httpCtrl', function($scope, $http) {
    $scope.getAllData = function() {
        $scope.getData = [];
        $http.get("/notes").then(function(response) {
            $scope.getData = response.data;
        }).then(function(response) {});
    };
    $scope.getAllData();
    $scope.postId = function(text) {
        var data = {
            "body": text,
            "title": "title 555"
        }
        $http.post("/notes", data).then(function(response) {
            $scope.resFromPostData = response.data;
        });
    };
    $scope.deleteAll = function() {
        $http.delete("/notes").then(function(response) {
            $scope.resFromDeleteAll = response.data;
        });
    };
});