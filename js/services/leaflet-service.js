angular.module('LeafletService', []).service('Leaflet', ['$firebaseObject', '$firebaseArray', 'Util', function($firebaseObject, $firebaseArray, Util) {
    var leafletService = {};
    var map;
    leafletService.drawMap = function() {
        map = L.map('map').setView([38.617, -92.284], 4)
        var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
        layer.addTo(map)
    }

    return leafletService;
}]);