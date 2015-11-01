module Tabs {
    'use strict';

    export class NavigationController {

        constructor(
            private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicTabsDelegate: ionic.tabs.IonicTabsDelegate,
            private $ionicPlatform: ionic.platform.IonicPlatformService
            ) {

            $ionicPlatform.registerBackButtonAction(e => this.checkBack(e), 100);
        }

        public goBack(): void {
            this.$ionicHistory.goBack();
        }

        public checkBack(e: Event) {
            console.log(1111111111111111111111111111);
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

    angular.module(Constants.Paths.Tabs)
        .controller('navigationController', NavigationController);

} 

