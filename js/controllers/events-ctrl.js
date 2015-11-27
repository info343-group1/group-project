angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope) {
	$scope.results = false;
	$scope.searchQuery=function(){
		$scope.results = !$scope.results;
	};

});
