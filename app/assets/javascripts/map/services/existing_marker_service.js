angular.module('mapApp').service('ExistingMarkerService', [ '$resource', 'Marker', '$compile',
  function ($resource, Marker, $compile) {
    return {
      setup: function setup($scope) {
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

        $scope.getAndPlaceMarkersOnMap = function getMarkers() {
          Marker.query(function (markers){
            $scope.placeMarkersOnMap(markers);
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

        $scope.createGoogleMarker = function createGoogleMarker(i, markers) {
          $scope.markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i].lat, markers[i].lon),
            animation: google.maps.Animation.DROP,
            icon: $scope.markerIcon,
            name: markers[i].name
          });
        };
        $scope.dropMarker = function dropMarker(i) {
          return function() {
            $scope.markers[i].setMap($scope.map);
            google.maps.event.addListener($scope.markers[i], 'click', showInfoWindow);
          };
        };

        $scope.existingInfoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });

        function showInfoWindow() {
          var marker = this;
          $scope.existingMarker = marker;
          $scope.existingInfoWindow.open($scope.map, marker);

          $scope.$apply(function() {
            $compile(document.getElementById("infoContent"))($scope)
          });
        }
      }
    }
  }]);

