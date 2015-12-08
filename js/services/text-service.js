angular.module('TextService', []).service('PageData', ['$firebaseObject', '$firebaseArray', 'Util', function($scope, $firebaseObject, $firebaseArray, Util) {
    var data= {};
    var textRef = Util.firebaseRef.child('page_data');

    $scope.copy = data.page_data = $firebaseArray(textRef);
    console.log(data.page_data);




    return data;
}]);

// Init to load the page data