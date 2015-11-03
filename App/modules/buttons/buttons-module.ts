module Buttons {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Buttons;

    angular.module(Page.Base, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
                url: '/' + Page.Base,
                views: {
                    'buttons-tab': {
                        templateUrl: Paths.Modules + 'buttons/views/buttons.html'
                    }
                }
            }
        );
    }
}
