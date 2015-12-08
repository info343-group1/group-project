angular.module('LeafletService', []).service('Leaflet', ['$firebaseObject', '$firebaseArray', 'Util', "LocationService", "Event", function($firebaseObject, $firebaseArray, Util, LocationService, Event) {
    var leafletService = {};
    
    var view = {coordinates: [38.617, -92.284], zoom: 4 }
    leafletService.drawMap = function() {
        
        LocationService.getUserLocation(function(pos) {
            if (leafletService.map) {
                leafletService.map.remove();
            }
            if (pos != null) {
                view = {coordinates: [pos.coords.latitude, pos.coords.longitude], zoom: 8}
            } 
            leafletService.map = L.map('map').setView(view.coordinates, view.zoom);
            var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
            layer.addTo(leafletService.map);
            leafletService.customMap(Event.events); 
        })   
    }

    leafletService.customMap = function(data) {
    	var events = new L.LayerGroup([]);
    	var options = {fillColor: "#00007f", color: "#00007f", fillOpacity: ".8"};
    	data.map(function(item) {
			LocationService.getLatLong(item.address, function(res) {
				res = res.results[0].geometry.location;
				var circle = new L.circleMarker([res.lat, res.lng], options);
				circle.setRadius(5);
				circle.addTo(events);
				circle.bindPopup("<b>" + item.name +"</b><br>" + item.address + "<br>" + item.description);
			});
	    		
    	});
    	events.addTo(leafletService.map);
    }

    return leafletService;
}]);