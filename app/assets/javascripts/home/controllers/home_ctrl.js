angular.module('mapApp').controller('homeCtrl', ['$scope', '$state', 'Countries',
  function ($scope, $state, Countries) {

    $scope.init = function () {

      Countries.setup($scope);

      $scope.countryRestrict = { 'country': 'us' };

      $scope.autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        {
          types: ['(cities)'],
          componentRestrictions: $scope.countryRestrict
        });

      google.maps.event.addListener($scope.autocomplete, 'place_changed', $scope.onPlaceChanged);
    };

    $scope.onPlaceChanged = function onPlaceChanged() {
      var place = $scope.autocomplete.getPlace();
      if (place.geometry) {
        $state.go('map', {lon: place.geometry.location["A"], lat: place.geometry.location["F"], formattedAddress: place.formatted_address});
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
      }
    };
  }]);