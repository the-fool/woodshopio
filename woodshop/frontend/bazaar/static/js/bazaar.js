(function (ng) {
    'use strict';
    
    var bazaarApp = ng.module('bazaarApp', [
    	'ngRoute',
    	'bazaar.animations',
        'bazaar.api',
        'bazaar.directives'
    ]);
    
    bazaarApp.config(['$routeProvider', function($rp) {
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
    }]);
        
})(angular);