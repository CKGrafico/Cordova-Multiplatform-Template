/// <reference path="../imports.ts" />
var App;
(function (App) {
    'use strict';
    var NavigationController = (function () {
        function NavigationController($scope /*&ng.IScope*/, $ionicHistory, $ionicTabsDelegate) {
            var _this = this;
            this.$scope = $scope;
            this.$ionicHistory = $ionicHistory;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            document.addEventListener('backbutton', function (e) { return _this.checkBack(e); }, false);
            this.$scope.onSwipeLeft = function () { return _this.onSwipeLeft(); };
            this.$scope.onSwipeRight = function () { return _this.onSwipeRight(); };
        }
        NavigationController.prototype.goBack = function () {
            this.$ionicHistory.goBack();
        };
        NavigationController.prototype.checkBack = function (e) {
            var page = this.$ionicHistory.currentStateName();
            if (page === 'main') {
                var nav = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                }
                else {
                    window.close();
                }
            }
            else {
                this.goBack();
            }
        };
        NavigationController.prototype.onSwipeLeft = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() + 1);
        };
        NavigationController.prototype.onSwipeRight = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() - 1);
        };
        NavigationController.$inject = [
            '$scope',
            '$ionicHistory',
            '$ionicTabsDelegate'
        ];
        return NavigationController;
    })();
    App.NavigationController = NavigationController;
})(App || (App = {}));
