angular.module('LeafletService', []).service('Leaflet', ['$firebaseObject', '$firebaseArray', 'Util', "LocationService", "Event", function($firebaseObject, $firebaseArray, Util, LocationService, Event) {
    var leafletService = {};
    var map;
    leafletService.drawMap = function() {
        map = L.map('map').setView([38.617, -92.284], 4);
        var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
        layer.addTo(map);
        leafletService.customMap(Event.events);
    }

    leafletService.customMap = function(data) {
    	var events = new L.LayerGroup([]);
    	var options = {fillColor: "#c62104", color: "#c62104", fillOpacity: ".5"};
    	data.map(function(item) {
			LocationService.getLatLong(item.address, function(res) {
				res = res.results[0].geometry.location;
				var circle = new L.circleMarker([res.lat, res.lng], options);
				circle.setRadius(5);
				circle.addTo(events);
			});
	    		
    	});
    	events.addTo(map);
    }

    return leafletService;
}]);