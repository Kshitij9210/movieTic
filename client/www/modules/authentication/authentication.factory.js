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


  function Authentication($http) {
    return {
      signup: signup
    };

    function signup(uname, pass, email, address, phone) {
      return $http.post('http://localhost:8000/api/users/', {
        "name": uname,
        "password": pass,
        "address": address,
        "email": email,
        "phone": phone
      })
    }


  };
}());
