(function (ng) {
    'use strict';
    
    var bazaarApp = ng.module('bazaarApp', [
    	'ngRoute',
        'bazaar.api',
        'bazaar.directives'
    ]);
    
    bazaarApp.config(['$routeProvider', function($rp) {
    	$rp
    	.when('/Gem/:gemId', {
    		templateUrl:'static/tpl/detail.html',
    	})
    	.when('/', {
    		templateUrl: 'static/tpl/bazaar.html'
    	})
    	.otherwise({
    		redirectTo: '/'
    	});
    }]);
        
})(angular);