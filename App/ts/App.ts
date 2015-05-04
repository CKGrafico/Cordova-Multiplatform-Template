/// <reference path="imports.ts" />

module App {
    'use strict';

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        // TODO Improve this
        var statusBar = window['StatusBar'];
        statusBar.backgroundColorByHexString('#f8f8f8');
        statusBar.styleDefault();
        statusBar.show();

        angular.module('App', ['ionic'])
            .controller('navigationController', App.NavigationController)
            .controller('actionsController', App.ActionsController)
            .config(['$stateProvider', '$urlRouterProvider', statesConfiguration])
            .config(['$httpProvider', httpInterceptor])
            .run(['$rootScope', '$ionicLoading', httpInterceptorActions])
            .config(['$compileProvider', function ($compileProvider) {
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
		}]);

        angular.bootstrap(document.querySelector('body'), ['App']);
    }

    // Configure routes
    function statesConfiguration($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {

        $stateProvider
        // Tabs Menu
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/partials/tabs.html"
        })

        // Side Menu Left
            .state('tabs.left', {
            url: "/left",
            views: {
                'left-tab': {
                    templateUrl: "templates/pages/left.html"
                }
            }
        })
        
        // Home Views
       .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/pages/home.html"
                }
            }
        })
        .state('tabs.scroll', {
            url: "/scroll",
            views: {
                'home-tab': {
                    templateUrl: "templates/pages/scroll.html"
                }
            }
        })

        // actions Views
        .state('tabs.actions', {
            url: "/actions",
            views: {
                'actions-tab': {
                    controller: 'actionsController',
                    templateUrl: "templates/pages/actions.html"
                }
            }
        })

        // buttons Views
        .state('tabs.buttons', {
            url: "/buttons",
            views: {
                'buttons-tab': {
                    templateUrl: "templates/pages/buttons.html"
                }
            }
        })

        $urlRouterProvider.otherwise("/tab/home");
    }

    // Configure interceptor
    function httpInterceptor($httpProvider: ng.IHttpProvider) {
        $httpProvider.interceptors.push(function ($rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                }
            }
        })
    }

    // Configure interceptor actions
    function httpInterceptorActions($rootScope: ng.IRootScopeService, $ionicLoading: Ionic.ILoading) {
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({ templateUrl: "templates/partials/loading.html"})
        })

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        })
    }
}
