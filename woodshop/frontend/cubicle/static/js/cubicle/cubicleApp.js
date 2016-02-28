(function(ng) {
	'use strict';

	var app = ng.module('cubicleApp', [
        	'ngRoute',
                'django.auth',
                'modals',
                'reviews',
                'api',
                'navbar',
                'globalController',
                'common.filters',
                'cubicle.sidebar'
        ]);
})(angular);