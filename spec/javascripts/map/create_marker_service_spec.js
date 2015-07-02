describe('createMarkerService', function () {
  beforeEach(module('mapApp'));

  var createMarkerService, $scope;

  beforeEach(inject(function (_createMarkerService_, $rootScope) {
    createMarkerService = _createMarkerService_;
    $scope = $rootScope.$new();
  }));

  describe('setup', function () {
    it('attaches functions to the the scope', function () {
      createMarkerService.setup($scope);

      expect($scope.newMarkerForm).toBeDefined();
      expect($scope.infowindow).toBeDefined();
      expect($scope.setUpNewMarkerService).toBeDefined();
    });
  });

  describe('markers', function() {
    it('sets up listeners that creates a marker and open an infoWindow when the user clicks on the map or marker', function() {
      spyOn(google.maps.event, "addListener").and.callThrough();

      var map = "map";
      createMarkerService.setup($scope);

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
  })
});

