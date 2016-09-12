angular.module('chat')
    .factory('MainFactory', MainFactory);

MainFactory.$inject = ['$http', '$q', 'socketFactory'];

function MainFactory($http, $q, socketFactory) {
    return ({
        info: getUser,
        messages: getMessages(),
        socket: socketFactory()
    });

    function getUser() {
        return $http.get('/user/me');
    }

    function getMessages() {
        return $http.get('/chat/messages');
    }
}