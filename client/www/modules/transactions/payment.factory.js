/**
 * @ngdoc service
 * @name app.transactions.factory:Payment
 * @description < holds the payment factory logic >
 */

(function() {

  'use strict';

  angular
    .module('app.transactions')
    .factory('Payment', Payment)


  function Payment() {

    return {
      processPay: processPay;
    };


    var vm = this;

    vm.form = document.querySelector('#payment-form');

    function processPay() {

      Stripe.card.createToken(vm.form, stripeResponseHandler);

    }
  };

}());
