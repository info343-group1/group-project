angular.module('ProfileCtrl', []).controller('ProfileCtrl', function($scope, Login, Util, Event) {
	$scope.ready = false;
	$scope.loggedIn = false;

	// there is a bug where the profile page must be refreshed before changes will apply
	Login.loggedIn({
		yes: function() {
			$scope.ready = true;
			$scope.loggedIn = true;
			var provider = Login.user.auth["provider"];
			$scope.currentUser = Login.user;
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