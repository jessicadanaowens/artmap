angular.module('mapApp').factory('Marker', ['$resource', function ($resource) {
  return $resource('/markers/:markerId', {markerId: '@id'});
}]);