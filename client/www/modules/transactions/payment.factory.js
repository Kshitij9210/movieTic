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


  function Payment($http) {

    return {
      history: history,
      processCard: processCard,
      purchase: purchase,
    };

    function history() {
      return $http.get('http://localhost:8000/api/transactions/');
    };

    function processCard(cnum, cvc, expM, expY, processResponseHandler) {

      Stripe.card.createToken({
        number: cnum,
        cvc: cvc,
        exp_month: expM,
        exp_year: expY
      }, processResponseHandler);
    };

    function purchase(token) {
      return $http.post('http://localhost:8000/api/payment/', {
        "stripeToken": token,
      })
    };

  };

}());
