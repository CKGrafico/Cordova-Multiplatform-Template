module Buttons {
    'use strict';

    angular.module(Constants.Paths.Buttons.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Buttons.Main.Path, {
                url: '/' + Constants.Paths.Buttons.Main.Uri,
                views: {
                    'buttons-tab': {
                        templateUrl: 'views/' + Constants.Paths.Buttons.Main.Uri + '.html'
                    }
                }
            });
    }
}
