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
        service.logIn($('#signInEmail').val(), $('#signInPassword').val())
        .then(function(authData){
            console.log(authData);
            service.userId = authData.uid;
            vex.close();
            location.reload();
        });
    }

    // LogIn function
    service.logIn = function(email, password) {
        console.log('logIn');
        // console.log($('#email').val());
        // console.log($('#password').val());
        return service.authObj.$authWithPassword({
            email: email,
            password: password
        });
    }

    // LogOut function
    service.logOut = function() {
        service.authObj.$unauth();
        service.userId = false;
        location.reload();
    }

    // SignUp function
    service.signUp = function() {
        // Create user
        service.authObj.$createUser({
            email: $('#signUpEmail').val(),
            password: $('#signUpPassord').val()          
        })

        // Once the user is created, call the logIn function
        .then(function() {
            return service.logIn($('#signUpEmail').val(), $('#signUpPassord').val())
        })

        // Once logged in, set and save the user data
        .then(function(authData) {
            service.userId = authData.uid;
            return userRef.push({
                userId: authData.uid,
                name: $('#name').val(),
                email: $('#signUpEmail').val()
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
        $.get('./views/login.html').then(function(response) {
            loginHtml = $(response);
        })
        .then(function() {
            loginHtml.find('#signInForm').on('submit', function() {
                service.signIn();
                return false;
            });
            loginHtml.find('#signUpForm').on('submit', function() {
                service.signUp();
                return false;
            });
            loginHtml.find('#facebook').on('click', service.facebook);
            loginHtml.find('#twitter').on('click', service.twitter);
            loginHtml.find('#google').on('click', service.google);
            loginHtml.find('#github').on('click', service.github);
        })

        .then(function() {
            vex.open({
              afterOpen: function($vexContent) {
                $vexContent.append(loginHtml);
                $('ul.tabs').tabs();
              },
              afterClose: function() {
                console.log('vexClose');
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
            location.reload();
        });
    }

    service.twitter = function() {
        service.authObj.$authWithOAuthPopup("twitter")
        .then(function(authData) {
            console.log(authData);
            service.userId = authData.uid;
            return userRef.push({
                userId: authData.uid,
                name: authData.twitter.displayName
            });
        })
        .then(function() {
            vex.close();
            location.reload();
        });
    }

    service.google = function() {
        service.authObj.$authWithOAuthPopup("google", {
          scope: "email,profile" // the permissions requested
        })
        .then(function(authData) {
            console.log(authData);
            service.userId = authData.uid;
            return userRef.push({
                userId: authData.uid,
                name: authData.google.displayName,
                email: authData.google.email
            });
        })
        .then(function() {
            vex.close();
            location.reload();
        });
    }

    service.github = function() {
        service.authObj.$authWithOAuthPopup("github", {
          scope: "user" // the permissions requested
        })
        .then(function(authData) {
            console.log(authData);
            service.userId = authData.uid;
            return userRef.push({
                userId: authData.uid,
                name: authData.github.displayName,
                email: authData.github.email
            });
        })
        .then(function() {
            vex.close();
            location.reload();
        });
    }

    return service;
}]);