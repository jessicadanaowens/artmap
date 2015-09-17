angular.module('mapApp').factory('Marker', ['$resource', function ($resource) {
  return $resource('/markers', {}, {
    query: { method: 'GET', params: {}, isArray: true }
  });
}]);