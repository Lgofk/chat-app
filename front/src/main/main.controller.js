angular.module('chat')
    .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['MainFactory', 'AuthService', '$location', '$scope'];

function mainCtrl(MainFactory, AuthService, $location, $scope) {
    var vm = this;
    var Socket = MainFactory.socket;
    vm.messages = [];
    
    MainFactory.messages
        .then(function(resp){
            vm.messages = resp.data;
        });
    

    MainFactory.info()
        .then(function(resp) {
            vm.userInfo = resp.data;
        });

    Socket.connect();

    vm.sendMessage = function(msg) {
        if (msg != null && msg != '') {
            Socket.emit('message', {
                avatar: vm.userInfo.avatar,
                username: vm.userInfo.name,
                message: msg
            });
        }
        vm.msg = '';
    };

    Socket.on('message', function(data) {
        vm.messages.push(data);
    });

    $scope.$on('$locationChangeStart', function(event) {
        Socket.disconnect(true);
    });


}