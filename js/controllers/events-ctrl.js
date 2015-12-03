angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope, $state, Event, Leaflet) {
	$scope.results = true;
	$scope.events = Event.events;

	$scope.init = function() {
		console.log($scope.events);
		// $('ul.tabs').tabs();
		// Leaflet.drawMap();
	}

	$scope.changeTab = function(uiRoute) {
		$state.go(uiRoute);
	}
	
	$scope.searchQuery = function() {
		$scope.results = !$scope.results;
	};

	$scope.addEvent = function() {
		var eventData = {
			'name':$scope.newEventName,
			'date':$scope.newEventDate,
			'address':$scope.newEventAddress,
			'zip':$scope.newEventZip,
			'description':$scope.newEventDescr
		}

		if ($scope.newEventName && $scope.newEventDate && $scope.newEventAddress && $scope.newEventZip, $scope.newEventDescr) {
			Event.addEvent(eventData);

			$scope.newEventName = '';
			$scope.newEventDate = '';
			$scope.newEventAddress = '';
			$scope.newEventZip = '';
			$scope.newEventDescr = '';
		}

		$('#createModal').closeModal();
	}
});
