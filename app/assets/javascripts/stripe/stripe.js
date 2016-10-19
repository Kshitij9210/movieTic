/**
 * Created by Eswara on 16/10/16.
 */

var app = angular.module('stripe', ['ngMaterial', 'ngMessages', 'angularPayments']);

app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

      return config;
    }
  };
});

app.config([
  '$httpProvider',
  '$locationProvider',
  function ($httpProvider, $locationProvider) {
    // Send CSRF token with every http request
    $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    Stripe.setPublishableKey('pk_test_GJir9E2r13I8N55l0r7E3iya');
  }]);

app.filter('userFilter', [function($filter) {
  return function(inputArray, userId){
    if(!angular.isDefined(userId) || userId == null){
      return inputArray;
    }
    var data = [];

    angular.forEach(inputArray, function(item){
      if (item.user.id == userId) {
        data.push(item);
      }
    });

    return data;
  };
}]);