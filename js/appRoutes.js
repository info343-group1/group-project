angular.module('appRoutes', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl:'./views/home.html',
			controller:'MainCtrl'
		})
		.state('events', {
			url:'/events',
			templateUrl:'./views/events.html',
			controller:'EventsCtrl'
		})
		.state('profile',{
			url:'/profile',
			templateUrl:'./views/profile.html',
			controller:'ProfileCtrl'
		});
	$(".button-collapse").sideNav();
});