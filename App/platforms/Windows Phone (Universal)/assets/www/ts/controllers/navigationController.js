/// <reference path="../imports.ts" />
var App;
(function (App) {
    'use strict';
    var NavigationController = (function () {
        function NavigationController($scope, $ionicHistory) {
            var _this = this;
            this.$scope = $scope;
            this.$ionicHistory = $ionicHistory;
            document.addEventListener('backbutton', function (e) { return _this.checkBack(e); }, false);
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
        NavigationController.$inject = [
            '$scope',
            '$ionicHistory',
        ];
        return NavigationController;
    })();
    App.NavigationController = NavigationController;
})(App || (App = {}));
//# sourceMappingURL=navigationController.js.map