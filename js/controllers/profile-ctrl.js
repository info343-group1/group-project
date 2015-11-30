angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
    $scope.userId = Login.userId;
    $scope.users = Login.users;
    $scope.init = function() {
        console.log($scope.users);
    }
});