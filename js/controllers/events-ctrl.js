angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope) {
	$scope.results = true;
	$scope.searchQuery = function() {
		$scope.results = !$scope.results;
	};
});
