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
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', {
				url: '/main',
				//controller: 'mainController',
				templateUrl: 'templates/wrappers/main.html'
			}
		)
    }
}
