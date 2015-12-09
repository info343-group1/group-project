angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util, Event) {
	$scope.ready = false;
	$scope.loggedIn = false;

	Login.loggedIn({
		yes: function() {
			$scope.ready = true;
			$scope.loggedIn = true;
			var provider = Login.user.auth["provider"];
			$scope.currentUser = Login.user;
			$scope.image = "https://upload.wikimedia.org/wikipedia/commons/7/77/SpaceNeedleTopClose.jpg";
			Event.getOwnedEvents();
			$scope.ownedEvents = Event.owned;
			Event.getAttendingEvents();
			$scope.attendingEvents = Event.attending;

			if (Login.user.auth[provider].profileImageURL != null) {
				$scope.image = Login.user.auth[provider].profileImageURL;
			}
		}, no: function() {
			$scope.ready = true;
			$scope.loggedIn = false;
			Login.popup();
		}
	});
});