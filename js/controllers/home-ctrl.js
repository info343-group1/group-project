angular.module('HomeCtrl', []).controller('HomeCtrl', function($scope, Leaflet, Event, PageData) {
    $scope.init = function() {
        Event.events.$loaded(function() {
			$scope.drawMap();
		});
    }

    $scope.drawMap = function() {
    	Leaflet.drawMap();
    }

    $scope.addText = function (){
    	PageData.getText(function(data){
    		$scope.pageHeader= data.home.header
    		$scope.sections= data.home.cols
            $scope.map=data.home.map
    		
    	});
    	
    }
});
