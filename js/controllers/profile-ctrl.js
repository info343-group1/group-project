angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
	// $scope.userId = Login.userId;
	$scope.currentUser = Login.users["randomNumebrAlex"];

	// keep this until a sign in function is working
	$scope.userId = Login.users["randomNumebrAlex"];
});