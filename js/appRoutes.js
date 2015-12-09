angular.module('appRoutes', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl:'./views/home.html',
			controller:'HomeCtrl'
		})
		.state('events', {
			url:'/events',
			templateUrl:'./views/events.html',
			controller:'EventsCtrl',
			abstract:true
		})
		.state('events.tile-view', {
			templateUrl:'./views/event-tiles.html'
		})
		.state('events.map-view', {
			url:'',
			templateUrl:'./views/event-map.html'
		})
		.state('profile',{
			url:'/profile',
			templateUrl:'./views/profile.html',
			controller:'ProfileCtrl'
		})
		.state('event', {
			url:'/event/:id',
			templateUrl: './views/full-event.html',
			controller: 'FullEventCtrl'
		});
	$(".button-collapse").sideNav();
});