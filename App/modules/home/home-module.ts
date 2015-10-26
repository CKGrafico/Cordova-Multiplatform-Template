module Home {
    'use strict';

    angular.module(Constants.Paths.Home.Main.Uri, [])
        .config(['$stateProvider', statesConfiguration]);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Home.Main.Path, {
                url: '/' + Constants.Paths.Home.Main.Uri,
                views: {
                    'home-tab': {
                        templateUrl: 'views/' + Constants.Paths.Home.Main.Uri + '.html'
                    }
                }
            })

            .state(Constants.Paths.Home.Scroll.Path, {
                url: '/' + Constants.Paths.Home.Main.Uri,
                views: {
                    'home-tab': {
                        templateUrl: 'views/' + Constants.Paths.Home.Scroll.Uri + '.html'
                    }
                }
            });
    }
}
