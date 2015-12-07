angular.module('LocationService', []).service('LocationService', ['$http', 'Util', function($http, Util) {
	var service = {};

	var gmapsKey = 'AIzaSyAIh_YwZhxDikDlI5-T8fUYbSQ8n2rJzyU';
	var searchURL = 'https://maps.googleapis.com/maps/api/geocode/json?key='+ gmapsKey + '&address=';

	service.getLatLong = function(address) {
		var searchString = Util.toGoogleSearchString(address);
		$http.get(searchURL + searchString).success(function(res) {
			console.log(res);
		});
	}

	service.getUserLocation = function(callback) {
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		    	callback(position);
		    });
		}
	}

	return service
}]);