angular.module('FullEventsCtrl', []).controller('FullEventsCtrl', function($scope, Event) {
	var index = 1;
	$scope.currEvent = Event.events[index];
}