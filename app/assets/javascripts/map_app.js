angular.module('mapApp', ['ui.router', 'ngResource'])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

    $stateProvider
      .state('home', {
        url: '',
        template: JST['home/templates/home'](),
        controller: 'homeCtrl'
      })

      .state('map', {
        url: '/collections/:lon/:lat/:formattedAddress',
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
