angular.module('appRoutes', []).config(function($stateProvider, $urlRouteProvider) {
	$urlRouteProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl:'./views/main.html',
			controller:'MainCtrl'
		})
		.state('events', {
			url:'/events',
			templateUrl:'./views/events.html',
			controller:'EventsCtrl'
		});
});