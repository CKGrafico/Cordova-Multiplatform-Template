module Buttons {
    'use strict';

    angular.module(Constants.Paths.Buttons.Module, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Buttons.Main.Path, {
                url: '/' + Constants.Paths.Buttons.Main.Uri,
                views: {
                    'buttons-tab': {
                        templateUrl: Constants.Paths.Modules + 'buttons/views/' + Constants.Paths.Buttons.Main.Uri + '.html'
                    }
                }
            });
    }
}
