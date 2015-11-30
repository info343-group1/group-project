angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
    $scope.userId = Login.userId;
});