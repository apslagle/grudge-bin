(function () {
//Use strict
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingController',
        templateUrl: 'app/landing/landing.html',
        controllerAs: 'vm',
        data: {
          required: false
        }
      })
      .state('grudges', {
        url: '/grudges/:user',
        controller: 'GrudgesController',
        templateUrl: '/app/grudges/grudges.html',
        controllerAs: 'vm',
        data: {
          required: true
        }
      })
      .state('grudge', {
        url: '/grudges/:user/:gid',
        params: {grudge: null},
        controller: 'AGrudgeController',
        templateUrl: '/app/a-grudge/a-grudge.html',
        controllerAs: 'vm',
        data: {
          required: true
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();