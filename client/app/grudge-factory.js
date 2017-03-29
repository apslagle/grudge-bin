(function() {
  'use strict';

  angular
    .module('app')
    .factory('ListFactory', ListFactory);

  function ListFactory($http) {
    const findOrCreateUser = (name) =>
      $http({
        method: 'POST',
        url: 'api/user',
        data: {
          name: name,
        }
      });

    const deleteUser = (name) =>
      $http({
        method: 'DELETE',
        url: `api/users/${name}`,
      });

    const getUserGrudges = (id) =>
      $http({
        method: 'GET',
        url: `api/grudge/${id}`
      });

    const createGrudge = (id, offender, madSince, offense) =>
      $http({
        method: 'POST',
        url: `api/grudge/${id}`,
        data: {
          offender: offender,
          madSince: madSince,
          offense: offense
        }
      });

    const updateGrudge = (id, data) =>
      $http({
        method: 'PUT',
        url: `api/grudge/${id}`,
        data: data
      });


    const deleteGrudge = (id) =>
      $http({
        method: 'DELETE',
        url: `api/grudge/${id}`,
      });


    return {
      findOrCreateUser: findOrCreateUser,
      deleteUser: deleteUser,
      getUserGrudges: getUserGrudges,
      createGrudge: createGrudge,
      updateGrudge: updateGrudge,
      deleteGrudge: deleteGrudge
    }
  };
}());