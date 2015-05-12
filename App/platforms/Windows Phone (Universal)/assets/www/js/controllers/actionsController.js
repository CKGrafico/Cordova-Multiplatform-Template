/// <reference path="../imports.ts" />
var App;
(function (App) {
    'use strict';
    var ActionsController = (function () {
        function ActionsController($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.exampleAction = function () { return _this.exampleAction(); };
            $scope.property = 'Void';
            $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function (result) {
                var a = result.data.breweries;
            });
        }
        ActionsController.prototype.exampleAction = function () {
            this.$scope.property = 'Clicked';
        };
        ActionsController.$inject = [
            '$scope',
            '$http'
        ];
        return ActionsController;
    })();
    App.ActionsController = ActionsController;
})(App || (App = {}));
