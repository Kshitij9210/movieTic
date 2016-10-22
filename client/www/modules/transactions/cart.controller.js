/**
 * @ngdoc controller
 * @name app.authentication.controller:Catalogue
 * @description < holds the catalogue controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.transactions')
    .controller('CartCtrl', CartCtrl);


  function CartCtrl(Product) {
    var vm = this;

    vm.products = Product.all();
    console.log(vm.products);
    vm.remove = function(product) {
      Product.remove(product);
    };
  }

}());
