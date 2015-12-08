angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, Leaflet, Event, PageData) {
    $scope.init = function() {
        Event.events.$loaded(function() {
			$scope.drawMap();
		});
    }

    $scope.drawMap = function() {
    	Leaflet.drawMap();
    }
});
