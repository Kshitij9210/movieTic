/**
 * @ngdoc controller
 * @name app.authentication.controller:History
 * @description < holds the history controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.transactions')
    .controller('HistoryCtrl', HistoryCtrl);


  function HistoryCtrl(Payment) {
    var vm = this;

    Payment.history().then(function(res) {
      // console.log(res.data[0]);
      vm.history = res.data[0];
    });

  }

}());
