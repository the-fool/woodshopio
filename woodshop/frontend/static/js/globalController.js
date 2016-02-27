(function(ng) {
	'use strict';

	var app = ng.module('globalController', []);

	app.controller('globalController', ['$scope', '$location', 'djangoAuth', function($scope, $location, djangoAuth) {
	    $scope.user = null;
	    $scope.authenticated = false;
	    $scope.is_vendor = false

	    /*djangoAuth.authenticationStatus(true).then(function(){
	        $scope.authenticated = true;
	    });*/

	    djangoAuth.initialize('//127.0.01:8000/rest-auth',true).then(function() {
            $scope.user=djangoAuth.getUser();
            $scope.authenticated = $scope.user.username ? true : false;
            $scope.is_vendor = $scope.user.is_vendor;
        });
	    
	    $scope.$on('djangoAuth.logged_out', function() {
	      $scope.authenticated = false;
	    });

	    $scope.$on('djangoAuth.logged_in', function(data) {
	      $scope.user = djangoAuth.getUser();
	      $scope.authenticated = true;

	    });
	    // If the user attempts to access a restricted page, redirect them back to the main page.
	    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
	      console.error("Unable to change routes.  Error: ", rejection)
	      $location.path('/restricted').replace();
	    });

	}]);
})(angular);