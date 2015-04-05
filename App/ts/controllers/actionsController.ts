/// <reference path="../imports.ts" />

module App {
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
            this.$scope.property = this.$scope.property === 'Void' ? 'Click' : 'Void';
        }
    }
} 

