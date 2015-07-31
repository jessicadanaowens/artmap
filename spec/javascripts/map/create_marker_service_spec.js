describe('MarkerService', function () {
  var MarkerService, $scope, $httpBackend, $resource, Marker;

  beforeEach(module('mapApp'));

  beforeEach(inject(function (_MarkerService_, $rootScope, _$httpBackend_, _Marker_) {
    MarkerService = _MarkerService_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    Marker = _Marker_;


    MarkerService.setup($scope);
  }));

  describe('setup', function () {
    it('attaches items to the the scope', function () {
      MarkerService.setup($scope);

      expect($scope.marker).toBeDefined();
      expect($scope.newMarkerForm).toBeDefined();
      expect($scope.infowindow).toBeDefined();
      expect($scope.setUpNewMarkerService).toBeDefined();
      expect($scope.markerPath).toBeDefined();
      expect($scope.markers).toBeDefined();
      expect($scope.placeMarkersOnMap).toBeDefined();
      expect($scope.dropMarker).toBeDefined();
    });
  });

  describe('markers', function() {
    it('sets up listeners that create markers and open an infoWindow when the user clicks on the map or marker', function() {
      spyOn(google.maps.event, "addListener").and.callThrough();

      var map = "map";

      $scope.setUpNewMarkerService(map);
      expect(google.maps.event.addListener).toHaveBeenCalled();
    });

    it('uses the google maps infowindow service to show a form to add a new marker', function() {
      $scope.newMarkerForm = "<table>";
      spyOn(google.maps, "InfoWindow");

      MarkerService.setup($scope);

      expect($scope.infowindow).toBeDefined();
      expect($scope.newMarkerForm).toBeDefined();
      expect(google.maps.InfoWindow).toHaveBeenCalledWith({content: $scope.newMarkerForm});
    });

    it('retrieves markers from the database', function() {
      spyOn(Marker, "query");

      $scope.getAndPlaceMarkersOnMap()

      expect(Marker.query).toHaveBeenCalled();
    });

    it('creates google markers from the retrieved markers', function() {
      markers = ["marker1", "marker2"];

      spyOn($scope, "createGoogleMarker");

      $scope.placeMarkersOnMap(markers);

      expect($scope.createGoogleMarker).toHaveBeenCalledWith(0, markers);
      expect($scope.createGoogleMarker).toHaveBeenCalledWith(1, markers);
    });

    it('places google markers on the map', function() {
      spyOn($scope, "dropMarker");

      $scope.placeMarkersOnMap(markers);

      expect($scope.markerLetter).toBeDefined();
      expect($scope.markerIcon).toBeDefined();
      expect($scope.dropMarker).toHaveBeenCalled();
    });

    it('saves the marker in the database successfully', function() {
      $scope.selectedMarker = { getPosition: function() {
        return true
      }};

      $httpBackend.expectPOST('/markers').respond({message: "You're gallery was successfully created"});
      spyOn($scope.marker, "$save");

      $scope.saveData();

      $scope.$digest();

      expect($scope.marker.$save).toHaveBeenCalled();
      expect($scope.marker.name).toBeDefined();
      expect($scope.marker.lat).toBeDefined();
      expect($scope.marker.lon).toBeDefined();
      expect($scope.marker.gallery).toBeDefined();
      expect($scope.marker.city).toBeDefined();
      expect($scope.marker.country).toBeDefined();
    });
  })
});

