module Side {
    'use strict';

    angular.module(Constants.Paths.Side.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Side.Main.Path, {
                url: '/' + Constants.Paths.Side.Main.Uri,
                views: {
                    'left-tab': {
                        templateUrl: 'views/' + Constants.Paths.Side.Main.Uri + '.html'
                    }
                }
            });
    }
}
