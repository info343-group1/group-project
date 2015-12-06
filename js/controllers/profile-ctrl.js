angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
	$scope.userId = Login.userId;
	// loop through users to find the user that is logged in b/c userId != the hash firebase stores
	Login.users.forEach(function(user) {
		if (user.userId == $scope.userId) {
			$scope.currentUser = user;
		}
	});
});