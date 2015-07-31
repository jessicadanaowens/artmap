describe('NewMarkerService', function () {
  var NewMarkerService, $scope, $httpBackend, $resource, Marker;

  beforeEach(module('mapApp'));

  beforeEach(inject(function (_NewMarkerService_, $rootScope, _$httpBackend_, _Marker_) {
    NewMarkerService = _NewMarkerService_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    Marker = _Marker_;

    NewMarkerService.setup($scope);
  }));

  describe('setup', function () {
    it('attaches items to the the scope', function () {
      NewMarkerService.setup($scope);

      expect($scope.newMarkerForm).toBeDefined();
      expect($scope.infowindow).toBeDefined();
      expect($scope.createMarkerOnMapClick).toBeDefined();
      expect($scope.createSelectedMarker).toBeDefined();
      expect($scope.addSelectedMarkerToMarkers).toBeDefined();
      expect($scope.createInfoWindowOnClick).toBeDefined();
      expect($scope.saveData).toBeDefined();
    });
  });

  describe('createMarkerOnMapClick', function() {
    it('creates a selected marker', function() {
     var event = "event";
      var map = "map";
      $scope.createSelectedMarker(event, map);
      expect($scope.selectedMarker).toBeDefined();
    });

    it('adds the selected marker to the markers list', function() {
      $scope.markers = []
      $scope.selectedMarker = "marker";

      $scope.createSelectedMarker;

      expect($scope.markers).toEqual [$scope.selectedMarker]

    });

    it('saves the marker in the database successfully', function() {
      $scope.selectedMarker = {
        position: {"G": true, "K": true}
      };

      $httpBackend.expectPOST('/markers').respond({message: "You're gallery was successfully created"});
      $scope.marker = {
        $save: function() {
          return true
        }
      };
      $scope.name = "name";

      spyOn($scope.marker, "$save");

      $scope.saveData();

      $scope.$digest();

      expect($scope.marker.$save).toHaveBeenCalled();
      expect($scope.marker.name).toBeDefined();
      expect($scope.marker.lat).toBeDefined();
      expect($scope.marker.lon).toBeDefined();
      expect($scope.marker.gallery).toBeDefined();
    });
  })
});

