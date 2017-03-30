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
    vm.alphabet = '0';
    vm.userName = $stateParams.user;
    vm.render = function() {
      GrudgeFactory.findOrCreateUser(vm.userName)
        .then(user => {
          vm.user = user.data[0];
          return GrudgeFactory.getUserGrudges(user.data[0].id)
        })
        .then(grudges => {
          vm.grudges = grudges.data;
          vm.correctCount();
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

    vm.correctCount = function(){
      var count = vm.grudges.reduce((count, grudge) => {
        count.grudgeCount++;
        if (grudge.forgiven) {
          count.forgiven++;
        } else {
          count.unforgiven++;
        }
        return count;
      }, {grudgeCount: 0, forgiven: 0, unforgiven: 0});
      vm.grudgeCount = count.grudgeCount;
      vm.forgiven = count.forgiven;
      vm.unforgiven = count.unforgiven;
    }

    vm.delete = function() {
      var id = vm.currentDeleteGrudge.id;
      vm.grudges = vm.grudges.filter(grudge => grudge.id !== id);
      GrudgeFactory.deleteGrudge(id);
    }

    vm.sortBy = function(property) {
      console.log("hit");
      vm.grudges = vm.grudges.sort((a, b) => {
        var key = {true: -1, false:1}
        return key[a[property] < b[property]];
      });
    }
  }
}());