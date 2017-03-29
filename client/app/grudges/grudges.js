(function () {
  'use strict';

  angular
    .module('app')
    .controller('GrudgesController', GrudgesController);

  function GrudgesController($scope, GrudgeFactory, $stateParams) {
    var vm = this;
    vm.userName = $stateParams.user;
    console.log($stateParams.user);
    (function() {
      GrudgeFactory.findOrCreateUser(vm.userName)
        .then(user => {
          vm.user = user;
          console.log(vm.user);
        })
    })()


    vm.test = function() {
      console.log(vm.user);
    }
  }
}());