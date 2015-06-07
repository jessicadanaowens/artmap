angular.module('mapApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        template: JST['map/templates/home'](),
        controller: 'homeCtrl'
      })

      .state('map', {
        url: '/rides/:city',
        template: JST['map/templates/map'](),
        controller: 'mapCtrl'
    });

    $urlRouterProvider.otherwise('');
  });
