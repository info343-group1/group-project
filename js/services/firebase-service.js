angular.module('FirebaseService', []).service('Firebase',["firebase", function($firebaseAuth, $firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://info343-group1.firebaseio.com/");

    // Add item refs
    var userRef = ref.child("users");
    $scope.users = $firebaseObject(userRef);

    // Create authorization object that referes to firebase
    $scope.authObj = $firebaseAuth(ref);

    // Test if already logged in
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        $scope.userId = authData.uid;
    } 

    // SignUp function
    $scope.signUp = function() {
        // Create user
        $scope.authObj.$createUser({
            email: $scope.email,
            password: $scope.password,          
        })

        // Once the user is created, call the logIn function
        .then($scope.logIn)

        // Once logged in, set and save the user data
        .then(function(authData) {
            $scope.userId = authData.uid;
            $scope.users.$save()
        })

        // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }

    // SignIn function
    $scope.signIn = function() {
        $scope.logIn().then(function(authData){
            $scope.userId = authData.uid;
        })
    }

    // LogIn function
    $scope.logIn = function() {
        return $scope.authObj.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        })
    }

    // LogOut function
    $scope.logOut = function() {
        $scope.authObj.$unauth()
        $scope.userId = false
    }
}]);