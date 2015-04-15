/// <reference path="imports.ts" />
var App;
(function (App) {
    'use strict';
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        angular.module('App', ['ionic']).controller('navigationController', App.NavigationController).controller('actionsController', App.ActionsController).config(['$stateProvider', '$urlRouterProvider', states]).config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
        }]);
        angular.bootstrap(document.querySelector('body'), ['App']);
    }
    // Configure routes
    function states($stateProvider, $urlRouterProvider) {
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
})(App || (App = {}));
//# sourceMappingURL=App.js.map