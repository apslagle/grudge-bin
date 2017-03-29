(function () {
//Use strict
  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'angular-storage'])
    .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log('router', $stateProvider);

    $stateProvider
      .state('landing', {
        url: '/landing',
        controller: 'LandingController',
        templateUrl: 'app/landing/landing.html',
        controllerAs: 'vm',
        data: {
          required: false
        }
      })
      .state('grudges.user', {
        url: '/grudges/:user',
        controller: 'GrudgesController',
        templateUrl: '/app/grudges/grudges.html',
        controllerAs: 'vm',
        data: {
          required: true
        }
      })
      .state('grudge.gid', {
        url: '/grudges/:gid',
        controller: 'AGrudgeController',
        templateUrl: '/app/a-grudge/grudge.html',
        controllerAs: 'vm',
        data: {
          required: true
        }
      });

    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/landing');
  }

})();