describe('autocompleteService', function () {
  beforeEach(module('mapApp'));

  var autocompleteService, $scope;

  beforeEach(inject(function (_autocompleteService_, $rootScope) {
    autocompleteService = _autocompleteService_;
    $scope = $rootScope.$new();
  }));

  describe('setup', function () {
    it('attaches functions to the the scope', function () {
      autocompleteService.setup($scope);

      expect($scope.countryRestrict).toBeDefined();
      expect($scope.autocomplete).toBeDefined();
    });

    it('uses google to return autocomplete results restricted to cities and country', function() {
      spyOn(google.maps.places, "Autocomplete").and.callThrough();

      autocompleteService.setup($scope);

      expect(google.maps.places.Autocomplete).toHaveBeenCalledWith((document.getElementById('autocomplete')),
        { types: ['(cities)'], componentRestrictions: $scope.countryRestrict})
    })
  });
});
