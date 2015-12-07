angular.module('UtilService', []).service('Util', [function() {
	var util = {};

	util.firebaseRef = new Firebase("https://info343-group1.firebaseio.com/");

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