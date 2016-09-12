angular.module('chat', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages', 'btford.socket-io'])
    .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/pages/main.html',
                controller: 'mainCtrl as main',
                access: {
                    restricted: true
                }
            })
            .when('/login', {
                templateUrl: '../views/auth/login.html',
                controller: 'loginCtrl as login',
                access: {
                    restricted: false
                }
            })
            .when('/register', {
                templateUrl: '../views/auth/register.html',
                controller: 'registerCtrl as register',
                access: {
                    restricted: false
                }
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);

        var main_theme = $mdThemingProvider.extendPalette('cyan', {
            'contrastDefaultColor': 'light'
        });
        $mdThemingProvider.definePalette('mainCyan', main_theme);
        $mdThemingProvider.theme('main-theme')
            .primaryPalette('mainCyan');
    })

.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        AuthService.getUserStatus()
            .then(function() {
                if (next.access.restricted && !AuthService.isLoggedIn()) {
                    $location.path('/login');
                    $route.reload();
                }
            });
    });
})