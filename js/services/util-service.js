angular.module('UtilService', []).service('Util', [function() {
	var data = {};

	data.firebaseRef = new Firebase("https://info343-group1.firebaseio.com/");

	return data;
}]);