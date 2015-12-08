angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
	$scope.userId = Login.userId;
	if (!$scope.userId) {
		Login.popup();
	};
	
	if ($scope.userId) {
		var provider = Login.authObj.$getAuth()["provider"];
		$scope.currentUser = Login.authObj.$getAuth()[provider];
		$scope.image = "https://upload.wikimedia.org/wikipedia/commons/7/77/SpaceNeedleTopClose.jpg";

		// default firebase images are too small
		var firebaseImg = "https://secure.gravatar.com/avatar/"

		if (Login.authObj.$getAuth()[provider].profileImageURL != null && Login.authObj.$getAuth()[provider].profileImageURL.indexOf(firebaseImg) == -1) {
			$scope.image = Login.authObj.$getAuth()[provider].profileImageURL;
		}
	}
	
});