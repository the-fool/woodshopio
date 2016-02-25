(function (ng) {
    'use strict';
    
    var bazaarApp = ng.module('bazaarApp', [
    	'ngRoute',
        //'ui.bootstrap',
        'modals',
        'django.auth',
        'auth.directives',
        'common.controllers',
        'common.filters',
        'common.services',
        'common.directives',
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
        djangoAuth.initialize('//127.0.01:8000/rest-auth',false);
    });

        
})(angular);