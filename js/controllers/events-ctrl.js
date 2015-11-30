angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope, Event) {
	$scope.results = false;
	$scope.events = Event.events;

	$scope.init = function() {
		console.log($scope.events);
	}

	$scope.searchQuery = function() {
		$scope.results = !$scope.results;
	};
});
