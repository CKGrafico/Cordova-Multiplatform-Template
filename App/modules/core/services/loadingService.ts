module Core {
    'using strict';

    export class LoadingService implements ILoadingService {

        constructor(
            private $ionicLoading: ionic.loading.IonicLoadingService
        ){}

        public show(): void {
            let options: ionic.loading.IonicLoadingOptions = {
                templateUrl: Constants.Paths.Modules + 'tabs/templates/loading.html'
            };
            this.$ionicLoading.show(options);
        }

        public hide(): void {
            this.$ionicLoading.hide();
        }
    }

    angular.module(Constants.Paths.Core)
        .service('loadingService', LoadingService);
}