/// <reference path="../imports.ts" />

module $safeprojectname$ {
    'use strict';

    export class ActionsController {


        public static $inject = [
            '$scope',
        ];

        constructor(
            private $scope: any
            ) {

            $scope.exampleAction = () => this.exampleAction();
            $scope.property = 'Void';
        }

        private exampleAction() {
            this.$scope.property = 'Clicked';
        }
    }
} 

