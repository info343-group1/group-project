angular.module('app', 
	['HomeCtrl',
	'EventsCtrl',
    'ProfileCtrl',
	'ui.router',
	'ui.materialize',
	'appRoutes',
	'firebase',
    'EventService',
    'LoginService',
    'UtilService',
    'LeafletService',
    'LocationService']
)
.controller('MainCtrl', function($scope, Login, LocationService) {
	$scope.loggedIn = Login.authObj.$getAuth() != null;

	$scope.init = function() {
		// Get user's location
		LocationService.getUserLocation(function(position) {
			console.log(position);
		});
	}

	$scope.login = function() {
		Login.popup('signIn');
	}

	$scope.logOut = function() {
		Login.logOut();
		$scope.loggedIn = false;
	}
});