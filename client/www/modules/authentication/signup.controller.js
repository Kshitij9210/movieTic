/**
 * @ngdoc controller
 * @name app.authentication.controller:Signup
 * @description < holds the signup controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.authentication')
    .controller('SignupCtrl', SignupCtrl)


  function SignupCtrl(Authentication, $state, $ionicPopup) {
    var vm = this;

    vm.uname;
    vm.pass;
    vm.email;
    vm.phone;
    vm.address;

    vm.register = function() {
      Authentication.signup(vm.uname, vm.pass, vm.email, vm.address, vm.phone).then(function(res) {
        console.log(res);
        if (res.statusText == "Created") {
          $ionicPopup.alert({
            title: 'Success',
            template: 'Account created successfully'
          }).then(function() {
            $state.go('tab.catalogue');
          })
        } else {
          $ionicPopup.alert({
            title: 'Failed',
            template: res.statusText
          });
        }
      })
    }
  };

}());
