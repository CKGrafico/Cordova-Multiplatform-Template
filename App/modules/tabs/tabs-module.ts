module Tabs {
    'use strict';

    import Paths = Constants.Paths;

    angular.module(Paths.Tabs, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Paths.Tabs, {
                url: '/' + Paths.Tabs,
                abstract: true,
                templateUrl: Paths.Modules + 'tabs/templates/tabs.html'
            });
    }
}
