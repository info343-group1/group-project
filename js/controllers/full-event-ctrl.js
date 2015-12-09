angular.module('FullEventCtrl', []).controller('FullEventCtrl', function($scope, Event, $location, Login, Util, $firebaseArray) {
	$scope.events = Event.events;
	
	$scope.events.$loaded(function() {
		var url = $location.$$path;
		var splitUrl = url.trim().split('&id=');
		var id = splitUrl[splitUrl.length - 1];
		$scope.currEvent = $scope.events.$getRecord(id);
		$scope.attending = Event.isAttending($scope.currEvent);

		var commentRef = Util.firebaseRef.child('events').child($scope.currEvent.$id).child('comments');
		$scope.comments = $firebaseArray(commentRef);

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

		$scope.toggleAttendEvent = function() {
			Login.loggedIn({
	            no: Login.popup,
	            yes: function() {
	                Event.attendEvent($scope.currEvent, $scope.attending);
	            }
			});
		}
	});
});