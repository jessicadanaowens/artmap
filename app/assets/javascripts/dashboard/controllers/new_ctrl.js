angular.module('dashboardApp').controller('newCtrl', ['$scope', 'Piece',
  function ($scope, Piece) {

    $scope.piece = new Piece();

    $scope.addPiece = function addPiece() {
      $scope.piece.$save(function (data) {
      })
    }
  }]);