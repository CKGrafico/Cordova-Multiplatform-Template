/// <reference path="imports.ts" />

module App {
    'use strict';

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        angular.module('App', ['ionic'])
            .controller('navigationController', App.NavigationController)
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
        .state('tabs.home2', {
            url: "/home2",
            views: {
                'home-tab': {
                    templateUrl: "templates/pages/home2.html"
                }
            }
        })

        // Page1 Views
        .state('tabs.page1', {
            url: "/page1",
            views: {
                'page1-tab': {
                    templateUrl: "templates/pages/page1.html"
                }
            }
        })

        // Page2 Views
        .state('tabs.page21', {
            url: "/page2",
            views: {
                'page2-tab': {
                    templateUrl: "templates/pages/page2.html"
                }
            }
        })

        $urlRouterProvider.otherwise("/tab/home");
    }
}
