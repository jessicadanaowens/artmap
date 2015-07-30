angular.module('mapApp').service('createMarkerService', [ '$resource', 'Marker', 'Flash', '$compile',
  function ($resource, Marker, Flash, $compile) {
    return {
      setup: function setup($scope) {
        $scope.flash = Flash;
        $scope.marker = new Marker({userId: 1});
        $scope.markerPath = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
        $scope.markers = [];
        $scope.newMarkerForm = "<table id='newMarkerForm'>" +
          "<h4>Add a gallery, private collection, or artist to the map.</h4>" +
          "<tr><td>Name:</td> <td><input type='text' id='name' ng-model='name'/> </td> </tr>" +
          "<tr><td>Type:</td> <td><select id='type'>" +
          "<option value='gallery' SELECTED>gallery</option>" +
          "<option value='private-collection'>private collection</option>" +
          "<option value='artist'>artist</option>" +
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

        $scope.getAndPlaceMarkersOnMap = function getMarkers() {
          Marker.query(function (markers){
          debugger;
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
            debugger;
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

        $scope.saveData = function saveData() {
          $scope.marker.name = $scope.name;
          $scope.marker.lat = $scope.selectedMarker.position["G"];
          $scope.marker.lon = $scope.selectedMarker.position["K"];
          $scope.marker.gallery = true;
          $scope.marker.name = $scope.name;

          $scope.marker.$save(function (data){
            Flash.setMessage("success", "You're gallery was successfully created");
            $scope.infowindow.close();
          });
        }
      }
    }
  }]);

