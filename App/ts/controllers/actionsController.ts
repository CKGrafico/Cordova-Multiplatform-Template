/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class ActionsController {


        public static $inject = [
            '$scope',
            '$http'
        ];

        constructor(
            private $scope: IActionsScope,
            private $http: ng.IHttpService
            ) {

            $scope.exampleAction = () => this.exampleAction();
            $scope.property = 'Void';

            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                console.log(result);
            })

        }

        private exampleAction() {
            this.$scope.property = 'Clicked';
        }
    }
} 

