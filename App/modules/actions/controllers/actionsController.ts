module Actions {
    'use strict';

    export class ActionsController {

        public text: string = '';

        constructor(
            private loadingService: Core.ILoadingService,
            private $timeout: ng.ITimeoutService
        ) {
            this.addTextAsync($timeout);
        }

        private addTextAsync($timeout: ng.ITimeoutService): void {
            this.loadingService.show();
            $timeout(() => {
                //this.text += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt lacinia augue vehicula molestie. Proin a dui dignissim, ornare nulla ut, venenatis nisi. Proin accumsan tortor purus, a venenatis augue vestibulum porta. In faucibus ligula eu metus tempor, a ornare enim finibus. Donec ullamcorper risus sem, quis laoreet mauris pharetra in. Vestibulum tempus ipsum eget dolor ornare auctor. Ut pulvinar ac nibh ac lobortis.</p>';
                this.loadingService.hide();
            }, Math.floor(Math.random() * 3000));
        }
    }

    angular.module(Constants.Paths.Actions.Base)
        .controller('actionsController', ActionsController);
} 

