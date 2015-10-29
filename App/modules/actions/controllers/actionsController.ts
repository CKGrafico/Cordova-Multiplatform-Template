module Actions {
    'use strict';

    export class ActionsController {

        private property: string = 'Void';

        constructor(
            private $http: ng.IHttpService
            ) {

            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                console.log(result);
            })
        }

        private exampleAction() {
            this.property = 'Random ' + Math.floor(Math.random() * 100 + 1);
        }
    }

    angular.module(Constants.Paths.Actions.Main.Uri)
        .controller('actionsController', ActionsController);
} 

