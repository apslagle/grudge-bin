(function () {
  'use strict';

  angular
    .module('app')
    .controller('GrudgesController', GrudgesController);

  function GrudgesController($scope, GrudgeFactory, $stateParams) {
    var vm = this;
    vm.grudgeCount = 0;
    vm.forgiven = 0;
    vm.unforgiven = 0;
    vm.userName = $stateParams.user;
    vm.render = function() {
      GrudgeFactory.findOrCreateUser(vm.userName)
        .then(user => {
          vm.user = user.data[0];
          return GrudgeFactory.getUserGrudges(user.data[0].id)
        })
        .then(grudges => {
          vm.grudges = grudges.data;
          console.log(vm.grudges);
          vm.grudges.reduce((memo, grudge) => {
            vm.grudgeCount++;
            if (grudge.forgiven) {
              vm.forgiven++;
            } else {
              vm.unforgiven++;
            }
          });
        })
    };
    vm.render();

    vm.formatDate = function(date) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var date = new Date(date);
      var day, month, year;
      [day, month, year] = [date.getDate(), months[date.getMonth()], date.getFullYear()];
      return `${month} ${day}, ${year}`;
    };
    vm.submitGrudge = function() {
      console.log('Hit!')
      GrudgeFactory.createGrudge(vm.user.id, vm.offender, vm.offense)
        .then(newGrudge => {
          vm.offender = '';
          vm.offense = '';
          vm.grudges.push(newGrudge.data);
          vm.grudgeCount++;
          vm.unforgiven++;
          console.log(newGrudge);
        });
    };
  }
}());