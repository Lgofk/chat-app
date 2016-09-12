angular.module('chat')
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$location', '$mdDialog', 'AuthService'];

function loginCtrl($location, $mdDialog, AuthService) {
    var vm = this;

    vm.signIn = function() {
        if (vm.loginForm === undefined) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('.background')))
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('Username and password required.')
                .ok('Ok')
            );
        }
        AuthService.login(vm.loginForm.username, vm.loginForm.password)
            .then(function(resp) {
                $location.path('/');
                vm.loginForm = '';
            })
            .catch(function() {
                vm.loginForm = '';
                console.log('login failed');
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('.background')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent('Login failed. Please try again.')
                    .ok('Ok')
                );
            });
    };

}