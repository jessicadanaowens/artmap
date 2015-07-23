describe('Flash', function () {
  var Flash, $rootScope, $timeout;

  beforeEach(module('mapApp'));

  beforeEach(inject(function(_$rootScope_, _Flash_, _$timeout_){
    Flash = _Flash_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  describe('setMessage', function () {
    describe('with unique topics', function () {
      it('pushes independently', function () {
        Flash.setMessage('topic1', 'testing');
        Flash.setMessage('topic2', 'also testing');

        expect(Flash.getMessage('topic1')).toEqual('testing');
        expect(Flash.getMessage('topic2')).toEqual('also testing');
      });
    });

    it('sets a timeout of 10 seconds to clear the message', function () {
      Flash.setMessage('topic', 'testing');

      expect(Flash.getMessage('topic')).toEqual('testing');

      $timeout.flush();

      expect(Flash.getMessage('topic')).toEqual(undefined);
    });
  });
});