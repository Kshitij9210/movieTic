/**
 * @ngdoc service
 * @name app.products.factory:Profile
 * @description < holds the profile factory logic >
 */

(function() {

  'use strict';

  angular
    .module('app.users')
    .factory('Profile', Profile)


  function Profile($http) {
    return {
      info: info
    };


    function info() {
      // return $http.get('http://localhost:8000/api/users/')
      return $http({
        url: 'http://localhost:8000/api/users/',
        method: "GET",
        params: {
          id: '1'
        }
      }); // GET: /user
    };

  };

}());
