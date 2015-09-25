angular.module('mapApp').service('ExistingMarkerService', [ '$resource', 'Marker', '$compile',
  function ($resource, Marker, $compile) {
    return {
      setup: function setup($scope) {
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

        $scope.getAndPlaceMarkersOnMap = function getMarkers(bounds) {
          if($scope.allMarkers.length == 0) {
            Marker.query(function (markers){
              $scope.allMarkers = markers;
              $scope.placeMarkersOnMap();
              $scope.findMarkersInBounds(bounds, $scope.allMarkers);
            });
          } else {
            $scope.findMarkersInBounds(bounds, $scope.allMarkers);

            $scope.$apply(function() {
              $compile(document.getElementById("infoContent"))($scope)
            });

          }
        };

        $scope.findMarkersInBounds = function findMarkersInBounds(bounds, markers) {
          var lat, lon, i, length;
          $scope.markersInBounds = [];
          length = markers.length - 1;

          for(i = length; i > -1; i--) {
            lat = markers[i].lat;
            lon = markers[i].lon;
            if (bounds.contains(new google.maps.LatLng(lat, lon))) {
              $scope.markersInBounds.push(markers[i])
            }
          }
        };

        $scope.placeMarkersOnMap = function() {
          for (var i = 0; i < $scope.allMarkers.length; i++) {
            $scope.markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            $scope.markerIcon = $scope.markerPath + $scope.markerLetter + '.png';

            $scope.createGoogleMarker(i, $scope.allMarkers);
          }
        };

        $scope.createGoogleMarker = function createGoogleMarker(i, markers) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i].lat, markers[i].lon),
            animation: google.maps.Animation.DROP,
            icon: $scope.markerIcon,
            name: markers[i].name
          });

          setTimeout($scope.dropMarker(marker), i * 100);
        };
        
        $scope.dropMarker = function dropMarker(marker) {
          return function() {
            marker.setMap($scope.map);
            google.maps.event.addListener(marker, 'click', showInfoWindow);
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

