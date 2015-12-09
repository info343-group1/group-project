angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope, $state, Event, Leaflet, LocationService, PageData, $location, Login) {
	$scope.results = true;
	$scope.events = Event.events;
	console.log($scope.events);
	$scope.multipleLocations = false;
	$scope.locations = [];
	var arrayLoaded = false;

	var url = $location.$$path;
	var typeArr = url.split('/');
	var type = typeArr[typeArr.length - 1];
	if (type === 'map') {
		$('#tile-tab a').removeClass('active');
		$('#map-tab a').addClass('active');
	} else {
		$('#map-tab a').removeClass('active');
		$('#tile-tab a').addClass('active');
	}

	// Draws our event map if the event tab is selected on page load
	$scope.init = function() {
		url = $location.$$path;
		typeArr = url.split('/');
		type = typeArr[typeArr.length - 1];
		if (type === 'map') {
			if (arrayLoaded) {
				$scope.events.$loaded(function() {
					$scope.drawMap();
					arrayLoaded = true;
				});
			} else {
				$scope.drawMap();
			}
			$scope.events.$loaded(function() {
				$scope.drawMap();
				arrayLoaded = true;
			});
		}
	}

	// switches to the called ui-route
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

	// Makes sure a user is logged in before they can create an event
	$scope.addEventButton = function() {
		Login.loggedIn({
			no: Login.popup,
			yes: function() {
				$('#createModal').openModal();
			}
		});
	}

	$scope.addEvent = function() {
		var address = $scope.newEventAddress;
		var zip = $scope.newEventZip;
		var eventData = {
			'name':$scope.newEventName,
			'date':$('#eventDate').val(),
			'description':$scope.newEventDescr
		}

		LocationService.getLatLong(address + ' ' + zip, function(location) {
			if (location.results.length > 1) {
				$scope.locations = location.results;
				$scope.multipleLocations = true;
				console.log($scope.locations);
			} else {
				if ($scope.newEventName && $scope.newEventDate && $scope.newEventAddress && $scope.newEventZip, $scope.newEventDescr) {
					var components = location.results[0].address_components;
					components.forEach(function(component) {
						if (component.types.indexOf('neighborhood') > -1)
							eventData.neighborhood = component.long_name;
						else if (component.types.indexOf('locality') > -1)
							eventData.city = component.long_name;
						else if (component.types.indexOf('administrative_area_level_1') > -1)
							eventData.state = component.long_name;
					});
					eventData.address = address;
					eventData.zip = zip;
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

	$scope.selectLocation = function(location) {
		var eventData = {
			'name':$scope.newEventName,
			'date':$scope.newEventDate,
			'description':$scope.newEventDescr
		}
		var components = location.address_components;
		components.forEach(function(component) {
			if (component.types.indexOf('neighborhood') > -1)
				eventData.neighborhood = component.long_name;
			else if (component.types.indexOf('locality') > -1)
				eventData.city = component.long_name;
			else if (component.types.indexOf('administrative_area_level_1') > -1)
				eventData.state = component.long_name;
			else if (component.types.indexOf('postal_code') > -1)
				eventData.zip = component.long_name;
		});

		if ($scope.newEventName && $scope.newEventDate && $scope.newEventAddress && $scope.newEventZip, $scope.newEventDescr) {
			eventData.address = location.formatted_address;
			Event.addEvent(eventData);

			$scope.newEventName = '';
			$scope.newEventDate = '';
			$scope.newEventAddress = '';
			$scope.newEventZip = '';
			$scope.newEventDescr = '';
			$('#createModal').closeModal();
		}
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
