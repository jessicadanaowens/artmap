angular.module('mapApp').service('createMarkerService', [ '$resource', 'Marker', 'Flash',
  function ($resource, Marker, Flash) {
    return {
      setup: function setup($scope, $compile) {
        $scope.flash = Flash;
        $scope.marker = new Marker({userId: 1});
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
            setTimeout($scope.dropMarker(i), i * 100);
          }
        };

        $scope.dropMarker = function dropMarker(i) {
          return function() {
            $scope.markers[i].setMap($scope.map);
          };
        };

        $scope.saveData = function saveData() {
          $scope.name = 'name';
          $scope.marker.position = $scope.selectedMarker.getPosition();
          $scope.marker.gallery = true;
          $scope.marker.name = $scope.name;

          $scope.marker.$save(function (data){
            Flash.setMessage("success", "You're gallery was successfully created")
            $scope.infowindow.close();
          });
        }
      }
    }
  }]);

