angular.module('EventService', []).service('Event', ['$firebaseObject', '$firebaseArray', 'Util', function($firebaseArray, $firebaseObject, Util) {
	var data = {};

	var eventRef = Util.firebaseRef.child('events');
	data.events = $firebaseArray(eventRef);

	data.addEvent = function() {

	}

	data.addComment = function(event) {

	}

	return data;
}]);