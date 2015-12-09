angular.module('FullEventCtrl', []).controller('FullEventCtrl', function($scope, Event, $location) {
	$scope.events = Event.events;
	// $scope.currEvent = $scope.events[];
	$scope.events.$loaded(function() {
		var url = $location.$$path;
		console.log(url);
		var splitUrl = url.trim().split('&id=');
		var id = splitUrl[splitUrl.length - 1];
		console.log(splitUrl);
		$scope.currEvent = $scope.events.$getRecord(id);
	});
});