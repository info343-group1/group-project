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
    'TextService',
    'LocationService',
    'FullEventCtrl']
)
.controller('MainCtrl', function($scope, Login) {
	$scope.loggedIn = false;

	// Thinks Location is not defined

	// $scope.init = function() {
	// 	// Get user's location
	// 	LocationService.getUserLocation(function(position) {
	// 		console.log(position);
	// 	});
	// }

	Login.loggedIn({
		yes: function() {
			$scope.loggedIn = true;
			$scope.$apply();
		}, no: function() {
			$scope.loggedIn = false;
		}
	});
	
	$scope.login = function() {
		Login.popup();
	}

	$scope.logOut = function() {
		Login.logOut();
	}
});