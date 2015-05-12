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
