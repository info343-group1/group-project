angular.module('LoginService', []).service('Login', ['Util', function($firebaseAuth, $firebaseArray, $firebaseObject) {

    var service = {};

    // Add item refs
    var userRef = Util.firebaseRef.child("users");
    service.users = $firebaseObject(userRef);

    // Create authorization object that referes to firebase
    service.authObj = $firebaseAuth(Util.firebaseRef);

    // Test if already logged in
    var authData = service.authObj.$getAuth();
    if (authData) {
        service.userId = authData.uid;
    } 

    // SignIn function
    service.signIn = function() {
        $scope.logIn().then(function(authData){
            $scope.userId = authData.uid;
        })
    }

    // LogIn function
    service.logIn = function() {
        return $scope.authObj.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        })
    }

    // LogOut function
    service.logOut = function() {
        service.authObj.$unauth()
        service.userId = false
    }

    // SignUp function
    serivce.signUp = function() {
        // Create user
        $scope.authObj.$createUser({
            email: $scope.email,
            password: $scope.password,          
        })

        // Once the user is created, call the logIn function
        .then(service.logIn)

        // Once logged in, set and save the user data
        .then(function(authData) {
            service.userId = authData.uid;
            service.users.$save()
        })

        // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }

    return service;
}]);