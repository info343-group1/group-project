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
    'LocationService']
)
.controller('MainCtrl', function($scope, Login) {
	$scope.loggedIn = Login.authObj.$getAuth() != null;
	console.log(Login.authObj);
	console.log(Login.authObj.$getAuth());

	$scope.login = function() {
		Login.popup();
	}

	$scope.logOut = function() {
		Login.logOut();
	}
});