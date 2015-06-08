angular.module('mapApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        template: JST['map/templates/home'](),
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
       })

    $urlRouterProvider.otherwise('');
  })

  .service('capturePlaceService', function() {
    var capturedPlace = [];

    var capturePlace = function(place) {
      capturedPlace = place;
    };

    var getPlace = function() {
      return capturedPlace
    }

    return {
      capturePlace: capturePlace,
      getPlace: getPlace
    };
  });