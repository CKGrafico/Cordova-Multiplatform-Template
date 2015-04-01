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
            
        }

        // Show or hide menu
        public toggleMenu(): void {
            this.$ionicSideMenuDelegate.toggleLeft();
        }
    }
} 

