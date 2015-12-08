angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
	$scope.loggedIn = false;

	Login.loggedIn({
		yes: function() {
			$scope.loggedIn = true;
			console.log(Login.user);
			var provider = Login.authObj.$getAuth()["provider"];
			$scope.currentUser = Login.authObj.$getAuth()[provider];
			$scope.image = "https://upload.wikimedia.org/wikipedia/commons/7/77/SpaceNeedleTopClose.jpg";

			if (Login.authObj.$getAuth()[provider].profileImageURL != null) {
				$scope.image = Login.authObj.$getAuth()[provider].profileImageURL;
			}
		}, no: function() {
			$scope.loggedIn = false;
			Login.popup();
		}
	});
});