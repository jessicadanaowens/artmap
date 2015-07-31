angular.module('mapApp').service('NewMarkerService', [ '$resource', 'Marker', 'Flash', '$compile',
  function ($resource, Marker, Flash, $compile) {
    return {
      setup: function setup($scope) {
        $scope.marker = new Marker({userId: 1});

        $scope.newMarkerForm = "<table id='newMarkerForm'>" +
          "<h4>Add a gallery, private collection, or artist to the map.</h4>" +
          "<tr><td>Name:</td> <td><input type='text' id='name' ng-model='name'/> </td> </tr>" +
          "<tr><td>Type:</td> <td><select id='type'>" +
          "<option value='gallery' SELECTED>gallery</option>" +
          "<option value='private-collection'>private collection</option>" +
          "<option value='artist'>artist</option>" +
          "</select> </td></tr>" +
          "<tr><td></td><td><input type='button' value='Save & Close' ng-click='saveData()'/></td></tr>";

        $scope.infowindow = new google.maps.InfoWindow({content: $scope.newMarkerForm});

        $scope.createMarkerOnMapClick = function createMarkerOnMapClick(map) {
          google.maps.event.addListener(map, "click", function (event) {
            $scope.createSelectedMarker(event, map);
            $scope.addSelectedMarkerToMarkers();
            $scope.createInfoWindowOnClick(map);
          });
        };

        $scope.createSelectedMarker = function createSelectedMarker(event, map) {
          $scope.selectedMarker = new google.maps.Marker({
            position: event.latLng,
            map: map
          });
        };

        $scope.addSelectedMarkerToMarkers = function addSelectedMarkerToMarkers() {
          $scope.markers.push($scope.selectedMarker);
        };

        $scope.createInfoWindowOnClick = function createInfoWindowOnClick(map) {
          google.maps.event.addListener($scope.selectedMarker, "click", function (event) {
            $scope.infowindow.open(map, $scope.selectedMarker);
            $scope.$apply(function() {
              $compile(document.getElementById("newMarkerForm"))($scope)
            });
          });
        };

        $scope.saveData = function saveData() {
          $scope.marker.name = $scope.name;
          $scope.marker.lat = $scope.selectedMarker.position["G"];
          $scope.marker.lon = $scope.selectedMarker.position["K"];
          $scope.marker.gallery = true;
          $scope.marker.name = $scope.name;

          $scope.marker.$save(function (data){
            Flash.setMessage("success", "You're gallery was successfully created");
            $scope.infowindow.close();
          });
        }
      }
    }
  }
]);
