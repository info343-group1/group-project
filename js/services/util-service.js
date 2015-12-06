angular.module('UtilService', []).service('Util', [function() {
	var util = {};

	util.firebaseRef = new Firebase("https://info343-group1.firebaseio.com/");

	util.toGoogleSearchString = function(address) {
		return "";
	}

	return util;
}]);