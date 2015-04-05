/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class NavigationController {


        public static $inject = [
            '$scope',
            '$ionicHistory',
        ];

        constructor(
            private $scope: ng.IScope,
            private $ionicHistory: Ionic.IHistory
            ) {

            document.addEventListener('backbutton', e => this.checkBack(e), false);
        }

        public goBack(): void {
            this.$ionicHistory.goBack();
        }

        public checkBack(e: Event) {
            var page = this.$ionicHistory.currentStateName();
            if (page === 'main') {
                var nav: any = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                } else {
                    window.close();
                }
            } else {
                this.goBack();
            }
        }
    }
} 

