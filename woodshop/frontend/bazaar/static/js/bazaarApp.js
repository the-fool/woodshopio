(function (ng) {
    'use strict';
    
    var bazaarApp = ng.module('bazaarApp', [
    	'ngRoute',
        'django.auth',
        'modals',
        'reviews',
        'api',
        'navbar',
        'globalController',
        'common.filters',
        'bazaar.animations',
        'bazaar.controllers',
        'bazaar.directives',
        'bazaar.services'
    ]);
    
    bazaarApp.config(['$routeProvider', '$animateProvider', function($rp, $ap) {
    	$rp
    	.when('/Gem/:id', {
    		templateUrl:'static/bazaar_tpl/detail.html',
    	})
    	.when('/', {
    		templateUrl: 'static/bazaar_tpl/main.html'
    	})
    	.otherwise({
    		redirectTo: '/'
    	});

    	$ap.classNameFilter(/animated/);
    }])
    .run(function(djangoAuth) {
        djangoAuth.initialize('//127.0.01:8000/rest-auth',true);
    }); 
})(angular);