describe('ActionsController', function () {
    beforeEach(App.onDeviceReady);
    beforeEach(module("App"));
    
    var $controller, $scope;

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller = $controller('actionsController', {
            '$scope': $scope
        });
    }));
    
    describe('$scope.property', function () {

        it('set property to "clicked" if exampleAction is called', function () {
            $scope.exampleAction();
            expect($scope.property).toEqual('Clicked');
        });
    });
});