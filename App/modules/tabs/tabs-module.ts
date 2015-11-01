module Tabs {
    'use strict';

    angular.module(Constants.Paths.Tabs, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Tabs, {
                url: '/' + Constants.Paths.Tabs,
                abstract: true,
                templateUrl: Constants.Paths.Modules + 'tabs/templates/' + Constants.Paths.Tabs + '.html'
            });
    }
}
