angular.module('EventsCtrl', []).controller('EventsCtrl', function($scope, $state, Event, Leaflet, LocationService, PageData, Login) {
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

	var addEvent = function() {
		console.log('addEvent');
		var inputs = $('#addEventForm :input');
		var eventData = {}

		var noEmptyInput = true;
		var atleastOneNotEmpty = false;

		inputs.each(function() {
			if (this.type == "submit") {
				return
			};
			eventData[this.name] = this.value;
			if (this.value !== '') {
				atleastOneNotEmpty = true;
			} else {
				noEmptyInput = false;
			}
		});

		if (noEmptyInput && atleastOneNotEmpty) {
			Event.addEvent(eventData);
		}
	}

	$scope.addEvent = function() {
		Login.loggedIn({
			no: Login.popup,
			yes: function() {
				var addEventHtml;
        $.get('./views/add-event.html').then(function(response) {
            addEventHtml = $(response);
        })
        .then(function() {
            addEventHtml.find('#addEventForm').on('submit', function() {
                addEvent();
                return false;
            });
        })
        .then(function() {
            vex.open({
              afterOpen: function($vexContent) {
                $vexContent.append(addEventHtml);
								// $('.datepicker').pickadate({
							 //    selectMonths: true, // Creates a dropdown to control month
							 //    selectYears: 15 // Creates a dropdown of 15 years to control year
							 //  });
              }
            });
        });
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
