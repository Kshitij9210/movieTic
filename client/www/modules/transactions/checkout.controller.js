/**
 * @ngdoc controller
 * @name app.authentication.controller:Checkout
 * @description < holds the heckout controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.transactions')
    .controller('CheckoutCtrl', CheckoutCtrl);


  function CheckoutCtrl(Payment, $ionicPopup, $state) {
    var vm = this;

    vm.token;
    vm.cnum;
    vm.cvc;
    vm.expM;
    vm.expY;

    function processResponseHandler(status, response) {
      if (response.error) {
        console.log(status);
        console.log(response.error.message);

        $ionicPopup.alert({
          title: 'Snap!',
          template: response.error.message
        });

      } else {
        vm.token = response.id;
        Payment.purchase(vm.token).then(function(res) {
          console.log(res);
        });
        $ionicPopup.alert({
          title: 'Hallelujah',
          template: 'Item Purchased!'
        }).then(function() {
          $state.go('tab.catalogue')
        })
        console.log(vm.token);
      }

      return status;
    }

    vm.processCard = function() {
      Payment.processCard(vm.cnum, vm.cvc, vm.expM, vm.expY, processResponseHandler);
    };

  }

}());
