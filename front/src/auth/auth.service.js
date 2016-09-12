angular.module('chat')
    .factory('AuthService', AuthService);

AuthService.$inject = ['$q', '$timeout', '$http'];

function AuthService($q, $timeout, $http) {
    var user = null;

    return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register
    });

    function isLoggedIn() {
        return !!user;
    }

    function getUserStatus() {
        return $http.get('/user/status')
            .success(function(data) {
                user = !!data.status;
            })
            .error(function(data) {
                user = false;
            });
    }

    function login(username, password) {
        var deferred = $q.defer();

        $http.post('/user/sign_in', {
                username: username,
                password: password
            })
            .success(function(data, status) {
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                }
                else {
                    user = false;
                    deferred.reject();
                }
            })
            .error(function(data) {
                user = false;
                deferred.reject();
            });
        return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();

        $http.get('/user/logout')
            .success(function(data) {
                user = false;
                deferred.resolve();
            })
            .error(function(data) {
                user = false;
                deferred.reject();
            });
        return deferred.promise;
    }

    function register(name, username, password) {
        var deferred = $q.defer();

        $http.post('/user/sign_up', {
                name: name,
                username: username,
                password: password
            })
            .success(function(data, status) {
                if (status === 200 && data.status) {
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }
            })
            .error(function(data) {
                deferred.reject();
            });
        return deferred.promise;
    }
}