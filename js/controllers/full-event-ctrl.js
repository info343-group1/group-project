angular.module('FullEventCtrl', []).controller('FullEventCtrl', function($scope, Event, $location, Login, Util, $firebaseArray) {
	$scope.events = Event.events;
	
	// Runs code once the event array has loaded
	$scope.events.$loaded(function() {
		var url = $location.$$path;
		var splitUrl = url.trim().split('&id=');
		var id = splitUrl[splitUrl.length - 1];
		console.log(id);
		$scope.currEvent = $scope.events.$getRecord(id);

		var commentRef = Util.firebaseRef.child('events').child($scope.currEvent.$id).child('comments');
		$scope.comments = $firebaseArray(commentRef);

		// only lets you attend if you are logged in
		Login.loggedIn({
	        yes: function() {
	          $scope.attending = Event.isAttending($scope.currEvent);
	        }
		});

		// adds comment to the current event
		$scope.submitComment = function() {
			Login.loggedIn({
		        no: Login.popup,
		        yes: function() {
		          var commentData = {
		          	content: $scope.newComment,
		          	owner: {
		          		name: Login.user.name,
		          		userId: Login.user.userId
		          	}
		          };
		          $scope.comments.$add(commentData).then(function(ref) {
		          	var id = ref.key();
		          });
		        }
			});
		}

		// attend and unnattend event
		$scope.toggleAttendEvent = function() {
			Login.loggedIn({
	            no: Login.popup,
	            yes: function() {
	                Event.attendEvent($scope.currEvent, $scope.attending, function(attending) {
	                	$scope.attending = attending;
	                });
	            }
			});
		}
	});
});