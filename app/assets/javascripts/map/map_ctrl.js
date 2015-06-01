angular.module('mapApp').controller('mapCtrl', ['$scope',
  function ($scope) {

    $scope.countryRestrict = { 'country': 'us' };
    $scope.init = function () {
      $scope.mapOptions =  {
        zoom: $scope.countries['us'].zoom,
        center: $scope.countries['us'].center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
      };

      $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
        $scope.mapOptions);


      // Create the autocomplete object and associate it with the UI input control.
      // Restrict the search to the default country, and to place type "cities".
      debugger;

      $scope.autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
        {
          types: ['(cities)'],
          componentRestrictions: $scope.countryRestrict
        });

      $scope.places = new google.maps.places.PlacesService($scope.map);

      google.maps.event.addListener($scope.autocomplete, 'place_changed', $scope.onPlaceChanged);

      // Add a DOM event listener to react when the user selects a country.
      google.maps.event.addDomListener(document.getElementById('country'), 'change',
        $scope.setAutocompleteCountry);
    };

    // When the user selects a city, get the place details for the city and
// zoom the map in on the city.
    $scope.onPlaceChanged = function onPlaceChanged() {
      var place = $scope.autocomplete.getPlace();
      if (place.geometry) {
        $scope.map.panTo(place.geometry.location);
        $scope.map.setZoom(15);
//        search();
        //add search function to search for carpools after a place has been selected
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
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