angular.module('mapApp').service('ExistingMarkerService', [ '$resource', 'Marker', 'Flash', '$compile',
  function ($resource, Marker, Flash, $compile) {
    return {
      setup: function setup($scope) {
        $scope.flash = Flash;
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

        $scope.getAndPlaceMarkersOnMap = function getMarkers() {
          Marker.query(function (markers){
            $scope.placeMarkersOnMap(markers);
          });
        };

        $scope.createGoogleMarker = function createGoogleMarker(i, markers) {
          $scope.markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i].lat, markers[i].lon),
            animation: google.maps.Animation.DROP,
            icon: $scope.markerIcon
          });
        };

        $scope.placeMarkersOnMap = function(markers) {
          for (var i = 0; i < markers.length; i++) {
            $scope.markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            $scope.markerIcon = $scope.markerPath + $scope.markerLetter + '.png';

            $scope.createGoogleMarker(i, markers);

            setTimeout($scope.dropMarker(i), i * 100);
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

