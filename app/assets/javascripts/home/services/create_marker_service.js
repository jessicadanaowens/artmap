angular.module('mapApp').service('createMarkerService', [
    function () {
        return google.maps.event.addListener($scope.map, "click", function(event) {
                    $scope.marker = new google.maps.Marker({
                        position: event.latLng,
                        map: $scope.map
                    });
                });
    }]);

