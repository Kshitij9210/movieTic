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


  function ProfileCtrl($state, $ionicLoading) {
    var vm = this;

    vm.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios"></ion-spinner>'
      }).then(function() {
        console.log("The loading indicator is now displayed");

      });
    };

    vm.hide = function() {
      $ionicLoading.hide().then(function() {
        console.log("The loading indicator is now hidden");
      });
    };

    vm.logout = function(user) {
      console.log('Log-out', user);
      // vm.show($ionicLoading);
      $state.go('login');
    };
  }

}());
