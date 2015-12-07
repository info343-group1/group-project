angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, Leaflet) {
    $scope.init = function() {
        
    }

    $scope.drawMap = function() {
    	Leaflet.drawMap();
    }
});
