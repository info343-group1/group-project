angular.module('TextService', []).service('PageData', ['$firebaseObject', '$firebaseArray', 'Util', function($firebaseObject, $firebaseArray, Util) {
    var textServ= {};
    var textRef = Util.firebaseRef.child('page_data');



    return textServ;
}]);

// Init to load the page data