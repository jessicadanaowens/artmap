describe('ExistingMarkerService', function () {
  var ExistingMarkerService, $scope, $httpBackend, $resource, Marker;

  beforeEach(module('mapApp'));

  beforeEach(inject(function (_ExistingMarkerService_, $rootScope, _$httpBackend_, _Marker_) {
    ExistingMarkerService = _ExistingMarkerService_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    Marker = _Marker_;

    ExistingMarkerService.setup($scope);
  }));

  describe('setup', function () {
    it('attaches items to the the scope', function () {
      expect($scope.markerPath).toBeDefined();
      expect($scope.createGoogleMarker).toBeDefined();
      expect($scope.placeMarkersOnMap).toBeDefined();
      expect($scope.dropMarker).toBeDefined();
    });
  });

  describe('#getAndPlaceMarkersOnMap', function() {
    it('retrieves markers from the database', function() {
      spyOn(Marker, "query");

      $scope.getAndPlaceMarkersOnMap();

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
      markers = ["marker1", "marker2"];
      $scope.markers = ["marker1", "marker2"];

      spyOn($scope, "dropMarker");

      $scope.placeMarkersOnMap(markers);

      expect($scope.markerLetter).toBeDefined();
      expect($scope.markerIcon).toBeDefined();
      expect($scope.dropMarker).toHaveBeenCalledWith(0);
      expect($scope.dropMarker).toHaveBeenCalledWith(1);
    });
  })
});

