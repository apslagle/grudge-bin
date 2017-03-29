(function () {
  'use strict';

  angular
    .module('app')
    .controller('LandingController', LandingController);

  function LandingController($scope) {
    var vm = this;
    vm.user = '';
    vm.test = function() {
      console.log(vm.user);
    }
  }
}());
