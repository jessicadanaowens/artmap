angular.module('mapApp').service('ExistingMarkerService', [ '$resource', 'Marker', '$compile',
  function ($resource, Marker, $compile) {
    return {
      setup: function setup($scope) {
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

        $scope.getAndPlaceMarkersOnMap = function getMarkers(bounds) {
          if($scope.allMarkers.length == 0) {
            Marker.query(function (markers){
              $scope.allMarkers = markers;
              var markersInBounds = $scope.markersInBounds(bounds, $scope.allMarkers);
              $scope.placeMarkersOnMap(markersInBounds);
            });
          } else {
            clearNonVisibleMarkers(bounds);
            //var markersInBounds = $scope.markersInBounds(bounds, $scope.visibleMarkers);
            //$scope.placeMarkersOnMap(markersInBounds);
          }
        };

        $scope.markersInBounds = function markersInBounds(bounds, markers) {
          var lat, lon, i, length;
          var markersInBounds = [];
          length = markers.length - 1;

          for(i = length; i > -1; i--) {
            lat = markers[i].lat;
            lon = markers[i].lon;
            if (bounds.contains(new google.maps.LatLng(lat, lon))) {
              markersInBounds.push(markers[i])
            }
          }

          return markersInBounds;
        };

        function clearNonVisibleMarkers(bounds) {
          var visibleMarkers = [];
          var length = $scope.visibleMarkers.length;
          var lat, lon;

          for (var i = 0; i < length; i++) {
            lat = $scope.visibleMarkers[i].position["H"];
            lon = $scope.visibleMarkers[i].position["L"];
            if (bounds.contains(new google.maps.LatLng(lat, lon))) {
              visibleMarkers.push($scope.visibleMarkers[i]);
            } else {
              $scope.visibleMarkers[i].setMap(null);
            }
          }
          $scope.visibleMarkers = visibleMarkers;
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

