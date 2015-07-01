angular.module('mapApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        template: JST['home/templates/home'](),
        controller: 'homeCtrl'
      })

      .state('map', {
        url: '/rides/:lon/:lat/:formattedAddress',
        template: JST['map/templates/map'](),
        controller: 'mapCtrl',
        resolve: {
          lon: ['$stateParams', function($stateParams) {
            return $stateParams.lon;
          }],
          lat: ['$stateParams', function($stateParams) {
            return $stateParams.lat;
          }],
          formattedAddress: ['$stateParams', function($stateParams) {
            return $stateParams.formattedAddress;
          }]
        }
       });

    $urlRouterProvider.otherwise('');
  });
