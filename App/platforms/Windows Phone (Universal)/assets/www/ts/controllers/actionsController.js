/// <reference path="../imports.ts" />
var App;
(function (App) {
    'use strict';
    var ActionsController = (function () {
        function ActionsController($scope) {
            var _this = this;
            this.$scope = $scope;
            $scope.exampleAction = function () { return _this.exampleAction(); };
            $scope.property = 'Void';
        }
        ActionsController.prototype.exampleAction = function () {
            this.$scope.property = 'Clicked';
        };
        ActionsController.$inject = [
            '$scope',
        ];
        return ActionsController;
    })();
    App.ActionsController = ActionsController;
})(App || (App = {}));
//# sourceMappingURL=actionsController.js.map