angular.module('mapApp').service('ExistingMarkerService', [ '$resource', 'Marker', '$compile',
  function ($resource, Marker, $compile) {
    return {
      setup: function setup($scope) {
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';

        $scope.getAndPlaceMarkersOnMap = function getMarkers(bounds) {
          if($scope.allMarkers.length == 0) {
            Marker.query(function (markers){
              $scope.placeMarkersOnMap(markers);
              $scope.findMarkersInBounds(bounds);
            });
          } else {
            $scope.findMarkersInBounds(bounds, $scope.allMarkers);

            $scope.$apply(function() {
              $compile(document.getElementById("infoContent"))($scope)
            });

          }
        };

        $scope.findMarkersInBounds = function findMarkersInBounds(bounds) {
          var lat, lon, i, length;
          $scope.markersInBounds = [];
          length = $scope.allMarkers.length - 1;

          for(i = length; i > -1; i--) {
            lat = $scope.allMarkers[i].position["H"];
            lon = $scope.allMarkers[i].position["L"];
            if (bounds.contains(new google.maps.LatLng(lat, lon))) {
              $scope.markersInBounds.push($scope.allMarkers[i])
            }
          }
        };

        $scope.placeMarkersOnMap = function(markers) {
          for (var i = 0; i < markers.length; i++) {
            $scope.markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            $scope.markerIcon = $scope.markerPath + $scope.markerLetter + '.png';

            $scope.createGoogleMarker(i, markers);
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
          google.maps.event.addListener(marker, 'click', showInfoWindow);
          $scope.allMarkers.push(marker);
        };
        
        $scope.dropMarker = function dropMarker(marker) {
          return function() {
            marker.setMap($scope.map);
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
        };

        $scope.showInfoWindow = function showInfoWindow (marker) {
          $scope.existingMarker = marker;
          google.maps.event.trigger(marker, 'click');
        };
      }
    }
  }]);

