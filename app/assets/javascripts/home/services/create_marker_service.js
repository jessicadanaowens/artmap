angular.module('mapApp').service('createMarkerService', [
  function () {
    return {
      setup: function setup($scope) {
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
        $scope.markers = [];
        $scope.newMarkerForm = "<table>" +
          "<tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
          "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
          "<tr><td>Type:</td> <td><select id='type'>" +
          "<option value='bar' SELECTED>bar</option>" +
          "<option value='restaurant'>restaurant</option>" +
          "</select> </td></tr>" +
          "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>";

        $scope.infowindow = new google.maps.InfoWindow({content: $scope.newMarkerForm});

        $scope.setUpNewMarkerService = function(map) {
          google.maps.event.addListener(map, "click", function (event) {
            $scope.marker = new google.maps.Marker({
              position: event.latLng,
              map: map
            });

            google.maps.event.addListener($scope.marker, "click", function () {
              $scope.infowindow.open(map, $scope.marker);
            });
          });
        };

        $scope.placeMarkersOnMap = function(results) {
          for (var i = 0; i < results.length; i++) {
            var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            var markerIcon = $scope.markerPath + markerLetter + '.png';
            // Use marker animation to drop the icons incrementally on the map.
            $scope.markers[i] = new google.maps.Marker({
              position: results[i].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: markerIcon
            });
            // If the user clicks a hotel marker, show the details of that hotel
            // in an info window.
            $scope.markers[i].placeResult = results[i];
//            google.maps.event.addListener($scope.markers[i], 'click', showInfoWindow);
            setTimeout($scope.dropMarker(i), i * 100);
//            addResult(results[i], i);
          }
        };

        $scope.dropMarker = function dropMarker(i) {
          return function() {
            $scope.markers[i].setMap($scope.map);
          };
        };
      }
    }
  }]);

