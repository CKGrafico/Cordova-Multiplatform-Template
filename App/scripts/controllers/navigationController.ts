/// <reference path="../imports.ts" />

module App {
    'use strict';

    export class NavigationController {

        public static $inject = [
            '$ionicHistory',
            '$ionicTabsDelegate'
        ];

        constructor(
            private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicTabsDelegate: ionic.tabs.IonicTabsDelegate
            ) {

            document.addEventListener('backbutton', e => this.checkBack(e), false);
        }

        public goBack(): void {
            this.$ionicHistory.goBack();
        }

        public checkBack(e: Event) {
            var page = this.$ionicHistory.currentStateName();
            if (page === 'tabs.home') {
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

        // On Windows phone
        public onSwipeLeft() {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex()+1)
        }

        public onSwipeRight() {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() -1)
        }
    }

    angular.module('App').controller('navigationController', NavigationController);

} 

