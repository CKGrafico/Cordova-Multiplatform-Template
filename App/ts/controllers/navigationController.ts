/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class NavigationController {


        public static $inject = [
            '$scope',
            '$ionicSideMenuDelegate'
        ];

        constructor(
            private $scope: /*PYApp.INavigationScope*/ any,
            private $ionicSideMenuDelegate: /*Ionic.ISideMenuDelegate*/ any
            ) {

            this.$scope.toggleMenu = () => this.toggleMenu();
            this.$scope.goBack = () => this.goBack();
            this.$scope.needBack = false;
            document.addEventListener('backbutton', e => this.checkBack(e), false);
            
        }

        // Show or hide menu
        public toggleMenu(): void {
            this.$ionicSideMenuDelegate.toggleLeft();
        }

        public goBack(): void {
            //this.$ionicHistory.goBack();
        }

        public checkBack(e: Event) {
            //var page = this.$ionicHistory.currentStateName();
            //if (page === 'main') {
            //    var nav: any = navigator;
            //    if (nav.app && nav.app.exitApp) {
            //        nav.app.exitApp();
            //    } else {
            //        window.close();
            //    }
            //} else {
            //    this.goBack();
            //}
        }
    }
} 

