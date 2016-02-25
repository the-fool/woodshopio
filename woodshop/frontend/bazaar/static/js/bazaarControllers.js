(function (ng) {
	'use strict';
	//Use this global controller as a last resort
	var app = ng.module('bazaar.controllers', []);

	app.controller('bazaarController', ['$scope', '$location', 'djangoAuth', function($scope, $location, djangoAuth) {
	    $scope.authenticated = false;

	    djangoAuth.authenticationStatus(true).then(function(){
	        $scope.authenticated = true;
	    });

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

        $scope.showLoginModal = false;

        $scope.openModal = function(which) {
        	switch (which) {
        		case ('login'):
        			$scope.showLoginModal = !$scope.showLoginModal;
        			break;		
        	}
        };
	}]);
	
	app.controller('categories',['GemsCache', function(GemsCache) {
		this.setCategory = function(name) {
			GemsCache.getCategorical(name);
		};
	}]);

}) (angular);