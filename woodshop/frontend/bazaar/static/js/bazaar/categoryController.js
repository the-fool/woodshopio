(function (ng) {
	'use strict';
	//Use this global controller as a last resort
	var app = ng.module('bazaarApp');

	app.controller('categories',['GemsCache', function(GemsCache) {
		this.setCategory = function(name) {
			GemsCache.getCategorical(name);
		};
	}]);

}) (angular);