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


  function Product() {

    // Some fake testing data
    var products = [{
      name: 'Product 1',
      price: '$699',
      desc: '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis mi, quis maximus neque. Proin non risus scelerisque',
      imgsrc: 'img/i.jpeg'
    }, {
      name: 'Product 2',
      price: '$699',
      desc: '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis mi, quis maximus neque. Proin non risus scelerisque',
      imgsrc: 'img/i.jpeg'
    }, {
      name: 'Product 3',
      price: '$699',
      desc: '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis mi, quis maximus neque. Proin non risus scelerisque',
      imgsrc: 'img/i.jpeg'
    }, {
      name: 'Product 4',
      price: '$699',
      desc: '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis mi, quis maximus neque. Proin non risus scelerisque',
      imgsrc: 'img/i.jpeg'
    }, {
      name: 'Product 5',
      price: '$699',
      desc: '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis mi, quis maximus neque. Proin non risus scelerisque',
      imgsrc: 'img/i.jpeg'
    }, {
      name: 'Product 6',
      price: '$699',
      desc: '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis mi, quis maximus neque. Proin non risus scelerisque',
      imgsrc: 'img/i.jpeg'
    }];

    return {
      all: function() {
        return products;
      },
      remove: function(product) {
          products.splice(products.indexOf(product), 1);
        }
        // get: function(chatId) {
        //   for (var i = 0; i < chats.length; i++) {
        //     if (chats[i].id === parseInt(chatId)) {
        //       return chats[i];
        //     }
        //   }
        //   return null;
        // }
    };
  };
}());
