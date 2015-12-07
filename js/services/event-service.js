angular.module('EventService', []).service('Event', ['$firebaseObject', '$firebaseArray', 'Util', function($firebaseObject, $firebaseArray, Util) {
	var data = {};

	var eventRef = Util.firebaseRef.child('events');
	data.events = $firebaseArray(eventRef);

	/**
	 * Saves given event as an event in the database
	 * 
	 * @param {Object} eventData object to be saved as an event
	 * 				   in the database.
	 */
	data.addEvent = function(eventData) {
		data.events.$add(eventData);
	}

	/**
	 * Adds the given comment to the given event and saves
	 * to the database
	 * 
	 * @param {Object} event to be commented
	 * @param {Object} comment data
	 */
	data.addComment = function(eventData, commentData) {
		eventData.comments.push(commentData);
		eventData.$save(eventData);
	}

	return data;
}]);