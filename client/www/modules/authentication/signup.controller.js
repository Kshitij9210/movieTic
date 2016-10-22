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


  function SignupCtrl($state, $ionicPopup) {
    var vm = this;

    // When button is clicked, the popup will be shown...
    vm.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Success',
        template: 'Account created successfully'
      });

      alertPopup.then(function(res) {
        $state.go('tab.catalogue');
      });

    };
  };

}());
