angular.module('mapApp').service('createMarkerService', [ '$resource', 'Marker',
  function ($resource, Marker) {
    return {
      setup: function setup($scope, $compile) {

        $scope.newMarker = new Marker({userId: 1});
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
        $scope.markers = [];
        $scope.newMarkerForm = "<table id='newMarkerForm'>" +
          "<tr><td>Name:</td> <td><input type='text' id='name' ng-model='name'/> </td> </tr>" +
          "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
          "<tr><td>Type:</td> <td><select id='type'>" +
          "<option value='bar' SELECTED>bar</option>" +
          "<option value='restaurant'>restaurant</option>" +
          "</select> </td></tr>" +
          "<tr><td></td><td><input type='button' value='Save & Close' ng-click='saveData()'/></td></tr>";

        $scope.infowindow = new google.maps.InfoWindow({content: $scope.newMarkerForm});

        $scope.setUpNewMarkerService = function(map) {
          google.maps.event.addListener(map, "click", function (event) {

            $scope.selectedMarker = new google.maps.Marker({
              position: event.latLng,
              map: map
            });

            $scope.markers.push($scope.selectedMarker);

            google.maps.event.addListener($scope.selectedMarker, "click", function (event) {
              $scope.infowindow.open(map, $scope.selectedMarker);
              $scope.$apply(function() {
                $compile(document.getElementById("newMarkerForm"))($scope)
              });
            });
          });
        };

        $scope.placeMarkersOnMap = function(results) {
          for (var i = 0; i < results.length; i++) {
            var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
            var markerIcon = $scope.markerPath + markerLetter + '.png';

            $scope.markers[i] = new google.maps.Marker({
              position: results[i].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: markerIcon
            });
            // If the user clicks a hotel marker, show the details of that hotel
            // in an info window.
            //$scope.markers[i].placeResult = results[i];

            //I don't think i need this below
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

        $scope.saveData = function saveData() {
          $scope.name = 'name';
          $scope.newMarker.position = $scope.selectedMarker.getPosition();
          $scope.newMarker.gallery = true;
          $scope.newMarker.name = $scope.name;

          $scope.newMarker.$save(function (data){
            $scope.infowindow.close();
          });

          //  if (responseCode == 200 && data.length >= 1) {
          //    infowindow.close();
          //    document.getElementById("message").innerHTML = "Location added.";
          //  }
          //});
        }
      }
    }
  }]);

