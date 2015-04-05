/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class NavigationController {


        public static $inject = [
            '$scope',
            '$ionicHistory',
            '$ionicNavBarDelegate'
        ];

        constructor(
            private $scope: /*PYApp.INavigationScope*/ any,
            private $ionicHistory: Ionic.IHistory,
            private $ionicNavBarDelegate: /*Ionic.ISideMenuDelegate*/ any
            ) {
            document.addEventListener('backbutton', e => this.checkBack(e), false);

            $scope.setNavTitle = function (title) {
                $ionicNavBarDelegate.title(title);
            }

            
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

