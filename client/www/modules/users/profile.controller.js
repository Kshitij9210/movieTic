/**
 * @ngdoc controller
 * @name app.users.controller:Profile
 * @description < holds the profile controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.users')
    .controller('ProfileCtrl', ProfileCtrl);


  function ProfileCtrl(Profile, $state, $ionicLoading) {
    var vm = this;

    //get products
    Profile.info().then(function(res) {
      vm.info = res.data;
      console.log(vm.info);
    });

    vm.logout = function(user) {
      console.log('Log-out', user);
      // vm.show($ionicLoading);
      $state.go('login');
    };
  }

}());
