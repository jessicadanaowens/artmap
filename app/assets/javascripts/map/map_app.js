angular.module('mapApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('map', {
        url: '/rides/:city',
        template: JST['templates/map'](),
        controller: 'mapCtrl'
      });

    $urlRouterProvider.otherwise('/rides/:city');
  });
