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
.controller('MainCtrl', function($scope, Login) {
	$scope.loggedIn = Login.authObj.$getAuth() != null;
	console.log(Login.authObj);
	console.log(Login.authObj.$getAuth());

	$scope.signInPopup = function() {
		Login.popup('signIn');
	}

	$scope.signUpPopup = function() {
		Login.popup('signUp');
	}

	$scope.logOut = function() {
		Login.logOut();
		$scope.loggedIn = false;
	}

})
;