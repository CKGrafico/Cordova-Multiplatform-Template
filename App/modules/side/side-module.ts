module Side {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Side;

    angular.module(Page.Base, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Paths.Tabs + '.' + Page.Left, {
                url: '/' + Page.Left,
                views: {
                    'left-tab': {
                        templateUrl: Paths.Modules + 'side/views/left.html'
                    }
                }
            }
        );
    }
}
