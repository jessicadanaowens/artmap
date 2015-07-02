describe('map', function () {
  beforeEach(module('mapApp'));

  var $scope, $controller, newMarkerService, lon, lat, formattedAddress;

  beforeEach(inject(function (_$rootScope_, _$controller_, _createMarkerService_, _autocompleteService_) {
    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    createMarkerService = _createMarkerService_;
    autocompleteService = _autocompleteService_;

    lon = 39;
    lat = -104;
    formattedAddress = "Denver, CO 80218";

    $controller('mapCtrl', {$scope: $scope, lon: lon, lat: lat, formattedAddress: formattedAddress, createMarkerService: createMarkerService, autocompleteService: autocompleteService});
  }));

  describe('initial map load', function () {
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

    it("sets up the google Place Service for the map", function() {
      spyOn(google.maps.places, "PlacesService").and.callThrough;

      $scope.init();

      expect(google.maps.places.PlacesService).toHaveBeenCalledWith($scope.map);
    });

    it('sets up a google maps event listener for when the user changes the selected country', function() {
      spyOn(google.maps.event, "addDomListener").and.callThrough;

      $scope.init();

      expect(google.maps.event.addDomListener).toHaveBeenCalledWith(document.getElementById('country'), 'change', $scope.setAutocompleteCountry);
    });

    //it('changes the maps component restrictions, center, and zoom when the user selects a country', function() {
    //  $('body').append('<form id="country">au</form>');
    //
    //  $scope.map = {
    //    setCenter: function(){
    //      return true
    //    },
    //    setZoom: function() {
    //      return true
    //    }
    //  };
    //
    //  $scope.autocomplete = {
    //    setComponentRestrictions: function() {
    //      return true
    //    }
    //  };
    //
    //  $scope.countries = {
    //    'au': {
    //      center: new google.maps.LatLng(-25.3, 133.8),
    //      zoom: 4
    //    },
    //    'br': {
    //      center: new google.maps.LatLng(-14.2, -51.9),
    //      zoom: 3
    //    },
    //
    //  spyOn($scope.autocomplete, "setComponentRestrictions");
    //  spyOn($scope.map, "setCenter");
    //  spyOn($scope.map, "setZoom");
    //
    //  $scope.setAutocompleteCountry();
    //
    //  expect($scope.autocomplete.setComponentRestrictions).toHaveBeenCalledWith([]);
    //  expect($scope.map.setCenter).toHaveBeenCalledWith(new google.maps.LatLng(15, 0));
    //  expect($scope.map.setZoom).toHaveBeenCalledWith(2);
    //
    //  $('#country').remove();
    //
    //});

    it("sets up a google map listeners", function() {
      //spyOn(google.maps.event, "addListener");
      //
      //$scope.init()
      //
      //expect(google.maps.event.addListener).toHaveBeenCalledWith([ ({  }), 'place_changed', Function ], [ ({  }), 'idle', Function ], [ ({  }), 'click', Function ])
    });

    it("calls the setUpNewMarkerService so that the user can add markers to the map", function() {
      createMarkerService.setup($scope);

      $scope.init();

      expect($scope.setUpNewMarkerService).toBeDefined();
    });

    it("calls the autocomplete service so that the user can search for places", function() {
      spyOn(autocompleteService, "setup");
      $scope.init();
      expect(autocompleteService.setup).toHaveBeenCalledWith($scope);

    })
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