angular.module('chat')
    .controller('registerCtrl', registerCtrl);

registerCtrl.$inject = ['$location', '$mdDialog', 'AuthService'];

function registerCtrl($location, $mdDialog, AuthService) {
    var vm = this;

    vm.signUp = function() {
        AuthService.register(vm.signUpForm.name, vm.signUpForm.username, vm.signUpForm.password)
            .then(function() {
                $location.path('/');
                vm.signUpForm = '';
            })
            .catch(function() {
                vm.signUpform = '';
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('.background')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent('User with that username already exists')
                    .ok('Ok')
                );
            });
    };
}