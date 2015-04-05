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
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/partials/tabs.html"
        })

       .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/wrappers/home.html"
                }
            }
        })
        .state('tabs.facts', {
            url: "/facts",
            views: {
                'home-tab': {
                    templateUrl: "templates/wrappers/home2.html"
                }
            }
        })

        .state('tabs.page1', {
            url: "/page1",
            views: {
                'page1-tab': {
                    templateUrl: "templates/wrappers/page1.html"
                }
            }
        })

        $urlRouterProvider.otherwise("/tab/home");
    }
}
