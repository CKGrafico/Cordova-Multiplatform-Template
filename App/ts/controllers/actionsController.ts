/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class ActionsController {

        public static $inject = [
            '$scope',
            '$http'
        ];

        private property: string = 'Void';

        constructor(
            private $scope: IActionsScope,
            private $http: ng.IHttpService
            ) {

            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                console.log(result);
            })
        }

        private exampleAction() {
            this.property = 'Clicked';
        }
    }

    angular.module('App').controller('actionsController', ActionsController);
} 

