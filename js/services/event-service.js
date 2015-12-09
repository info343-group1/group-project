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

	data.attendEvent = function(event, isAttending) {
		var attendingRef = eventRef.child(event.$id).child("usersAttending");
		var attending = $firebaseArray(attendingRef);
		attending.$loaded(function () {
			if (isAttending) {
				var times = 0;
				for (var index in event["usersAttending"]) {
					if (event["usersAttending"][index].userId == Login.user.userId) {
						attending.$remove(times).then(function(ref) {
							var id = ref.key();
						});
					}
					times++;
				}
			} else {
				attending.$add(Login.user).then(function(ref) {
					var id = ref.key();
					
				})
			}
		})
		
		
	}

	data.isAttending = function(event) {
		for (var index in event.usersAttending) {
			if (event.usersAttending[index].userId == Login.user.userId) {
				return true;
			}
		}
		return false;
	}

	data.getOwnedEvents = function() {
		data.owned = [];
		for(var index in Login.user.createdEvents) {
			data.events.$loaded(function () {
				data.events.forEach(function (item) {
					if (Login.user.createdEvents[index] == item.$id) {
						data.owned.push(item);
					}
				})
			})
		}
	}

	return data;
}]);