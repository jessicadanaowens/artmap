describe('Countries', function () {
  var $rootScope;

  beforeEach(module('mapApp'));

  beforeEach(inject(function(_$rootScope_, _Countries_){
    $scope = _$rootScope_;
    Countries = _Countries_;
  }));

  describe('setup', function () {
    it('defines the countries', function() {
      Countries.setup($scope);

      expect($scope.countries).toBeDefined();
    })
  }