angular.module('mapApp').controller('mapCtrl', ['$scope',
  function ($scope) {

    $scope.init = function () {
      $scope.mapOptions =  {
        center: { lat: 39.9, lng: -105.1},
        zoom: 8
      };

      $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
        $scope.mapOptions);
    };

    function initialize() {
      var mapOptions = {
        center: { lat: 39.9, lng: -105.1},
        zoom: 8
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  }]);