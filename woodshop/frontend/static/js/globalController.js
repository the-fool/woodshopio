(function(ng) {
	'use strict';

	var app = ng.module('globalController', []);

	app.controller('globalController', ['$scope', '$location', 'djangoAuth', function($scope, $location, djangoAuth) {
	    $scope.authenticated = false;

	    /*djangoAuth.authenticationStatus(true).then(function(){
	        $scope.authenticated = true;
	    });*/

	    $scope.$on('djangoAuth.logged_out', function() {
	      $scope.authenticated = false;
	    });

	    $scope.$on('djangoAuth.logged_in', function() {
	      $scope.authenticated = true;
	    });
	    // If the user attempts to access a restricted page, redirect them back to the main page.
	    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
	      console.error("Unable to change routes.  Error: ", rejection)
	      $location.path('/restricted').replace();
	    });

	}]);
})(angular);