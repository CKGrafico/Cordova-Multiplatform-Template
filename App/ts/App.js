// <reference path="imports.ts" />
var App;
(function (App) {
    'use strict';
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        angular.module('App', ['ionic']).config(['$stateProvider', '$urlRouterProvider', states]).config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|ms-appx):/);
        }]);
        angular.bootstrap(document.querySelector('body'), ['App']);
    }
    // Configure routes
    function states($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');
        $stateProvider.state('main', {});
    }
})(App || (App = {}));
//# sourceMappingURL=App.js.map