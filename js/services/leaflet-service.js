angular.module('LeafletService', []).service('Leaflet', ['$firebaseObject', '$firebaseArray', 'Util', "LocationService", "Event", function($firebaseObject, $firebaseArray, Util, LocationService, Event) {
    var leafletService = {};
    var events;
    var view = {coordinates: [38.617, -92.284], zoom: 4 }
    leafletService.drawMap = function() {
        LocationService.getUserLocation(function(pos) {
            if (leafletService.map) {
                leafletService.map.remove();
            }
            if (pos != null) {
                view = {coordinates: [pos.coords.latitude, pos.coords.longitude], zoom: 8};
            } 
            leafletService.map = L.map('map').setView(view.coordinates, view.zoom);
            var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
            layer.addTo(leafletService.map);
            leafletService.customMap(Event.events); 
        })   
    }

    leafletService.customMap = function(data) {
    	events = new L.LayerGroup([]);
    	var options = {fillColor: "#00007f", color: "#00007f", fillOpacity: ".8"};
    	var markIcon = L.icon({
	       iconUrl: './assets/icons/pin65.svg',
	       iconSize: [20, 40]
    	});
    	data.map(function(item) {
			LocationService.getLatLong(item.address, function(res) {
				res = res.results[0].geometry.location;
				var marker = new L.marker([res.lat, res.lng], {icon: markIcon});
				marker.addTo(events);
                var route = "&id=" + item.$id;
				marker.bindPopup("<a href='#/event/" + route + "'><b>" + item.name +"</b></a><br>" + item.address + "<br>" + item.description);
			});
	    		
    	});
    	events.addTo(leafletService.map);
    }

    leafletService.customFilter = function(term) {
        var newEvents = [];
        term = term.toLowerCase();
        Event.events.forEach(function(item) {
            for(var index in item) {
                if (index != "$id" && index != "$priority" && index != "description") {
                    var compareTo = "" + item[index];
                    compareTo = compareTo.toLowerCase()
                    if (compareTo.indexOf(term) != -1) {
                        newEvents.push(item);
                        break;
                    } 
                }
            }
        });
        leafletService.map.removeLayer(events);
        if (term === '' || !term) {
            leafletService.customMap(Event.events);
        } else {
            leafletService.customMap(newEvents);
        }
    }

    return leafletService;
}]);