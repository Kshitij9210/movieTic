/**
 * Created by Eswara on 16/10/16.
 */
angular.module('stripe')
  .controller('stripeController', ['$scope', '$mdDialog', '$mdToast', 'stripeService',
    function ($scope, $mdDialog, $mdToast, stripeService) {
      // scope variables
      $scope.disableSubmit = false;
      $scope.filterUserId = null;

      $scope.user = {
        name: null,
        mobile: null,
        email: null,
        address: null,
        creditCard: null,
        cvc: null,
        expiry: null
      };

      $scope.movie = {
        title: null,
        description: null,
        amount: null
      };

      //Scope functions
      $scope.closeDialog = function() {
        $mdDialog.cancel();
      };

      $scope.resetUser = function () {
        $scope.user = {
          name: null,
          mobile: null,
          email: null,
          address: null,
          creditCard: null,
          cvc: null,
          expiry: null
        };
      };

      $scope.resetMovie = function () {
        $scope.movie = {
          id: null,
          title: null,
          description: null,
          amount: null
        };
      }

      // Functions related to purchase creation and list

      $scope.getAllPurchases = function() {
        stripeService.getPurchases()
            .then(function (response) {
              $scope.purchases = response.purchases;

              $scope.users = [];

              angular.forEach($scope.purchases, function (val) {
                if (!$scope.users[val.user.id]) {
                  $scope.users[val.user.id] = val.user;
                }
              });
            }, function (err) {
              console.log('Error while fetching charges list');
              console.log(err);
            });
      };

      // Initial call for fetching payments
      $scope.getAllPurchases();

      $scope.parseDate = function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss A');
      }

      $scope.pay = function () {
        $scope.disableSubmit = true;

        Stripe.card.createToken({
          number: $scope.user.creditCard,
          cvc: $scope.user.cvc,
          exp_month: $scope.user.expiry.split('/')[0],
          exp_year: $scope.user.expiry.split('/')[1]
        }, function (status, response) {
          if (response.error) {
            console.log(error);
          } else {
            // use $.param jQuery function to serialize data from JSON
            var data = $.param({
              user: {
                name: $scope.user.name,
                email: $scope.user.email,
                mobile: $scope.user.mobile,
                address: $scope.user.address,
              },
              purchase: {
                movieId: $scope.movie.id
              },
              stripeToken: response.id, //Get the stripe token created from the response
              amount: $scope.movie.amount * 100,
            });

            stripeService.createCharge(data)
                .then(function (response) {
                  $scope.disableSubmit = false;

                  $scope.closeDialog();

                  $mdToast.show(
                      $mdToast.simple()
                          .textContent('Successfully booked the tickets')
                          .position('bottom left')
                          .hideDelay(8000)
                  );
                }, function (err) {
                  $mdToast.show(
                      $mdToast.simple()
                          .textContent('Oops! Looks like there is an error while making purchase. Please try again')
                          .position('bottom left')
                          .hideDelay(8000)
                  );

                  $scope.disableSubmit = false;
                });
          }
        });
      }

      $scope.openPurchaseDialog = function(ev, movie) {
        $scope.resetUser();
        $scope.resetMovie();

        $scope.movie = movie;

        $mdDialog.show({
          scope: $scope,
          preserveScope: true,
          templateUrl: 'assets/directives/paymentForm.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: true
        })
      };

      // Functions related to Movie create and list

      stripeService.getMovies()
          .then(function (response) {
            $scope.movies = JSON && JSON.parse(response.movies);
          }, function (err) {
            console.log('Error while fetching movies list');
            console.log(err);
          });

      $scope.openMovieDialog = function(ev) {
        $scope.resetMovie();

        $mdDialog.show({
          scope: $scope,
          preserveScope: true,
          templateUrl: 'assets/directives/movieForm.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: true
        })
      };

      $scope.addMovie = function () {
        $scope.disableSubmit = true;

        // use $.param jQuery function to serialize data from JSON
        var data = $.param({ movie: $scope.movie });

        stripeService.addMovie(data)
            .then(function (response) {
              $scope.disableSubmit = false;
              $scope.closeDialog();

              $mdToast.show(
                  $mdToast.simple()
                      .textContent('Successfully created movie: ' + $scope.movie.title)
                      .position('bottom left')
                      .hideDelay(8000)
              );
            }, function (err) {
              console.log(err);
              $scope.disableSubmit = false;
            });
      };

      $scope.querySearch = function (query) {
        return query ? $scope.users.filter( createFilterFor(query) ) : $scope.users;
      };

      $scope.selectedUserChange = function (item) {
        if (item) {
          $scope.filterUserId = item.id;
        } else {
          $scope.filterUserId = null;
        }
      }

      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
          return (item.name.indexOf(lowercaseQuery) === 0);
        };
      }

      $scope.openPurchaseHistoryDialog = function(ev) {
        $mdDialog.show({
          scope: $scope,
          preserveScope: true,
          templateUrl: 'assets/directives/purchaseHistory.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: true
        })
      };
    }
  ]);