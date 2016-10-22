/**
 * @ngdoc controller
 * @name app.authentication.controller:Catalogue
 * @description < holds the catalogue controller logic >
 */

(function() {

  'use strict';

  angular
    .module('app.products')
    .controller('CatalogueCtrl', CatalogueCtrl);


  function CatalogueCtrl(Product) {
    var vm = this;

    vm.products = Product.all();
  }

}());
