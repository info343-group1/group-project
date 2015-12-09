angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope, $state, Event, Leaflet, LocationService, PageData) {
	$scope.results = true;
	$scope.events = Event.events;
	console.log($scope.events);

	$scope.init = function() {
		$scope.events.$loaded(function() {
			$scope.drawMap();
		});
	}

	$scope.changeTab = function(uiRoute) {
		$state.go(uiRoute);
	}

	// called when event-map is spawned, can be moved elsewhere if needbe
	$scope.drawMap = function() {
		Leaflet.drawMap();
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

	$scope.addText = function (){
		PageData.getText(function(data){
			$scope.pageHeader= data.events.header
			console.log($scope.pageHeader.content)
		});
		
	}

});
