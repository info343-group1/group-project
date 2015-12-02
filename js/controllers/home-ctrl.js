angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, Leaflet) {
    $scope.init = function() {
        Leaflet.drawMap();
    }
});
