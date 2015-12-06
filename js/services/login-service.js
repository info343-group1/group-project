angular.module('LoginService', []).service('Login', ['$firebaseAuth', '$firebaseArray', '$firebaseObject', 'Util', function($firebaseAuth, $firebaseArray, $firebaseObject, Util) {

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
        console.log('signIn');
        service.logIn().then(function(authData){
            console.log(authData);
            service.userId = authData.uid;
            vex.close();
        })
    }

    // LogIn function
    service.logIn = function() {
        console.log('logIn');
        // console.log($('#email').val());
        // console.log($('#password').val());
        return service.authObj.$authWithPassword({
            email: $('#email').val(),
            password: $('#password').val()
        })
    }

    // LogOut function
    service.logOut = function() {
        service.authObj.$unauth()
        service.userId = false
    }

    // SignUp function
    service.signUp = function() {
        // Create user
        service.authObj.$createUser({
            email: $('#email').val(),
            password: $('#password').val()          
        })

        // Once the user is created, call the logIn function
        .then(service.logIn)

        // Once logged in, set and save the user data
        .then(function(authData) {
            service.userId = authData.uid;
            return userRef.push({
                userId: authData.uid,
                name: $('#name').val(),
                email: $('#email').val()
            });
        })
        .then(function() {
            vex.close();
        })

        // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }


    service.popup = function(mode) {
        var loginHtml;
        var otherAccounts;
        $.get('./views/' + mode + '.html').then(function(response) {
            loginHtml = $(response);
        })
        .then(function() {
            loginHtml.find('#' + mode + 'Form').on('submit', function() {
                service[mode]();
                return false;
            });
        })

        .then(function() {
            return $.get('./views/otherAccountButtons.html')
        })
        .then(function(response) {
            otherAccounts = $(response);
        })
        .then(function() {
            otherAccounts.find('#facebook').on('click', service.facebook);
            otherAccounts.find('#twitter').on('click', function() {
                console.log('twitter');
            });
            otherAccounts.find('#google').on('click', function() {
                console.log('google');
            });
            otherAccounts.find('#github').on('click', function() {
                console.log('github');
            });
        })

        .then(function() {
            vex.open({
              afterOpen: function($vexContent) {
                return $vexContent.append(loginHtml).append(otherAccounts);
              },
              afterClose: function() {
                return console.log('vexClose');
              }
            });
        });
    }

    service.facebook = function() {
        service.authObj.$authWithOAuthPopup("facebook", {
          scope: "email,user_likes" // the permissions requested
        })
        .then(function(authData) {
            console.log(authData);
            service.userId = authData.uid;
            return userRef.push({
                userId: authData.uid,
                name: authData.facebook.displayName,
                email: authData.facebook.email
            });
        })
        .then(function() {
            vex.close();
        })
        ;
    }

    return service;
}]);