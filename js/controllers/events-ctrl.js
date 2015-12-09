angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope, $state, Event, Leaflet, LocationService, PageData, $location) {
	$scope.results = true;
	$scope.events = Event.events;
	console.log($scope.events);
	$scope.multipleLocations = false;

	$scope.init = function() {
		var url = $location.$$path;
		var typeArr = url.split('/');
		var type = typeArr[typeArr.length - 1];
		if (type === 'map') {
			$scope.events.$loaded(function() {
				$scope.drawMap();
			});

			$('ul.tabs').tabs('select_tab', 'map-tab');
		} else {
			$('ul.tabs').tabs('select_tab', 'tile-tab');
		}
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
		var address = $scope.newEventAddress;
		var zip = $scope.newEventZip;
		var eventData = {
			'name':$scope.newEventName,
			'date':$scope.newEventDate,
			'description':$scope.newEventDescr
		}

		LocationService.getLatLong(eventData.address + ' ' + eventData.zip, function(location) {
			var components = location.results[0].address_components;
			components.forEach(function(component) {
				if (component.types.indexOf('neighborhood') > -1)
					eventData.neighborhood = component.long_name;
				else if (component.types.indexOf('locality') > -1)
					eventData.city = component.long_name;
				else if (component.types.indexOf('administrative_area_level_1') > -1)
					eventData.state = component.long_name;
			});
			if (location.results > 1) {
				multipleLocations = true;
			} else {
				if ($scope.newEventName && $scope.newEventDate && $scope.newEventAddress && $scope.newEventZip, $scope.newEventDescr) {
					Event.addEvent(eventData);

					$scope.newEventName = '';
					$scope.newEventDate = '';
					$scope.newEventAddress = '';
					$scope.newEventZip = '';
					$scope.newEventDescr = '';
					$('#createModal').closeModal();
				}
			}
		});
	}

	$scope.customFilter = function(search) {
		Leaflet.customFilter(search);
	}

	$scope.addText = function (){
		PageData.getText(function(data){
			$scope.pageHeader= data.events.header
			console.log($scope.pageHeader.content)
		});	
	}
});
