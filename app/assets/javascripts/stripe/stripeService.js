/**
 * Created by Eswara on 16/10/16.
 */
angular.module('stripe')
    .service('stripeService', ['$q', '$http', function ($q, $http) {
      var service = {};

      service.getPurchases = function() {
        var request = $http({
          method: 'get',
          url: '/charges/list',
          data: {}
        });
        return( request.then( handleSuccess, handleError ) );
      };

      service.createCharge = function(data) {
        var request = $http({
          method: 'post',
          url: '/charges/create',
          data: data
        });
        return( request.then( handleSuccess, handleError ) );
      };

      service.addMovie = function(data) {
        var request = $http({
          method: 'post',
          url: '/movie/create',
          data: data
        });
        return( request.then( handleSuccess, handleError ) );
      };

      service.getMovies = function() {
        var request = $http({
          method: 'get',
          url: '/movie/list',
          data: {}
        });
        return( request.then( handleSuccess, handleError ) );
      };

      // Transform the error response, unwrapping the application data from
      // the API response payload.
      function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (! angular.isObject( response.data ) || ! response.data.message) {
          return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ));
      }

      // Transform the successful response, unwrapping the application data
      // from the API response payload.
      function handleSuccess( response ) {
        return( response.data );
      }

      return service;
    }]);