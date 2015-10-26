module Tabs {
    'use strict';

    angular.module(Constants.Paths.Tabs, [])
        .config(['$stateProvider', statesConfiguration]);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Tabs, {
                url: '/' + Constants.Paths.Tabs,
                abstract: true,
                templateUrl: 'templates/' + Constants.Paths.Tabs + '.html'
            });
    }
}
