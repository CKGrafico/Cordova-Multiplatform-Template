/// <reference path="imports.ts" />

module App {
    'use strict';

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        angular.module('App', ['ionic'])
            .controller('navigationController', App.NavigationController)
            .controller('actionsController', App.ActionsController)
            .config(['$stateProvider', '$urlRouterProvider', states])
            .config(['$compileProvider', function ($compileProvider) {
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
		}]);

        angular.bootstrap(document.querySelector('body'), ['App']);
    }

    // Configure routes
    function states($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {

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
}
