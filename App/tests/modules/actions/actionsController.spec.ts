module Actions{
    describe('Actions Controller', () => {
      var actionsController: ActionsController;

      beforeEach(angular.mock.module('app'));

      beforeEach(inject(($controller: ng.IControllerService) => {

      actionsController = $controller('actionsController') as ActionsController;
      }));

      it('should add some text to property after time', inject(($timeout: ng.ITimeoutService) => {
        $timeout.flush();
        expect(actionsController.text).toContain('Lorem', 'no text added to property after $timeout');
      }));
  });
}



