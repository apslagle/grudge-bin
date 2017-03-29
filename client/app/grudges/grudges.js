(function () {
  'use strict';

  angular
    .module('app')
    .controller('GrudgesController', GrudgesController);

  function GrudgesController($scope, GrudgeFactory, $stateParams) {
    var vm = this;
    vm.userName = $stateParams.user;
    (function() {
      GrudgeFactory.findOrCreateUser(vm.userName)
        .then(user => {
          vm.user = user;
          console.log(vm.user.data[0]);
          return GrudgeFactory.getUserGrudges(user.data[0].id)
        })
        .then(grudges => {
          vm.grudges = grudges.data;
          console.log(vm.grudges);
        })
    })()


    vm.test = function() {
      console.log(vm.user);
    }
  }
}());