/**
 * @ngdoc service
 * @name app.products.factory:Product
 * @description < holds the products factory logic >
 */

(function() {

  'use strict';

  angular
    .module('app.products')
    .factory('Product', Product)


  function Product($http) {
    return {
      all: all
    };


    function all() {
      return $http.get('http://localhost:8000/api/products/') // GET: /product
    };

  };

}());
