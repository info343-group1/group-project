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
    'LeafletService']
).controller('MainCtrl', function($scope, Login) {
	$scope.user = false;
	console.log(Login.authObj);
});