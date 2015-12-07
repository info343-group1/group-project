angular.module('UtilService', []).service('Util', [function() {
	var util = {};

	// Reference to the firebase database
	util.firebaseRef = new Firebase("https://info343-group1.firebaseio.com/");

	/**
	 * Takes a string and converts it to a searchable string to use in
	 * a REST call. Compliant with Google API standards. Replaces all
	 * spaces with '+' characters
	 * 
	 * @param  {string to be converted}
	 * @return {converted search string}
	 */
	util.toGoogleSearchString = function(address) {
		var searchArr = address.trim().split(/\s+/);
		var urlString = "";
		for (var i = 0; i < searchArr.length; i++) {
			var next = searchArr[i];
			if (i > 0) {
		 		next = '+' + next;
			}
			urlString += next;
		}
		return urlString;
	}

	return util;
}]);