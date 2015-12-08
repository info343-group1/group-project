angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
	$scope.userId = Login.userId;
	if (!$scope.userId) {
		Login.popup();
	};
	
	if ($scope.userId) {
		var provider = Login.authObj.$getAuth()["provider"];
		$scope.currentUser = Login.authObj.$getAuth()[provider];
		$scope.image = "https://upload.wikimedia.org/wikipedia/commons/7/77/SpaceNeedleTopClose.jpg";

		if (Login.authObj.$getAuth()[provider].profileImageURL != null) {
			$scope.image = Login.authObj.$getAuth()[provider].profileImageURL;
		}
	}
	
});