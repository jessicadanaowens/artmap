angular.module('dashboardApp').factory('Piece', ['$resource', function ($resource) {
  return $resource('/pieces', {})
}]);