describe('mapCtrl', function () {
  beforeEach(module('mapApp'));

  var $scope, $controller, lon, lat, formattedAddress;

  beforeEach(inject(function (_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();
    $controller = _$controller_;

    lon = 39;
    lat = -104;
    formattedAddress = "Denver, CO 80218";

    $controller('mapCtrl', {$scope: $scope, lon: lon, lat: lat, formattedAddress: formattedAddress});
  }));

  describe('initial map load', function () {
    it("creates a map", function() {
      expect($scope.map).toBeUndefined;

      $scope.init();
      expect($scope.map).toBeTruthy;
    });

    it("populates the search bar with the query passed from the home page", function() {
      $scope.init();
      expect($scope.formattedAddress).toEqual("Denver, CO 80218")
    });

    it("creates the center of the map based on the lat and lon parameters", function() {
      expect($scope.mapOptions).toBeUndefined;
      expect($scope.mapOptions).toBeUndefined;

      $scope.init();

      expect($scope.lon).toEqual(39);
      expect($scope.lat).toEqual(-104);
      expect($scope.mapOptions.center["A"]).toEqual(39);
      expect($scope.mapOptions.center["F"]).toEqual(-104);
    });

    it("initially restricts the map to the US", function() {
      $scope.init();
      expect($scope.countryRestrict.country).toEqual('us');
    });

//    it("creates a listener that will fire a function when the search query is changed", function() {
//      $scope.init();
//
//      expect($scope.autocompleteListener).toBeDefined()
//    });

//    it("creates a dom listener that fires a function when a country is selected", function() {
//      $scope.init();
//
//      expect($scope.countryListener).toBeDefined()
//    });

    it("captures the search query, defines the search query type as 'cities' and restricts the query to the country selected", function() {
      spyOn(google.maps.places, "Autocomplete");

      $scope.init();

      expect($scope.autocomplete).toBeDefined();
      expect(google.maps.places.Autocomplete).toHaveBeenCalledWith( null, { types: ['(cities)'], componentRestrictions: $scope.countryRestrict});
    });

    it("sets up a listener to find rides on init", function() {
      spyOn(google.maps.event, "addListener").and.callThrough();

      $scope.init();

      expect($scope.rides).toBeDefined();
    });
  });
});