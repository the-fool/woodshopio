(function (ng) {
    'use strict';
    
    var bazaarApp = ng.module('bazaarApp', [
    	'ngRoute',
        'django.auth',
        'modals',
        //'reviews',
        'api',
        'navbar',
        'globalController',
        'common.filters',
        'bazaar.animations',
    ]);
    
    bazaarApp.config(['$routeProvider', '$animateProvider', function($rp, $ap) {
    	$rp
    	.when('/Gem/:id', {
    		templateUrl:'/static/bazaar_tpl/detail.html',
    	})
        .when('/filter/category/:cat', {
            templateUrl:'/static/bazaar_tpl/filtered.html'
        })
    	.when('/home', {
    		templateUrl: '/static/bazaar_tpl/main.html'
    	})
    	.otherwise({
    		redirectTo: '/home'
    	});

    	$ap.classNameFilter(/animated/);
    }])
  
})(angular);