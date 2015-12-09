angular.module('FullEventCtrl', []).controller('FullEventCtrl', function($scope, Event, $location, Login, Util, $firebaseArray) {
	$scope.events = Event.events;
	
	// $scope.currEvent = $scope.events[];
	$scope.events.$loaded(function() {
		var url = $location.$$path;
		var splitUrl = url.trim().split('&id=');
		var id = splitUrl[splitUrl.length - 1];
		$scope.currEvent = $scope.events.$getRecord(id);

		var commentRef = Util.firebaseRef.child('events').child($scope.currEvent.$id).child('comments');
		$scope.comments = $firebaseArray(commentRef);

		$scope.submitComment = function() {
			Login.loggedIn({
	            no: Login.popup,
	            yes: function() {
	                var commentData = {
	                	"content": $scope.newComment,
	                	"owner": Login.user
	                };
	                $scope.comments.$add(commentData).then(function(ref) {
	                	var id = ref.key();
	                });
	            }
			});
		}

		$scope.attendEvent = function() {
			Login.loggedIn({
	            no: Login.popup,
	            yes: function() {
	                Event.attendEvent($scope.currEvent);
	            }
			});
		}
	});
});