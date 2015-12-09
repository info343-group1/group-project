angular.module('LoginService', []).service('Login', ['$firebaseAuth', '$firebaseArray', '$firebaseObject', 'Util', function($firebaseAuth, $firebaseArray, $firebaseObject, Util) {

    var service = {};

    // Add item refs
    var userRef = Util.firebaseRef.child("users");

    service.user = null;

    // Create authorization object that referes to firebase
    var authObj = $firebaseAuth(Util.firebaseRef);
 

    // SignIn function
    var signIn = function() {
        logIn($('#signInEmail').val(), $('#signInPassword').val())
        .then(function(authData){
            console.log(authData);
            setUserObject();
            vex.close();
            location.reload();
        })
        // Catch any errors
        .catch(function(error) {
            // console.error("Error: ", error);
            $('#emailPasswordError').fadeIn();
        });
    }

    // LogIn function
    var logIn = function(email, password) {
        return authObj.$authWithPassword({
            email: email,
            password: password
        });
    }

    // LogOut function
    service.logOut = function() {
        authObj.$unauth();
        service.userId = false;
        location.reload();
    }

    // SignUp function
    var signUp = function() {
        // Create user
        authObj.$createUser({
            email: $('#signUpEmail').val(),
            password: $('#signUpPassord').val()          
        })

        // Once the user is created, call the logIn function
        .then(function() {
            return logIn($('#signUpEmail').val(), $('#signUpPassord').val())
        })

        // Once logged in, set and save the user data
        .then(function(authData) {
            var promise = $.Deferred()
            userRef.push({
                userId: authData.uid,
                name: $('#name').val(),
                email: $('#signUpEmail').val()
            }, promise.resolve);
            return promise
        })
        .then(function() {
            setUserObject();
            vex.close();
            location.reload();
        })
        // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }


    service.popup = function() {
        var loginHtml;
        $.get('./views/login.html').then(function(response) {
            loginHtml = $(response);
        })
        .then(function() {
            loginHtml.find('#signInForm').on('submit', function() {
                signIn();
                return false;
            });
            loginHtml.find('#signUpForm').on('submit', function() {
                signUp();
                return false;
            });
            loginHtml.find('#facebook').on('click', function() {
                logginProvider('facebook');
            });
            loginHtml.find('#twitter').on('click', function() {
                logginProvider('twitter');
            });
            loginHtml.find('#google').on('click', function() {
                logginProvider('google');
            });
            loginHtml.find('#github').on('click', function() {
                logginProvider('github');
            });
            loginHtml.find('#emailPasswordError').hide();
        })

        .then(function() {
            vex.open({
              afterOpen: function($vexContent) {
                $vexContent.append(loginHtml);
                $('ul.tabs').tabs();
              }
            });
        });
    }

    permissions = {
        facebook: "email,user_likes",
        twitter: "",
        google: "email,profile",
        github: "user"
    };

    var logginProvider = function(provider) {
        authObj.$authWithOAuthPopup(provider, {
          scope: permissions[provider] // the permissions requested
        })
        .then(function(authData) {
            var promise = $.Deferred();
            userRef.orderByChild("userId").equalTo(authData.uid).once("value", function(user) {
                if (!user.val()) {
                    userRef.push({
                        userId: authData.uid,
                        name: authData[provider].displayName || '',
                        email: authData[provider].email || ''
                    }, promise.resolve);
                } else {
                     promise.resolve();
                }
            });
            return promise;
        })
        .then(service.setUserObject)
        .then(function() {
            vex.close();
            location.reload();
        });
    }

    var setUserObject = function() {

        var first = function(obj) {
            for (var a in obj) return a;
        }

        var authData = authObj.$getAuth();
        service.userId = authData.uid;

        var promise = $.Deferred();

        userRef.orderByChild("userId").equalTo(authData.uid).once("value", function(user) {
            service.user = user.val()[first(user.val())];
            service.user.auth = authData;
            promise.resolve();
        });

        return promise;
    }

    service.loggedIn = function(obj) {
        if (authObj.$getAuth() != null && obj.yes) {
            if (service.user == null) {
                setUserObject().then(obj.yes);
            } else{
                obj.yes();
            };
        } else{
            if (obj.no) {
                obj.no();
            };
        };
    }

    // Test if already logged in
    // service.loggedIn({});

    return service;
}]);