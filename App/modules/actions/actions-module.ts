module Actions {
    'use strict';

    angular.module(Constants.Paths.Actions.Module, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Actions.Main.Path, {
                url: '/' + Constants.Paths.Actions.Main.Uri,
                views: {
                    'actions-tab': {
                        templateUrl: Constants.Paths.Modules + 'actions/views/' + Constants.Paths.Actions.Main.Uri + '.html'
                    }
                }
            });
    }
}
