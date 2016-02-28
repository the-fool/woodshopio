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
                'cubicle.animations',
                'cubicle.sidebar',
                'cubicle.detail'
        ]);

        app.config(['$routeProvider', '$animateProvider', function($rp, $ap) {
        $rp
        .when('/Gem/:id', {
                templateUrl:'/static/cubicle_tpl/detail.html',
        })
        .when('/', {
                templateUrl: '/static/cubicle_tpl/main.html'
        })
        .otherwise({
                redirectTo: '/'
        });

        $ap.classNameFilter(/animated/);
    }])
})(angular);