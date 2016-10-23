/**
 * @ngdoc overview
 * @name app
 * @description Glue to where all the greatness begins
 */

(function() {

  'use strict';

  angular.module('app', [
      /**
       * Application modules
       **/
      'ionic',
      'app.navigation',
      'app.authentication',
      'app.products',
      'app.transactions',
      'app.users'
    ])
    .config(configuration)
    .run(Run);


  function Run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  };


  function configuration($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'modules/navigation/views/tabs.html'
      })
      .state('login', {
        url: '/log-in',
        templateUrl: 'modules/authentication/views/log-in.html',
        controller: 'LoginCtrl as vm'
      })
      .state('signup', {
        url: '/sign-up',
        templateUrl: 'modules/authentication/views/sign-up.html',
        controller: 'SignupCtrl as vm'

      })
      .state('tab.catalogue', {
        url: '/catalogue',
        views: {
          'catalogue': {
            templateUrl: 'modules/products/views/catalogue.html',
            controller: 'CatalogueCtrl as vm'
          }
        }
      })
      .state('tab.cart', {
        url: '/cart',
        views: {
          'cart': {
            templateUrl: 'modules/transactions/views/cart.html',
            controller: 'CartCtrl as vm'
          }
        }
      })
      .state('tab.checkout', {
        url: '/cart/checkout',
        views: {
          'cart': {
            templateUrl: 'modules/transactions/views/checkout.html',
            controller: 'CheckoutCtrl as vm'
          }
        }
      })
      .state('tab.history', {
        url: '/history',
        views: {
          'history': {
            templateUrl: 'modules/transactions/views/history.html',
            controller: 'HistoryCtrl as vm'
          }
        }
      })
      .state('tab.profile', {
        url: '/profile',
        views: {
          'profile': {
            templateUrl: 'modules/users/views/profile.html',
            controller: 'ProfileCtrl as vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/log-in');

  }

}());
