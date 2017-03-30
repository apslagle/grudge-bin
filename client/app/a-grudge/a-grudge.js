(function () {
  'use strict';

  angular
    .module('app')
    .controller('AGrudgeController', AGrudgeController);

  function AGrudgeController($scope, GrudgeFactory, $stateParams) {
    var vm = this;
    console.log($stateParams.grudge);
    vm.grudge = $stateParams.grudge;
    vm.userName = $stateParams.user;
    if (vm.grudge === null) {
      (function() {
        GrudgeFactory.getOneGrudge($stateParams.gid)
          .then(grudge => {
            vm.grudge = grudge.data;
            console.log(grudge);
            //return GrudgeFactory.getUserGrudges(user.data[0].id)
          })
      })();
    }

    vm.changeForgive = function() {
      vm.grudge.forgiven = !vm.grudge.forgiven;
      GrudgeFactory.updateGrudge($stateParams.gid, {forgiven: vm.grudge.forgiven});
    }

    vm.test = function() {
      console.log(vm.user);
    }
  }
}());