/**
 * @ngdoc controller
 * @name app.authentication.controller:Login
 * @description < holds the login controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.authentication')
    .controller('LoginCtrl', LoginCtrl);


  function LoginCtrl($state) {
    var vm = this;

    vm.login = function(user) {

      $state.go('tab.catalogue');
    };
  };

}());
