angular.module('dashboardApp', ['ui.router', 'ngResource'])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

    $stateProvider
      .state('dashboard', {
        url: '',
        template: JST['dashboard/templates/main'](),
        controller: 'mainCtrl'
      })
      .state('dashboard.new', {
        url: '/new',
        template: JST['dashboard/templates/new'](),
        controller: 'newCtrl'
      });
    $urlRouterProvider.otherwise('');
  });