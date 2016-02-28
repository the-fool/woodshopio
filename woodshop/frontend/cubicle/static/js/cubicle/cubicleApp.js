(function(ng) {
	'use strict';

	var app = ng.module('cubicleApp', [
        	   'ngRoute',
                'django.auth',
                'xeditable',
                'modals',
                'reviews',
                'api',
                'navbar',
                'globalController',
                'common.filters',
                'cubicle.animations',
                'cubicle.detail',
                'cubicle.sidebar',
                
        ]);

        app.config(['$routeProvider', '$animateProvider', function($rp, $ap) {
            $rp
            .when('/gem/:id', {
                    template:'<detail-editor user="user"></detail-editor>',
            })
            .when('/', {
                    templateUrl: '/static/cubicle_tpl/main.html'
            })
            .otherwise({
                    redirectTo: '/'
            });

            $ap.classNameFilter(/animated/);
        }]).run(function(editableOptions) {
            editableOptions.theme = 'bs3';
        });

})(angular);