(function() {
  'use strict';

  angular
    .module('app')
    .factory('GrudgeFactory', GrudgeFactory);

  function GrudgeFactory($http) {
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

    const getOneGrudge = (id) =>
      $http({
        method: 'GET',
        url: `api/a-grudge/${id}`
      });

    const createGrudge = (id, offender, offense) =>
      $http({
        method: 'POST',
        url: `api/grudge/${id}`,
        data: {
          offender: offender,
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
      getOneGrudge: getOneGrudge,
      createGrudge: createGrudge,
      updateGrudge: updateGrudge,
      deleteGrudge: deleteGrudge
    }
  };
}());