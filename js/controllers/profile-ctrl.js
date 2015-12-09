angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util) {
	$scope.loggedIn = false;


	// ALEX Please convert this in to the new format

	// // default firebase images are too small
	// var firebaseImg = "https://secure.gravatar.com/avatar/"

	// if (Login.authObj.$getAuth()[provider].profileImageURL != null && Login.authObj.$getAuth()[provider].profileImageURL.indexOf(firebaseImg) == -1) {
	// 	$scope.image = Login.authObj.$getAuth()[provider].profileImageURL;
	// }

	Login.loggedIn({
		yes: function() {
			$scope.loggedIn = true;
			console.log(Login.user);
			var provider = Login.user.auth["provider"];
			$scope.currentUser = Login.user;
			$scope.image = "https://upload.wikimedia.org/wikipedia/commons/7/77/SpaceNeedleTopClose.jpg";

			if (Login.user.auth[provider].profileImageURL != null) {
				$scope.image = Login.user.auth[provider].profileImageURL;
			}
		}, no: function() {
			$scope.loggedIn = false;
			Login.popup();
		}
	});
});