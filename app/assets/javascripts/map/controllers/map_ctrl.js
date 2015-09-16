angular.module('mapApp').controller('mapCtrl', ['$scope', 'lon', 'lat', 'formattedAddress', 'ExistingMarkerService', 'NewMarkerService', 'autocompleteService', 'Countries', 'Flash',
  function ($scope, lon, lat, formattedAddress, ExistingMarkerService, NewMarkerService, autocompleteService, Countries, Flash) {

    $scope.init = function init() {
      $scope.markers = [];

      ExistingMarkerService.setup($scope, $scope.markers);
      NewMarkerService.setup($scope, $scope.markers);
      autocompleteService.setup($scope);
      Countries.setup($scope);

      $scope.lon = lon;
      $scope.lat = lat;
      $scope.formattedAddress = formattedAddress;

      $scope.mapOptions =  {
        zoom: 8,
        center: new google.maps.LatLng($scope.lon, $scope.lat),
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
      };

      $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
        $scope.mapOptions);

      $scope.places = new google.maps.places.PlacesService($scope.map);

      google.maps.event.addListener($scope.autocomplete, 'place_changed', $scope.onPlaceChanged);

      google.maps.event.addDomListener(document.getElementById('country'), 'change', $scope.setAutocompleteCountry);

      $scope.idleMapListener = google.maps.event.addListener($scope.map, 'idle', function() {
        $scope.bounds = $scope.map.getBounds();
        $scope.getAndPlaceMarkersOnMap();
        $scope.bounds = undefined;
        google.maps.event.removeListener($scope.idleMapListener);
      });

      $scope.createMarkerOnMapClick($scope.map);
    };

    $scope.onPlaceChanged = function onPlaceChanged() {
      $scope.markers = [];
      var place = $scope.autocomplete.getPlace();
      if (place.geometry) {
        $scope.map.panTo(place.geometry.location);
        $scope.map.setZoom(15);
        $scope.getAndPlaceMarkersOnMap();
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
      }
    };

    $scope.findBounds = function findBounds() {
      if ($scope.bounds != undefined) {
        return $scope.bounds;
      } else {
        return $scope.map.getBounds();
      }
    };

    $scope.setAutocompleteCountry = function setAutocompleteCountry() {
      var country = document.getElementById('country').value;
      if (country == 'all') {
        $scope.autocomplete.setComponentRestrictions([]);
        $scope.map.setCenter(new google.maps.LatLng(15, 0));
        $scope.map.setZoom(2);
      } else {
        $scope.autocomplete.setComponentRestrictions({ 'country': country });
        $scope.map.setCenter($scope.countries[country].center);
        $scope.map.setZoom($scope.countries[country].zoom);
      }
    };
  }]);