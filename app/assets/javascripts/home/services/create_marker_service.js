angular.module('mapApp').service('createMarkerService', [
  function () {
    return {
      setup: function setup($scope) {
        $scope.newMarkerForm = "<table>" +
          "<tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
          "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
          "<tr><td>Type:</td> <td><select id='type'>" +
          "<option value='bar' SELECTED>bar</option>" +
          "<option value='restaurant'>restaurant</option>" +
          "</select> </td></tr>" +
          "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>";

        $scope.infowindow = new google.maps.InfoWindow({content: $scope.newMarkerForm});

        $scope.setUpNewMarkerService = function (map) {
          google.maps.event.addListener(map, "click", function (event) {
            $scope.marker = new google.maps.Marker({
              position: event.latLng,
              map: map
            });

            google.maps.event.addListener($scope.marker, "click", function () {
              $scope.infowindow.open(map, $scope.marker);
            });
          });
        }
      }
    }
  }]);

