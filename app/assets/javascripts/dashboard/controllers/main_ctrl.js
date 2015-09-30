angular.module('dashboardApp').controller('mainCtrl', ['$scope', '$state',
  function ($scope, $state) {

    $scope.showNewForm = function showNewForm() {
      $state.go('dashboard.new')
    }
  }]);