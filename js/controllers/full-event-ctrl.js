angular.module('FullEventCtrl', []).controller('FullEventCtrl', function($scope, Event, $location, Login, Util, $firebaseArray) {
	$scope.events = Event.events;
	// $scope.currEvent = $scope.events[];
	$scope.events.$loaded(function() {
		var url = $location.$$path;
		console.log(url);
		var splitUrl = url.trim().split('&id=');
		var id = splitUrl[splitUrl.length - 1];
		console.log(splitUrl);
		$scope.currEvent = $scope.events.$getRecord(id);

		$scope.submitComment = function() {
			var commentRef = Util.firebaseRef.child('events').child($scope.currEvent.$id).child('comments');
			console.log($scope.newComment)
			$scope.comments = $firebaseArray(commentRef);
			var commentData = {
				"content": $scope.newComment,
				"owner": Login.user
			};
			console.log(commentData)
			$scope.comments.$add(commentData).then(function(ref) {
				var id = ref.key();
			});
		}
	});
});