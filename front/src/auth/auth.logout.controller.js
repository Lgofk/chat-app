angular.module('chat')
    .controller('logoutCtrl', logoutCtrl);

logoutCtrl.$inject = ['$location', 'AuthService', 'MainFactory'];

function logoutCtrl($location, AuthService, MainFactory) {
    var vm = this;
    vm.logout = function() {
        AuthService.logout()
            .then(function(resp) {
                $location.path('/login');
            });
    };
}