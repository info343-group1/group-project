angular.module('TextService', []).service('PageData', ['$firebaseObject', '$firebaseArray', 'Util', function($firebaseObject, $firebaseArray, Util) {
    var data= {};
    data.getText = function(callback){
    	var textRef = Util.firebaseRef.child('page_data');
    	var obj = $firebaseObject(textRef);
    	obj.$loaded().then(function() {
    		callback(obj);
    	})
    	
    }
    return data;
}]);
