module Side {
    'use strict';

    angular.module(Constants.Paths.Side.Module, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Side.Main.Path, {
                url: '/' + Constants.Paths.Side.Main.Uri,
                views: {
                    'left-tab': {
                        templateUrl: Constants.Paths.Modules + 'side/views/' + Constants.Paths.Side.Main.Uri + '.html'
                    }
                }
            });
    }
}
