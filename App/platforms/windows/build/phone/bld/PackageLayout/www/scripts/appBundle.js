/// <reference path="lib/typings/definitelytyped/angularjs/angular.d.ts" />
/// <reference path="lib/typings/definitelytyped/cordova/cordova.d.ts" />
/// <reference path="lib/typings/definitelytyped/cordova-ionic/cordova-ionic.d.ts" />
/// <reference path="lib/typings/definitelytyped/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="lib/typings/ionic-typescript-definitions/beta14/ionic.d.ts" />
/// <reference path="imports.ts" />
var App;
(function (App) {
    'use strict';
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        angular.module('App', ['ionic']).controller('navigationController', App.NavigationController).controller('actionsController', App.ActionsController).config(['$stateProvider', '$urlRouterProvider', statesConfiguration]).config(['$httpProvider', httpInterceptor]).run(['$rootScope', '$ionicLoading', httpInterceptorActions]).config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
        }]);
        angular.bootstrap(document.querySelector('body'), ['App']);
    }
    // Configure routes
    function statesConfiguration($stateProvider, $urlRouterProvider) {
        $stateProvider.state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/partials/tabs.html"
        }).state('tabs.left', {
            url: "/left",
            views: {
                'left-tab': {
                    templateUrl: "templates/pages/left.html"
                }
            }
        }).state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/pages/home.html"
                }
            }
        }).state('tabs.scroll', {
            url: "/scroll",
            views: {
                'home-tab': {
                    templateUrl: "templates/pages/scroll.html"
                }
            }
        }).state('tabs.actions', {
            url: "/actions",
            views: {
                'actions-tab': {
                    controller: 'actionsController',
                    templateUrl: "templates/pages/actions.html"
                }
            }
        }).state('tabs.buttons', {
            url: "/buttons",
            views: {
                'buttons-tab': {
                    templateUrl: "templates/pages/buttons.html"
                }
            }
        });
        $urlRouterProvider.otherwise("/tab/home");
    }
    // Configure interceptor
    function httpInterceptor($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show');
                    return config;
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                }
            };
        });
    }
    // Configure interceptor actions
    function httpInterceptorActions($rootScope, $ionicLoading) {
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({ templateUrl: "templates/partials/loading.html" });
        });
        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });
    }
})(App || (App = {}));
// Platform specific overrides will be placed in the merges folder versions of this file 
/// <reference path="../imports.ts" />
var App;
(function (App) {
    'use strict';
    var ActionsController = (function () {
        function ActionsController($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.exampleAction = function () { return _this.exampleAction(); };
            $scope.property = 'Void';
            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                var a = result.data.breweries;
            });
        }
        ActionsController.prototype.exampleAction = function () {
            this.$scope.property = 'Clicked';
        };
        ActionsController.$inject = [
            '$scope',
            '$http'
        ];
        return ActionsController;
    })();
    App.ActionsController = ActionsController;
})(App || (App = {}));
/// <reference path="../imports.ts" />
var App;
(function (App) {
    'use strict';
    var NavigationController = (function () {
        function NavigationController($scope /*&ng.IScope*/, $ionicHistory, $ionicTabsDelegate) {
            var _this = this;
            this.$scope = $scope;
            this.$ionicHistory = $ionicHistory;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            document.addEventListener('backbutton', function (e) { return _this.checkBack(e); }, false);
            this.$scope.onSwipeLeft = function () { return _this.onSwipeLeft(); };
            this.$scope.onSwipeRight = function () { return _this.onSwipeRight(); };
        }
        NavigationController.prototype.goBack = function () {
            this.$ionicHistory.goBack();
        };
        NavigationController.prototype.checkBack = function (e) {
            var page = this.$ionicHistory.currentStateName();
            if (page === 'main') {
                var nav = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                }
                else {
                    window.close();
                }
            }
            else {
                this.goBack();
            }
        };
        NavigationController.prototype.onSwipeLeft = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() + 1);
        };
        NavigationController.prototype.onSwipeRight = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() - 1);
        };
        NavigationController.$inject = [
            '$scope',
            '$ionicHistory',
            '$ionicTabsDelegate'
        ];
        return NavigationController;
    })();
    App.NavigationController = NavigationController;
})(App || (App = {}));
//# sourceMappingURL=appBundle.js.map