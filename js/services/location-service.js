angular.module('LocationService', []).service('LocationService', ['$http', 'Util', function($http, Util) {
	var service = {};

	var gmapsKey = 'AIzaSyAIh_YwZhxDikDlI5-T8fUYbSQ8n2rJzyU';
	var searchURL = 'https://maps.googleapis.com/maps/api/geocode/json?key='+ gmapsKey + '&address=';

	/**
	 * Takes an address search string and calls a passed function with the latitude and
	 * longitude of the given address passed as a parameter
	 * 
	 * @param  {String} Address search string
	 * @param  {Function} Function to be executed with the search response
	 * 					  as a parameter
	 */
	service.getLatLong = function(address, callback) {
		var searchString = Util.toGoogleSearchString(address);
		$http.get(searchURL + searchString).success(function(res) {
			callback(res);
		});
	}

	/**
	 * Requests the user's current location from the browser and executes a callback with that
	 * position passed as a parameter
	 * 
	 * @param  {Function} callback to be run after position is retrieved. Has
	 * 					  a position paramater containing the user's position
	 */
	service.getUserLocation = function(callback) {
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		    	callback(position);
		    }, function(error) {
		    	callback(null);
		    });
		}
	}

	return service
}]);