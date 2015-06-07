angular.module('mapApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        template: JST['map/templates/home'](),
        controller: 'homeCtrl'
      })

      .state('map', {
        url: '/rides/:lon/:lat',
        template: JST['map/templates/map'](),
        controller: 'mapCtrl',
        resolve: {
          lon: ['$stateParams', function($stateParams) {
            return $stateParams.lon;
          }],
          lat: ['$stateParams', function($stateParams) {
            return $stateParams.lat;
          }]
        }
    });

    $urlRouterProvider.otherwise('');
  });
