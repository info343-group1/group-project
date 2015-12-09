angular.module('FullEventCtrl', []).controller('FullEventCtrl', function($scope, Event) {
	$scope.index = 1;
	$scope.events = Event.events;
	$scope.currEvent = $scope.events[1];
});