/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class ActionsController {


        public static $inject = [
            '$scope',
            '$http'
        ];

        constructor(
            private $scope: any,
            private $http: any
            ) {

            $scope.exampleAction = () => this.exampleAction();
            $scope.property = 'Void';

            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                var a = result.data.breweries
            })

        }

        private exampleAction() {
            this.$scope.property = 'Clicked2';
        }
    }
} 

