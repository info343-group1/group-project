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
    'UtilService']
)
.controller('MainCtrl', function($scope) {
	// $scope.user = false;
	// console.log(login.authObj);

})
;