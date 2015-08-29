/**
 * Created by Branislav Vidojevic on 27/8/2015.
 */

var myApp = angular.module('myApp', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/admin', {
                templateUrl: 'admin.html',
                controller: 'AdminCtrl',
                reloadOnSearch: false
            })
            .when('/staniURed', {
                templateUrl: 'stani.html',
                controller: 'StaniCtrl'
            })
            .when('/proveri', {
                templateUrl: 'proveri.html',
                controller: 'ProveriCtrl'
            })
            .otherwise({
                redirectTo: '/admin'
            });
    }])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

        var getJson = function () {
            $http.get('http://gnu.fon.bg.ac.rs/qfon/api/sluzba/monitor').success(function (data) {
                $scope.salteri = dataFormat(data);
            }).error(function () {
                console.log("monitor data fetch failed");
            });
        };
        setInterval(getJson, 2000);
    }])
    .controller('AdminCtrl', ['$scope', 'salterService', function ($scope, salterService) {

        $scope.iterator = [1, 2, 3];

        $scope.otvori = function (a) {
            var req = salterService.radi.get({stanje: 'otvori', salter: a});
        };
        $scope.zatvori = function (a) {
            var req = salterService.radi.get({stanje: 'zatvori', salter: a});
        };
        $scope.izbaci = function (a) {
            var req = salterService.izbaci.get({salter: a}, function (data) {
                $('#a' + a).text(data.tekuciBroj);
                $('#b' + a).text(data.brojLjudi);
            });
        };
    }])
    .controller('StaniCtrl', ['$scope', 'redService', function ($scope, redService) {
        $scope.stani = function (forma) {
            if (forma) {
                var a = document.getElementById('salter').value;
                var b = $scope.index;
                var req = redService.staniURed.get({salter: a, index: b}, function (data) {
                    modalUspesnoStani(data);
                });
            } else {
                modalNevalidnaForma();
            }
        }
    }])
    .controller('ProveriCtrl', ['$scope', 'proveraService', function ($scope, proveraService) {
        $scope.proveri = function (forma) {
            if (forma) {
                var a = $scope.index;
                var req = proveraService.provera.get({index: a}, function (data) {
                    modalProvera(data);
                });
            } else {
                modalNevalidnaForma();
            }
        }
    }])
    .service('salterService', ['$resource', function ($resource) {
        this.radi = $resource('http://gnu.fon.bg.ac.rs/qfon/api/sluzba/:stanje');
        this.izbaci = $resource('http://gnu.fon.bg.ac.rs/qfon/api/sluzba/izbaci');
    }])
    .service('redService', ['$resource', function ($resource) {
        this.staniURed = $resource('http://gnu.fon.bg.ac.rs/qfon/api/student/stani');
    }])
    .service('proveraService', ['$resource', function ($resource) {
        this.provera = $resource('http://gnu.fon.bg.ac.rs/qfon/api/student/proveri');
    }]);