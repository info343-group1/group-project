angular.module('EventService', []).service('Event', ['$firebaseObject', '$firebaseArray', 'Util', 'LocationService', 'Login', function($firebaseObject, $firebaseArray, Util, LocationService, Login) {
	var data = {};

	var eventRef = Util.firebaseRef.child('events');
	data.events = $firebaseArray(eventRef);

	 $('.datepicker').pickadate({
	 		min: true,
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year
	    container: '#datepickerBox',
	    format: "mm/dd/yyyy",
	    formatSubmit: "mm/dd/yyyy",
	    format: "mm/dd/yyyy",
	    hiddenName: true
	  });

	/**
	 * Saves given event as an event in the database
	 * 
	 * @param {Object} eventData object to be saved as an event
	 * 				   in the database.
	 */
	data.addEvent = function(eventData) {
		data.events.$add(eventData).then(function(ref) {
			var id = ref.key();

			if (Login.user.eventsCreated) {
				Login.user.eventsCreated.push(id);
			} else {
				Login.user.eventsCreated = [id];
			}
			console.log(Login.user);
			Login.user.firebase.child('createdEvents').push(id);
		});
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

	data.attendEvent = function(e, isAttending, callback) {
		var attendingRef = eventRef.child(e.$id).child("usersAttending");
		var attending = $firebaseArray(attendingRef);
		attending.$loaded(function (ref) {
			console.log(isAttending);
			if (isAttending) {
				var times = 0;
				for (var userIndex in e["usersAttending"]) {
					console.log(e["usersAttending"][userIndex]);
					if (e["usersAttending"][userIndex].id == Login.user.userId) {
						attending.$remove(times).then(function(ref) {
							var id = ref.key();
						});
					}
					times++;
				}
			} else {
				console.log(Login.user);
				var uData = {
					name: Login.user.name,
					id: Login.user.userId
				}
				attending.$add(uData);
				// .then(function(ref) {
				// 	var id = ref.key();
				// });
				console.log(uData);

			}
			callback(data.isAttending(e));
		});
	}

	data.isAttending = function(e) {
		for (var index in e.usersAttending) {
			console.log(e.usersAttending[index]);
			if (e.usersAttending[index].id == Login.user.userId) {
				return true;
			}
		}
		return false;
	}

	return data;
}]);