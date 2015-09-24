angular.module('mapApp').service('NewMarkerService', [ '$resource', 'Marker', 'Flash', '$compile',
  function ($resource, Marker, Flash, $compile) {
    return {
      setup: function setup($scope) {
        $scope.marker = new Marker({userId: 1});

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

        $scope.createMarkerOnMapClick = function createMarkerOnMapClick(map) {
          google.maps.event.addListener(map, "click", function (event) {
            $scope.createSelectedMarker(event, map);
            $scope.createInfoWindowOnClick(map);
          });
        };

        $scope.createSelectedMarker = function createSelectedMarker(event, map) {
          $scope.selectedMarker = new google.maps.Marker({
            position: event.latLng,
            map: map
          });
        };

        $scope.addSelectedMarkerToMarkers = function addSelectedMarkerToMarkers() {
          $scope.allMarkers.push($scope.selectedMarker);
          $scope.visibleMarkers.push($scope.selectedMarker);
        };

        $scope.createInfoWindowOnClick = function createInfoWindowOnClick(map) {
          $scope.newFormListener = google.maps.event.addListener($scope.selectedMarker, "click", function (event) {
            $scope.infowindow.open(map, $scope.selectedMarker);
            $scope.$apply(function() {
              $compile(document.getElementById("newMarkerForm"))($scope)
            });
          });
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

        $scope.removeNewFormListener = function removeNewFormListener () {
          google.maps.event.removeListener($scope.newFormListener);
        };

        $scope.addInfoWindowListener = function addInfoWindowListener () {
          google.maps.event.addListener($scope.selectedMarker, 'click', showInfoWindow);
        };

        $scope.saveData = function saveData() {
          $scope.marker.name = $scope.name;
          $scope.marker.lat = $scope.selectedMarker.position["H"];
          $scope.marker.lon = $scope.selectedMarker.position["L"];
          $scope.marker.gallery = true;
          $scope.marker.name = $scope.name;

          $scope.marker.$save(function (data){
            Flash.setMessage("success", "Your gallery was successfully created");
            $scope.infowindow.close();
          });

          $scope.removeNewFormListener();
          $scope.selectedMarker.name = $scope.marker.name;
          $scope.addSelectedMarkerToMarkers();
          $scope.addInfoWindowListener();
        }
      }
    }
  }
]);
