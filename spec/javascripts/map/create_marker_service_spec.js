describe('createMarkerService', function () {
  var createMarkerService, $scope, $httpBackend, $resource;

  beforeEach(module('mapApp'));

  beforeEach(inject(function (_createMarkerService_, $rootScope, _$httpBackend_) {
    createMarkerService = _createMarkerService_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    createMarkerService.setup($scope);
  }));

  describe('setup', function () {
    it('attaches functions to the the scope', function () {
      createMarkerService.setup($scope);

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

      createMarkerService.setup($scope);

      expect($scope.infowindow).toBeDefined();
      expect($scope.newMarkerForm).toBeDefined();
      expect(google.maps.InfoWindow).toHaveBeenCalledWith({content: $scope.newMarkerForm});
    });

    it('places the markers on the map', function() {
      spyOn(google.maps, "Marker");
      spyOn($scope, "dropMarker");
      results = [{geometry: "geometry", location: "location"}];

      $scope.placeMarkersOnMap(results);

      expect(google.maps.Marker).toHaveBeenCalled();
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
      expect($scope.marker.position).toBeDefined();
      expect($scope.marker.gallery).toBeDefined();
      expect($scope.marker.name).toBeDefined();
    });
  })
});

