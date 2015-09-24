angular.module('mapApp').service('ExistingMarkerService', [ '$resource', 'Marker', '$compile',
  function ($resource, Marker, $compile) {
    return {
      setup: function setup($scope) {
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

        $scope.getAndPlaceMarkersOnMap = function getMarkers(bounds) {
          if($scope.allMarkers.length == 0) {
            Marker.query(function (markers){
              $scope.allMarkers = markers;
              var markersInBounds = $scope.markersInBounds(bounds);
              $scope.placeMarkersOnMap(markersInBounds);
            });
          } else {
            clearMarkers();
            var markersInBounds = $scope.markersInBounds(bounds);
            $scope.placeMarkersOnMap(markersInBounds);
          }
        };

        $scope.markersInBounds = function markersInBounds(bounds) {
          var lat, lon, i;
          var markers = [];
          i = $scope.allMarkers.length - 1;

          while (i -= 1) {
            lat = $scope.allMarkers[i].lat;
            lon = $scope.allMarkers[i].lon;
            if (bounds.contains(new google.maps.LatLng(lat, lon))) {
              markers.push($scope.allMarkers[i])
            }
          }

          return markers;
        };

        function clearMarkers() {
          for (var i = 0; i < $scope.visibleMarkers.length; i++) {
            if ($scope.visibleMarkers[i]) {
              $scope.visibleMarkers[i].setMap(null);
            }
          }
          $scope.visibleMarkers = [];
        }

        $scope.placeMarkersOnMap = function(markers) {
          for (var i = 0; i < markers.length; i++) {
            $scope.markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            $scope.markerIcon = $scope.markerPath + $scope.markerLetter + '.png';

            $scope.createGoogleMarker(i, markers);
          }
        };

        $scope.createGoogleMarker = function createGoogleMarker(i, markers) {
          $scope.visibleMarkers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i].lat, markers[i].lon),
            animation: google.maps.Animation.DROP,
            icon: $scope.markerIcon,
            name: markers[i].name
          });

          setTimeout($scope.dropMarker(i), i * 100);
        };
        
        $scope.dropMarker = function dropMarker(i) {
          return function() {
            $scope.visibleMarkers[i].setMap($scope.map);
            google.maps.event.addListener($scope.visibleMarkers[i], 'click', showInfoWindow);
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

