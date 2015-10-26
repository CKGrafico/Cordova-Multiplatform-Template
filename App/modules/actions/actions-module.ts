module Actions {
    'use strict';

    angular.module(Constants.Paths.Actions.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Actions.Main.Path, {
                url: '/' + Constants.Paths.Actions.Main.Uri,
                views: {
                    'actions-tab': {
                        templateUrl: 'views/' + Constants.Paths.Actions.Main.Uri + '.html'
                    }
                }
            });
    }
}
