module Home {
    'use strict';

    angular.module(Constants.Paths.Home.Module, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {
        $stateProvider
            .state(Constants.Paths.Home.Main.Path, {
                url: '/' + Constants.Paths.Home.Main.Uri,
                views: {
                    'home-tab': {
                        templateUrl: Constants.Paths.Modules + 'home/views/' + Constants.Paths.Home.Main.Uri + '.html'
                    }
                }
            })

            .state(Constants.Paths.Home.Scroll.Path, {
                url: '/' + Constants.Paths.Home.Scroll.Uri,
                views: {
                    'home-tab': {
                        templateUrl: Constants.Paths.Modules + 'home/views/' + Constants.Paths.Home.Scroll.Uri + '.html'
                    }
                }
            });
    }
}
