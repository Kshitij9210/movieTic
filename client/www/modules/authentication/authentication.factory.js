/**
 * @ngdoc service
 * @name app.authentication.factory:Authentication
 * @description < holds authentication factory >
 */

(function() {

  'use strict';

  angular
    .module('app.authentication')
    .factory('Authentication', Authentication)


  function Authentication(Restangular) {
    var ApiEndPoints = {
      LOGIN: '/user/',
      LOGOUT: '/user/'
    };

    return {
      login: login;
      logout: logout;
    }

    function login(data) {
      return Restangular.oneUrl(ApiEndPoints.LOGIN).customPOST(
        $.param(data),
        undefined,
        undefined, {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      );
    };

    function getLogout() {
      return Restangular.all(ApiEndPoints.LOGOUT).post({});
    }


  };
}());
