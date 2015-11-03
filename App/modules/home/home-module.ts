module Home {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Home; 

    angular.module(Page.Base, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
                url: '/' + Page.Base,
                views: {
                    'home-tab': {
                        templateUrl: Paths.Modules + 'home/views/home.html'
                    }
                }
            })

            .state(Paths.Tabs + '.' + Page.Scroll, {
                url: '/' + Page.Scroll,
                views: {
                    'home-tab': {
                        templateUrl: Paths.Modules + 'home/views/scroll.html'
                    }
                }
            }
        );
    }
}
