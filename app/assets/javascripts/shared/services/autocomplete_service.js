angular.module('mapApp').service('autocompleteService', [
  function () {
    return {
      setup: function setup($scope) {
        $scope.countryRestrict = { 'country': 'us' };

        $scope.autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('autocomplete')),
          { types: ['(cities)'], componentRestrictions: $scope.countryRestrict}
        );
      }
    }
  }]);