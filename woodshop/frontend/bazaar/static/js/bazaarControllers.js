(function (ng) {
	'use strict';
	//Use this global controller as a last resort
	var app = ng.module('bazaar.controllers', []);

	app.controller('bazaarController', function() {
		
	});

	app.controller('categories',['GemsCache', function(GemsCache) {
		this.setCategory = function(name) {
			console.log('Clicked ' + name);
			GemsCache.getCategorical(name);
		};
	}]);

}) (angular);