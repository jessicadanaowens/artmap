angular.module('mapApp').controller('mapCtrl', ['$scope', '$compile', 'lon', 'lat', 'formattedAddress', 'createMarkerService', 'autocompleteService',
  function ($scope, $compile, lon, lat, formattedAddress, createMarkerService, autocompleteService) {

    $scope.init = function init() {

      createMarkerService.setup($scope, $compile);
      autocompleteService.setup($scope);

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
        $scope.search();
        $scope.bounds = undefined;
        google.maps.event.removeListener($scope.idleMapListener);
      });

      $scope.setUpNewMarkerService($scope.map);
    };

    $scope.onPlaceChanged = function onPlaceChanged() {
      var place = $scope.autocomplete.getPlace();
      if (place.geometry) {
        $scope.map.panTo(place.geometry.location);
        $scope.map.setZoom(15);
        $scope.search();
        //add search function to search for carpools after a place has been selected
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
      }
    };

    //search for rideshares in the selected city, within the viewport of the map
    $scope.search = function search() {
      var search = {
        bounds: $scope.findBounds(),
        types: ['lodging']
      };

      $scope.places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
//          clearResults();
//          clearMarkers();
          // Create a marker for each hotel found, and
          // assign a letter of the alphabetic to each marker icon.

          $scope.placeMarkersOnMap(results);
        }
      });
    };

    $scope.findBounds = function findBounds() {
      if ($scope.bounds != undefined) {
        return $scope.bounds;
      } else {
        return $scope.map.getBounds();
      }
    };
    // [START region_setcountry]
// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
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
//      clearResults();
//      clearMarkers();
    };
// [END region_setcountry]

    $scope.countries = {
      'au': {
        center: new google.maps.LatLng(-25.3, 133.8),
        zoom: 4
      },
      'br': {
        center: new google.maps.LatLng(-14.2, -51.9),
        zoom: 3
      },
      'ca': {
        center: new google.maps.LatLng(62, -110.0),
        zoom: 3
      },
      'fr': {
        center: new google.maps.LatLng(46.2, 2.2),
        zoom: 5
      },
      'de': {
        center: new google.maps.LatLng(51.2, 10.4),
        zoom: 5
      },
      'mx': {
        center: new google.maps.LatLng(23.6, -102.5),
        zoom: 4
      },
      'nz': {
        center: new google.maps.LatLng(-40.9, 174.9),
        zoom: 5
      },
      'it': {
        center: new google.maps.LatLng(41.9, 12.6),
        zoom: 5
      },
      'za': {
        center: new google.maps.LatLng(-30.6, 22.9),
        zoom: 5
      },
      'es': {
        center: new google.maps.LatLng(40.5, -3.7),
        zoom: 5
      },
      'pt': {
        center: new google.maps.LatLng(39.4, -8.2),
        zoom: 6
      },
      'us': {
        center: new google.maps.LatLng(37.1, -95.7),
        zoom: 3
      },
      'uk': {
        center: new google.maps.LatLng(54.8, -4.6),
        zoom: 5
      }
    };
  }]);