describe('map', function () {
  beforeEach(module('mapApp'));

  var $scope, $controller, NewMarkerService, ExistingMarkerService, lon, lat, formattedAddress, searchParams;

  beforeEach(inject(function (_$rootScope_, _$controller_, _NewMarkerService_, _ExistingMarkerService_,_autocompleteService_) {
    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    NewMarkerService = _NewMarkerService_;
    ExistingMarkerService = _ExistingMarkerService_;
    autocompleteService = _autocompleteService_;

    lon = 39;
    lat = -104;
    formattedAddress = "Denver, CO 80218";

    $controller('mapCtrl', {$scope: $scope, lon: lon, lat: lat, formattedAddress: formattedAddress, NewMarkerService: NewMarkerService, ExistingMarkerService: ExistingMarkerService, autocompleteService: autocompleteService});
  }));

  describe('initial map load', function () {
    it("sets up services", function() {
      it("allows the user to add markers to the map", function() {
        spyOn(NewMarkerService, "setup");
        $scope.init();
        expect(NewMarkerService.setup).toHaveBeenCalledWith($scope)
      });
      it("allows users to view existing markers", function () {
        spyOn(ExistingMarkerService, "setup");
        $scope.init();
        expect(ExistingMarkerService.setup).toHaveBeenCalledWith($scope)
      });
      it("allows the user to search for places", function() {
        spyOn(autocompleteService, "setup");
        $scope.init();
        expect(autocompleteService.setup).toHaveBeenCalledWith($scope);
      });
      it("provides a list countries for the user select", function() {
        spyOn(Countries, "setup");
        $scope.init();
        expect(Countries.setup).toHaveBeenCalledWith($scope);
      });
    });

    it("attaches parameters passed from the previous page to the scope", function() {
      $scope.init();

      expect($scope.lon).toBeDefined();
      expect($scope.lat).toBeDefined();
      expect($scope.formattedAddress).toBeDefined();
    });

    it("creates a map", function() {
      expect($scope.map).toBeUndefined;

      $scope.init();
      expect($scope.map).toBeTruthy;
    });

    it("creates the center of the map based on the lat and lon parameters", function() {
      expect($scope.mapOptions).toBeUndefined;

      $scope.init();

      expect($scope.lon).toEqual(39);
      expect($scope.lat).toEqual(-104);
      expect($scope.mapOptions.center["A"]).toEqual(39);
      expect($scope.mapOptions.center["F"]).toEqual(-104);
    });

    it("restricts the map to the US", function() {
      expect($scope.countryRestrict).toBeUndefined();
      $scope.init();
      expect($scope.countryRestrict).toEqual({ 'country': 'us' })
    });

    it('creates the map based on the params', function() {
      expect($scope.idleMapListener).toBeUndefined();
      $scope.init();
      expect($scope.idleMapListener).toBeDefined();
    });

    it('sets up a google maps event listener for when the user changes the selected country', function() {
      spyOn(google.maps.event, "addDomListener").and.callThrough;

      $scope.init();

      expect(google.maps.event.addDomListener).toHaveBeenCalledWith(document.getElementById('country'), 'change', $scope.setAutocompleteCountry);
    });
  });

  describe('map functionality', function () {
    it("finds the bounds of the map when they are not defined", function() {
      $scope.map = {
        getBounds: function() {
          return true
        }
      };

      spyOn($scope.map, "getBounds");

      $scope.bounds = undefined;
      $scope.findBounds();
      expect($scope.map.getBounds).toHaveBeenCalled();

    });

    it("returns the map bounds if they are already defined", function() {
      $scope.map = {
        getBounds: function() {
          return true
        }
      };

      spyOn($scope.map, "getBounds");

      $scope.bounds = true;
      $scope.findBounds();
      expect($scope.map.getBounds).not.toHaveBeenCalled();
    });
  });
});