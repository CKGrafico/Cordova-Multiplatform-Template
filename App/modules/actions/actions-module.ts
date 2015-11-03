module Actions {
    'use strict';

    import Paths = Constants.Paths;
    let Page = Paths.Actions;

    angular.module(Page.Base, [])
        .config(statesConfiguration);

    function statesConfiguration(
        $stateProvider: ng.ui.IStateProvider
    ): void {

        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
                url: '/' + Page.Base,
                views: {
                    'actions-tab': {
                        controller: 'actionsController as vm',
                        templateUrl: Paths.Modules + 'actions/views/actions.html'
                    }
                }
            }
        );
    }
}
